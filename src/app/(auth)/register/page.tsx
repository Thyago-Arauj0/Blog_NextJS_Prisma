

import RegisterForm from "./registerForm";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if(session){
    return redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <RegisterForm></RegisterForm>
    </div>
  );
}
