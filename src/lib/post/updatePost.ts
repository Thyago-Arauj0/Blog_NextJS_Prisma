"use server"

import db from "../db"
import { auth } from "../../../auth"

export default async function updatePost(
  prevState: { message: string, success: boolean } | null,
  formData: FormData
) {
  const session = await auth()
  const userId = session?.user?.id

  const entries = Array.from(formData.entries())
  const obj = Object.fromEntries(entries)

  const data = {
    id: obj.id as string,
    title: obj.title as string,
    content: obj.content as string,
    imageUrl: obj.imageUrl as string | undefined,
    audioUrl: obj.audioUrl as string | undefined,
    videoUrl: obj.videoUrl as string | undefined,
    published: obj.published === 'on',
    categoryId: obj.categoryId as string
  }

  if (!userId) {
    return {
      message: "Usuário não autenticado",
      success: false
    }
  }

  if (!data.id || !data.title || !data.content || data.published === undefined || !data.categoryId) {
    return {
      message: "Preencha todos os campos obrigatórios!",
      success: false
    }
  }

  const post = await db.post.findUnique({
    where: {
      id: Number(data.id),
      authorId: Number(userId)
    }
  })

  if (!post) {
    return {
      message: "Postagem não encontrada ou você não tem permissão para editá-la.",
      success: false
    }
  }

  await db.post.update({
    where: {
      id: Number(data.id)
    },
    data: {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      audioUrl: data.audioUrl,
      videoUrl: data.videoUrl,
      published: data.published,
      categoryId: Number(data.categoryId)
    }
  })

  return {
    message: "Postagem atualizada com sucesso!",
    success: true
  }
}
