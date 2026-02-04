import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <div className="w-full max-w-md">
        <SignIn />
      </div>
    </div>
  );
}
