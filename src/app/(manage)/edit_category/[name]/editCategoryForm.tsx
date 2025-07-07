"use client"

import Form from "next/form";
import findCategory from "@/lib/category/findCategory";
import updateCategory from "@/lib/category/updateCategory";
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { AlertModal } from '@/components/alert';
import { Category } from "@/types/types";
import { useRouter } from "next/navigation";
import destroyCategory from "@/lib/category/destroyCategory";

export default function EditCategoryForm({name}: {name: string}){

    const [category, setCategory] = useState<Category | null>(null)
    const router = useRouter()

    useEffect(()=>{
      async function fetchData() {
        const data = await findCategory(name)
        setCategory(data)
      }
      fetchData()
    }, [name])

    
    async function handleDelete() {
      if (!category || !category.id) return;

      try{
        await destroyCategory(category.id)
        showAlert("success", "Categoria excluída com sucesso!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }catch{
        showAlert("error", "Erro ao excluir a categoria.");
      }
    }

    const [state, formAction, isPending] = useActionState(updateCategory, null);
  
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

        setTimeout(()=>{
          router.push('/dashboard')
        }, 2000)
      }
    }, [state, router])
  

  return(
    <div className="flex flex-col sm:min-w-[400px]">
      <Form action={formAction} className="flex flex-col gap-3">
        <label htmlFor="name">Nome da Categoria:</label>
        <input type="hidden" name="id" defaultValue={category?.id} />
        <input type="text" id="name" name="name" required className="border-none outline-0 bg-gray-200 p-2 rounded-xl" defaultValue={category?.name} />
        <button type="submit" disabled={isPending} className="mt-3 p-2 rounded-xl hover:scale-105 transition-all cursor-pointer bg-blue-400 font-semibold text-white">
          {isPending ? "Editando..." : "Editar" }
        </button>
      </Form>
         <button onClick={handleDelete} className="mt-3 p-2 rounded-xl hover:scale-105 transition-all cursor-pointer bg-red-700 font-semibold text-white">
          Excluir
        </button>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
