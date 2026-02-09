import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (!user.email) return false;

        // Check if user already exists in database
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        });

        if (!dbUser) {
          // Check if there's a PreClaimAffiliateCode assigned to this email
          const assignedCode = await prisma.preClaimAffiliateCode.findFirst({
            where: {
              assignedEmail: user.email,
              status: 'unclaimed'
            }
          });

          if (assignedCode) {
            // Create user and claim the code
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                firstName: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ').slice(1).join(' ') || '',
                affiliateCode: assignedCode.code,
              }
            });

            // Update the code to claimed status
            await prisma.preClaimAffiliateCode.update({
              where: { id: assignedCode.id },
              data: {
                status: 'claimed',
                claimedBy: dbUser.id,
                claimedAt: new Date()
              }
            });

            console.log(`[AUTH] User registered and claimed code: ${user.email} -> ${assignedCode.code}`);
          } else {
            // Create user without affiliate code (they can claim later or admin can assign)
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                firstName: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ').slice(1).join(' ') || '',
                affiliateCode: '', // Empty for now
              }
            });

            console.log(`[AUTH] User registered without affiliate code: ${user.email}`);
          }
        } else {
          // User exists, check if they need to claim a code
          if (!dbUser.affiliateCode || dbUser.affiliateCode === '') {
            const assignedCode = await prisma.preClaimAffiliateCode.findFirst({
              where: {
                assignedEmail: user.email,
                status: 'unclaimed'
              }
            });

            if (assignedCode) {
              // Update user with affiliate code
              await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                  affiliateCode: assignedCode.code
                }
              });

              // Update the code to claimed status
              await prisma.preClaimAffiliateCode.update({
                where: { id: assignedCode.id },
                data: {
                  status: 'claimed',
                  claimedBy: dbUser.id,
                  claimedAt: new Date()
                }
              });

              console.log(`[AUTH] Existing user claimed code: ${user.email} -> ${assignedCode.code}`);
            }
          }

          // Update user's name if changed
          if (user.name && (dbUser.firstName !== user.name.split(' ')[0] || !dbUser.firstName)) {
            await prisma.user.update({
              where: { id: dbUser.id },
              data: {
                firstName: user.name.split(' ')[0] || dbUser.firstName,
                lastName: user.name.split(' ').slice(1).join(' ') || dbUser.lastName,
              }
            });
          }
        }

        return true;
      } catch (error) {
        console.error('[AUTH] Error in signIn callback:', error);
        // Allow sign in even if database operation fails
        return true;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
