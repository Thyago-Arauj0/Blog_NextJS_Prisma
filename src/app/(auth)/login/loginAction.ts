"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn } from "../../../../auth";

export default async function loginAction(
  prevState: {message?: string; success: boolean} | null,
  formData: FormData
){
  try{
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false
    });
    return { success: true };
  }catch(e: any){// eslint-disable-line @typescript-eslint/no-explicit-any
    if(isRedirectError(e)){
      throw e
    }
    if (e.type === 'CredentialsSignin') {
      return {message: "Dados de login incorretos!", success: false}
    }

    return {message: "Error!", success: false}
  }

}