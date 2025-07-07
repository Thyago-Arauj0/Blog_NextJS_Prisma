"use client"

import EditorContent from "@/components/EditorContent";
import findAllCategory from "@/lib/category/findAllCategory";

import Form from "next/form";
import createPost from "@/lib/post/createPost";
import { Category } from "@/types/types";
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { AlertModal } from '@/components/alert';
import { useRouter } from "next/navigation";

export default function PostForm() {
   const [content, setContent] = useState('');
   const [categories, setCategories] = useState<Category[]>([])
   const [state, formAction, isPending] = useActionState(createPost, null);
    const router = useRouter()
  
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
  
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000);
      }
    }, [state, router])
  

    useEffect(()=>{
      async function fetchData() {
        const data = await findAllCategory()
        setCategories(data)
      }
      fetchData()
    }, [])
    


  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <Form action={formAction}
        className="flex flex-col w-full"
      >
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />

        <label htmlFor="content">Conteúdo:</label>
    
        <EditorContent value={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />

        <label htmlFor="image">Imagem:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />

        <label htmlFor="audio">Áudio:</label>
        <input
          type="file"
          id="audio"
          name="audio"
          accept="audio/*"
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />

        <label htmlFor="video">Vídeo:</label>
        <input
          type="file"
          id="video"
          name="video"
          accept="video/*"
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />

        <label htmlFor="categoryId">Categoria:</label>
        <select
          name="categoryId"
          id="categoryId"
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        >
          <option value="">Nenhuma</option>
          
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))} 
         
        </select>

        <label className="mt-2">
          <input type="checkbox" name="published" className="mr-2" />
          Publicado
        </label>

         <button
          type="submit"
          disabled={isPending}
          className="mt-3 p-2 rounded-xl hover:scale-105 transition-all cursor-pointer bg-blue-400 font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Criando..." : "Criar"}
        </button>
      </Form>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
