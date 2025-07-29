import logoutAction from "../(auth)/(logout)/logoutAction"
import Form from "next/form"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Category } from "@/types/types"
import Image from "next/image"

import findAllCategory from "@/lib/category/findAllCategory"
import findAllPost from "@/lib/post/findAllPost"

export default async function Dashboard(){
  const session = await auth()
  const userName = session?.user?.name;

  if(!session){
    redirect("/")
  }

  const categories = await findAllCategory()
  const posts = await findAllPost()

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

    <div className="p-3 mt-16">
      <h2 className="font-bold text-xl">Postagens</h2>
      <div className="mt-5">
        {posts.length > 0 ? (
            <ul className="flex flex-wrap gap-4 list-none p-0">
              {posts
                // .filter((post) => post.published === true) // filtra os publicados
                .map((post) => (
                  <Link href={`/edit_post/${post.id}`} key={post.id}>
                    <li className="w-72 border border-gray-300 rounded-xl p-4 bg-white shadow hover:shadow-md transition-shadow duration-300">
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

                      {/* <p className="text-sm text-gray-600 mb-3">
                        {post. || 'Conteúdo resumido ou início do texto...'}
                      </p> */}

                      {post.imageUrl && (
                        <Image
                          src={post.imageUrl}
                          alt="Imagem do post"
                          width={50}
                          height={50}
                          quality={100}
                          className="w-full h-auto rounded-md mb-3"
                        />
                      )}

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Publicado em: {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>Status: {post.published ? 'Publicado' : 'Rascunho'}</span>
                      </div>
                    </li>
                  </Link>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum post publicado encontrado.</p>
          )}

      </div>
    </div>

    </div>
  )
}