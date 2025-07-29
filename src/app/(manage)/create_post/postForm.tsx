"use client"

import EditorContent from "@/components/EditorContent";
import findAllCategory from "@/lib/category/findAllCategory";
import Image from "next/image";
import Form from "next/form";
import { Category } from "@/types/types";
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { AlertModal } from '@/components/alert';
import { useRouter } from "next/navigation";

import { PostFormProps } from "@/types/types";

export default function PostForm({initialData = {}, action, submitLabel = "Salvar"}: PostFormProps) {
   const [content, setContent] = useState(initialData.content || '');
   const [categories, setCategories] = useState<Category[]>([])
   const [state, formAction, isPending] = useActionState(action, null);
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


    console.log(initialData)
    

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <Form action={formAction}
        className="flex flex-col w-full"
      >
        <input type="hidden" name="id" value={initialData.id || ''} />
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={initialData.title || ''}
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />

        <label htmlFor="content">Conteúdo:</label>
    
        <EditorContent value={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />

        <label htmlFor="image">Imagem:</label>
        {/* Imagem atual */}
        {initialData.imageUrl && (
          <Image src={initialData.imageUrl} alt="Imagem atual" 
          width={300}   // ajuste conforme precisar
          height={200}  
          className="mb-2 max-w-xs" />
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />
        <label htmlFor="audio">Áudio:</label>
        {/* Áudio atual */}
        {initialData.audioUrl && (
          <audio controls src={initialData.audioUrl} className="mb-2" />
        )}
        <input
          type="file"
          id="audio"
          name="audio"
          accept="audio/*"
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />
        <label htmlFor="video">Vídeo:</label>
        {/* Vídeo atual */}
        {initialData.videoUrl && (
          <video controls src={initialData.videoUrl} className="mb-2 max-w-xs" />
        )}
        <input
          type="file"
          id="video"
          name="video"
          accept="video/*"
          className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
        />


        <label htmlFor="categoryId">Categoria:</label>
        {categories.length > 0 && (
          <select
            name="categoryId"
            id="categoryId"
            defaultValue={String(initialData.categoryId ?? "")}
            className="border-none outline-0 bg-gray-200 p-2 rounded-xl"
          >
            <option value="">Nenhuma</option>
            {categories.map((category) => (
              <option key={category.id} value={String(category.id)}>
                {category.name}
              </option>
            ))}
          </select>
        )}


        <label className="mt-2">
          <input type="checkbox" name="published" defaultChecked={initialData.published ?? false} className="mr-2" />
          Publicado
        </label>

         <button
          type="submit"
          disabled={isPending}
          className="mt-3 p-2 rounded-xl hover:scale-105 transition-all cursor-pointer bg-blue-400 font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Salvando..." : submitLabel}
        </button>
      </Form>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
