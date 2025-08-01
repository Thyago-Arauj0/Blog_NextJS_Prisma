import logoutAction from "../(auth)/(logout)/logoutAction"
import Form from "next/form"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Category } from "@/types/types"
import Image from "next/image"

import findAllCategory from "@/lib/category/findAllCategory"
import findAllPost from "@/lib/post/findAllPost"

export default async function Dashboard() {
  const session = await auth()
  const userName = session?.user?.name

  if (!session) {
    redirect("/")
  }

  const categories = await findAllCategory()
  const posts = await findAllPost()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {userName?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-gray-700">{userName}</span>
            </div>
            <Form action={logoutAction ?? 'Sem nome'}>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium">
                Sair
              </button>
            </Form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href={'/create_post'}>
              <button className="w-full cursor-pointer p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all duration-200 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Novo Post
              </button>
            </Link>
            
            <Link href={'/create_category'}>
              <button className="w-full cursor-pointer p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-all duration-200 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Nova Categoria
              </button>
            </Link>

            <Link href={'/register'}>
              <button className="w-full cursor-pointer p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition-all duration-200 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Cadastrar Usuário
              </button>
            </Link>

            <Link href={'/users'}>
              <button className="w-full cursor-pointer p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-all duration-200 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Gerenciar Usuários
              </button>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Categorias</h2>
            <span className="text-sm text-gray-500">{categories.length} categorias cadastradas</span>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories.map((category: Category) => (
                <Link href={`/edit_category/${category.name}`} key={category.id}>
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-blue-200 cursor-pointer text-center">
                    <span className="font-medium text-gray-700">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 mb-4">Nenhuma categoria cadastrada.</p>
              <Link href={'/create_category'}>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium">
                  Criar primeira categoria
                </button>
              </Link>
            </div>
          )}
        </section>

        {/* Posts Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Postagens</h2>
            <span className="text-sm text-gray-500">
              {posts.filter(post => post.published).length} publicados • {posts.filter(post => !post.published).length} rascunhos
            </span>
          </div>
          
          {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link href={`/edit_post/${post.id}`} key={post.id}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                  {/* Imagem com altura fixa ou placeholder */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt="Imagem do post"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        quality={100}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo do card */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Autor #{post.authorId}
                      </div>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                        Editar
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 mb-4">Nenhum post encontrado.</p>
              <Link href={'/create_post'}>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium">
                  Criar primeiro post
                </button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}