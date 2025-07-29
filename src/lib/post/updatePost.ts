"use server"

import db from "../db"
import { auth } from "../../../auth"
import { cloudinaryUpload } from "../cloudinaryUpload"

export default async function updatePost(
  prevState: { message: string, success: boolean } | null,
  formData: FormData
) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return {
      message: "Usuário não autenticado",
      success: false
    }
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const categoryId = formData.get("categoryId") as string
  const published = formData.get("published") === "on"

  const imageFile = formData.get("image") as File | null
  const audioFile = formData.get("audio") as File | null
  const videoFile = formData.get("video") as File | null

  if (!id || !title || !content || !categoryId) {
    return {
      message: "Preencha todos os campos obrigatórios!",
      success: false
    }
  }

  const post = await db.post.findUnique({
    where: {
      id: Number(id),
      authorId: Number(userId)
    }
  })

  if (!post) {
    return {
      message: "Postagem não encontrada ou você não tem permissão para editá-la.",
      success: false
    }
  }

  try {
    let imageUrl = post.imageUrl
    let audioUrl = post.audioUrl
    let videoUrl = post.videoUrl

    // Se houver novo arquivo, faz upload e atualiza URL
    if (imageFile && imageFile.size > 0) {
      imageUrl = await cloudinaryUpload(imageFile, "image")
    }
    if (audioFile && audioFile.size > 0) {
      audioUrl = await cloudinaryUpload(audioFile, "raw")
    }
    if (videoFile && videoFile.size > 0) {
      videoUrl = await cloudinaryUpload(videoFile, "video")
    }

    await db.post.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        content,
        imageUrl,
        audioUrl,
        videoUrl,
        published,
        categoryId: Number(categoryId)
      }
    })

    return {
      message: "Postagem atualizada com sucesso!",
      success: true
    }
  } catch (error) {
    console.error("Erro ao atualizar postagem:", error)
    return {
      message: "Erro ao atualizar postagem.",
      success: false
    }
  }
}
