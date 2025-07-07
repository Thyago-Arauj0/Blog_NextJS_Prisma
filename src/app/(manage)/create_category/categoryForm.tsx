"use client"

import Form from "next/form";
import createCategory from "@/lib/category/createCategory"
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { AlertModal } from '@/components/alert';

export default function CategoryForm(){

  const [state, formAction, isPending] = useActionState(createCategory, null);

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
    <div className="flex flex-col sm:min-w-[400px]">
      <Form action={formAction} className="flex flex-col gap-3">
        <label htmlFor="name">Nome da Categoria:</label>
        <input type="text" id="name" name="name" required className="border-none outline-0 bg-gray-200 p-2 rounded-xl" />
        <button type="submit" disabled={isPending} className="mt-3 p-2 rounded-xl hover:scale-105 transition-all cursor-pointer bg-blue-400 font-semibold text-white">
          {isPending ? "Criando..." : "Criar" }
        </button>
      </Form>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
