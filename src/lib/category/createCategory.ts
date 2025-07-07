"use server"

import db from "../db"

export default async function createCategory(
  prevState: {message: string, success: boolean} | null,
  formData: FormData
) {
    const entries = Array.from(formData.entries() );
    const data = Object.fromEntries(entries) as {name: string};

    if(!data.name){
      return{
        message: "Preencha todos os campos!",
        success: false
      }
    }

    const category = await db.category.findUnique({
      where: {
        name: data.name
      }
    })

    if(category){
      return{
        message: "Categoria já existe!",
        success: false
      }
    }

    
    await db.category.create({
      data:{
        name: data.name,
      }
    });

    return{
      message: "Categoria criada com sucesso!",
      success: true
    }

}
