import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <div className="w-full max-w-md">
        <SignUp />
      </div>
    </div>
  );
}
