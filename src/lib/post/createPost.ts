
"use server"

import db from "../db"
import { auth } from "../../../auth"
export default async function createPost(
  prevState: {message: string, success: boolean} | null,
  formData: FormData
) {

    const session = await auth()
    const userId = session?.user?.id;
  
    const entries = Array.from(formData.entries());
    const obj = Object.fromEntries(entries);

    const data = {
      title: obj.title as string,
      content: obj.content as string,
      imageUrl: obj.imageUrl as string | undefined,
      audioUrl: obj.audioUrl as string | undefined,
      videoUrl: obj.videoUrl as string | undefined,
      published: obj.published === 'true',  // converte string para boolean
      categoryId: obj.categoryId as string
    };

    if (!userId) {
      return {
        message: "Usuário não autenticado",
        success: false
      };
    }


   if (!data.title || !data.content || data.published === undefined || !data.categoryId) {
    return {
      message: "Preencha todos os campos!",
      success: false
      };
      
    }

    
    await db.post.create({
      data:{
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        audioUrl: data.audioUrl,
        videoUrl: data.videoUrl,
        published: data.published,
        categoryId: Number(data.categoryId),
        authorId: Number(userId)
      }
    });

    return{
      message: "Postagem criada com sucesso!",
      success: true
    }

}
