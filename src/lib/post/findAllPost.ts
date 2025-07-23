"use server"

import db from "../db"
import { Post } from "@/types/types"

export default async function findAllPost(): Promise<Post[]> {

  return await db.post.findMany({
    include: {
      author: true,
      category: true
    },
    orderBy:{
      createdAt: "desc"
    }
  })


}