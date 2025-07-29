"use server"

import db from "../db"

export default async function findPost(id: number) {

  const post = await db.post.findUnique({
    where:{
      id: id
    },
    include: {
      author: true,   
      category: true, // Isso adiciona o objeto category ao resultado
    },
  })

  return post
}