

import LoginForm from "./loginForm";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if(session){
    return redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100 p-4">
      <LoginForm/>
    </div>
  );
}
