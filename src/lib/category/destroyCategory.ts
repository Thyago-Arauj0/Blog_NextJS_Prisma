"use server"

import db from "../db"

export default async function destroyCategory(id: number) {

  const categories = await db.category.delete({
    where:{
      id: id
    }
  })

  return categories
}