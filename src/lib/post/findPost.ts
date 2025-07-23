"use server"

import db from "../db"

export default async function findPost(id: number) {

  const post = await db.post.findUnique({
    where:{
      id: id
    }
  })

  return post
}