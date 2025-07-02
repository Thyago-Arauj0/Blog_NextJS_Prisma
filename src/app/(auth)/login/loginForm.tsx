'use client';

import loginAction from "./loginAction";
import Form from "next/form";
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { AlertModal } from '@/components/alert';
import { useRouter } from "next/navigation";

export default function LoginForm(){

    const [state, formAction, isPending] = useActionState(loginAction, null);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('success');
    const [modalMessage, setModalMessage] = useState('');
  
  
    // Função para mostrar o alerta
    const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
      setModalType(type);
      setModalMessage(message);
      setIsModalOpen(true);
    };
  
    
  useEffect(()=>{
    if(state?.success === false){
      showAlert('error', state?.message as string);
    }
    if(state?.success === true){
      router.push("/dashboard")
    }
  }, [state])


  return(
    <>
      <Form action={formAction} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded mb-4"
          required
        />
        
        <label className="block mb-2 font-medium">Senha</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {isPending ? "Entrando..." : "Entrar"}
        </button>

        <p className="mt-4 text-center text-sm">
          Não tem uma conta? <a href="/register" className="text-blue-600 hover:underline">Cadastre-se</a>
        </p>
      </Form>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}