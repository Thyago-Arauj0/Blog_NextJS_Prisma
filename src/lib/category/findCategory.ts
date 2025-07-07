"use server"

import db from "../db"

export default async function findCategory(name: string) {

  const category = await db.category.findUnique({
    where:{
      name: name
    }
  })

  return category
}