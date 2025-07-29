
"use server"

import db from "../db"
import { auth } from "../../../auth"
import { cloudinaryUpload } from "../cloudinaryUpload"

export default async function createPost(
  prevState: {message: string, success: boolean} | null,
  formData: FormData
) {

    const session = await auth()
    const userId = session?.user?.id;
  
    // const entries = Array.from(formData.entries());
    // const obj = Object.fromEntries(entries);

    // const data = {
    //   title: obj.title as string,
    //   content: obj.content as string,
    //   imageUrl: obj.imageUrl as string | undefined,
    //   audioUrl: obj.audioUrl as string | undefined,
    //   videoUrl: obj.videoUrl as string | undefined,
    //   published: obj.published === 'on',  // converte string para boolean
    //   categoryId: obj.categoryId as string
    // };

    if (!userId) {
      return {
        message: "Usuário não autenticado",
        success: false
      };
    }

    const title = formData.get("title") as string;
    const content =  formData.get("content") as string;
    const published = formData.get("published") === 'on';  // converte string para boolean
    const categoryId = formData.get("categoryId") as string;

    const imageFile =  formData.get("image") as File | null;
    const audioFile = formData.get("audio") as File | null;
    const videoFile = formData.get("video") as File | null;



   if (!title || !content || !categoryId) {
    return {
      message: "Preencha todos os campos!",
      success: false
      };
      
    }

    try{

      let imageUrl: string | undefined;
      let audioUrl: string | undefined;
      let videoUrl: string | undefined;

      //uploads (se existir arquivos)
      if(imageFile && imageFile.size > 0){
        imageUrl = await cloudinaryUpload(imageFile, "image")
      }
      
      if(audioFile && audioFile.size > 0){
        audioUrl = await cloudinaryUpload(audioFile, "raw")
      }
      
      if(videoFile && videoFile.size > 0){
        videoUrl = await cloudinaryUpload(videoFile, "video")
      }

      await db.post.create({
        data:{
          title,
          content,
          imageUrl,
          audioUrl,
          videoUrl,
          published,
          categoryId: Number(categoryId),
          authorId: Number(userId)
        }
      });

      return{
        message: "Postagem criada com sucesso!",
        success: true
      }
    }catch(error){
      console.error("Erro ao criar post:", error);
      return {
        message: "Erro ao criar post.",
        success: false,
      };
    }
    

}
