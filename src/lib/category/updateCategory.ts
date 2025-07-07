"use server"

import db from "../db"

export default async function updateCategory(
  prevState: {message: string, success: boolean} | null,
  formData: FormData
) {
    const entries = Array.from(formData.entries() );
    const data = Object.fromEntries(entries) as { id: string, name: string};

    if(!data.name){
      return{
        message: "Preencha todos os campos!",
        success: false
      }
    }

    await db.category.update({
      where:{
        id: parseInt(data.id)
      },
      data: {
        name: data.name
      }
    })



    return{
      message: "Categoria atualizada com sucesso!",
      success: true
    }

}
