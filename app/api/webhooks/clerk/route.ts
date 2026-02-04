import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { generateAffiliateCode } from '@/lib/affiliate-utils';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local');
  }

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get body
  const body = await req.text();

  // Create a new Webhook instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify payload
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    try {
      const { email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0]?.email_address;

      if (!email) {
        return new Response('No email found', { status: 400 });
      }

      // Generate affiliate code
      const affiliateCode = generateAffiliateCode(first_name || 'User', last_name);

      // Create user in database
      await prisma.user.create({
        data: {
          clerkUserId: id,
          email,
          firstName: first_name || null,
          lastName: last_name || null,
          affiliateCode,
          isAdmin: false,
          isTeamLeader: false,
        },
      });

      console.log(`✅ User created: ${email} with affiliate code: ${affiliateCode}`);
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    try {
      const { email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0]?.email_address;

      if (!email) {
        return new Response('No email found', { status: 400 });
      }

      // Update user in database
      await prisma.user.update({
        where: { clerkUserId: id },
        data: {
          email,
          firstName: first_name || null,
          lastName: last_name || null,
        },
      });

      console.log(`✅ User updated: ${email}`);
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    try {
      // Delete user from database
      await prisma.user.delete({
        where: { clerkUserId: id },
      });

      console.log(`✅ User deleted: ${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  return new Response('Webhook processed', { status: 200 });
}
