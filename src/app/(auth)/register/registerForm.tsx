'use client';

import Form from 'next/form';
import registerAction from './registerAction';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { AlertModal } from '@/components/alert';
 
 export default function RegisterForm(){

  const [state, formAction, isPending] = useActionState(registerAction, null);

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
      showAlert('error', state?.message);
    }
    if(state?.success === true){
      showAlert('success', state?.message);
    }
  }, [state])


    return(
      <>
    
        <Form action={formAction} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
          
          <label className="block mb-2 font-medium">Nome</label>
          <input
            type="text"
            name='name'
            className="w-full p-2 border rounded mb-4"
            required
          />

          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name='email'
            className="w-full p-2 border rounded mb-4"
            required
          />
          
          <label className="block mb-2 font-medium">Senha</label>
          <input
            type="password"
            name='password'
            className="w-full p-2 border rounded mb-6"
            required
          />

          <button type="submit" disabled={isPending} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p className="mt-4 text-center text-sm">
            Já tem uma conta? <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
          </p>
        </Form>
        <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    )
 }
 
