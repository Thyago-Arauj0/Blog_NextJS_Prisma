import logoutAction from "../(auth)/(logout)/logoutAction"
import Form from "next/form"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Category } from "@/types/types"

import findAllCategory from "@/lib/category/findAllCategory"

export default async function Dashboard(){
  const session = await auth()
  const userName = session?.user?.name;

  if(!session){
    redirect("/")
  }

  const categories = await findAllCategory()

  return(
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center py-3">
      <h1 className="font-extrabold text-3xl">Dashboard</h1>
      <div className="flex items-center gap-2">
        <h2 className="font-black">{userName}</h2>
        <Form action={logoutAction ?? 'Sem nome'}>
        <button className="bg-red-800 p-2 rounded-xl hover:scale-105 transition-all cursor-pointer font-semibold text-white">Sair</button>
        </Form>
      </div>
    </div>

    <div className="flex gap-2 mt-5">
      <Link href={'/create_post'}>
          <button className="p-2 bg-blue-500 rounded-xl hover:scale-105 transition-all cursor-pointer font-semibold text-white">Novo post</button>
      </Link>
      
      <Link href={'/create_category'}>
          <button className="p-2 bg-green-500 rounded-xl hover:scale-105 transition-all cursor-pointer font-semibold text-white">Nova categoria</button>
      </Link>
    </div>

    <div className="p-3 mt-16">
      <h2 className="font-bold text-xl">Categorias</h2>
      <div className="mt-5">
        {categories.length > 0 ? (
         <ul className="flex flex-wrap gap-3">
          {categories.map((category : Category) => (
            <Link href={`/edit_category/${category.name}`} key={category.id}>
              <li className="rounded-xl border-2 p-2">{category.name}</li>
            </Link>
          ))}
         </ul>
        ) :(
          <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
        )}
      </div>
    </div>
    </div>
  )
}