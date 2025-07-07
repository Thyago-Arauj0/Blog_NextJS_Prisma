"use server"

import db from "../db"

export default async function findAllCategory() {

  const categories = await db.category.findMany({
    orderBy:{
      name: 'asc'
    }
  })

  return categories
}