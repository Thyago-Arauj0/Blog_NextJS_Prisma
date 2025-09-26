"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Post } from "@/types/types"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PostViewerProps {
  allPosts: Post[]
}

export default function SearchComponent({ allPosts }: PostViewerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<typeof allPosts>([])
  const [isSearchActive, setIsSearchActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const handleSearch = (value: string) => {
    setSearchTerm(value)

    if (value.trim() === "") {
      setFilteredPosts([])
    } else {
      const results = allPosts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()))
      setFilteredPosts(results)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchTerm.trim() !== "") {
      router.push(`/founds/${encodeURIComponent(searchTerm)}`)
      setIsSearchActive(false)
    }
  }

  const handleFocus = () => {
    setIsSearchActive(true)
  }

  const handleClose = () => {
    setIsSearchActive(false)
    setSearchTerm("")
    setFilteredPosts([])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }

    if (isSearchActive) {
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isSearchActive])

  return (
    <>
      <section>
        <div className="bg-gray-900 px-8 pt-16 text-center">
          <form onSubmit={handleSubmit} className="max-w-md min-w-[250px] mx-auto relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Digite sua busca..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleFocus}
              className="bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-red-400 rounded-xl h-12 pl-12 pr-4 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
            />
            <button
              type="submit"
              className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
            >
              <Search className="text-gray-400 hover:text-red-400 transition-colors" />
            </button>
          </form>
          <p className="text-red-400 mb-8 mt-8 font-semibold max-w-md mx-auto">
            Encontre artigos, tutoriais e dicas sobre marketing digital e desenvolvimento web
          </p>
        </div>
      </section>

      {isSearchActive && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div
            ref={overlayRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
          >

            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Buscar Conteúdo</h3>
                <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Digite sua busca..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="bg-gray-50 border-0 rounded-xl h-12 pl-12 pr-4 text-lg focus:bg-white focus:ring-2 focus:ring-red-400 transition-all"
                  autoFocus
                />
                <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>
            </div>

            <div className="overflow-y-auto max-h-96">
              {searchTerm.trim() === "" ? (
                <div className="p-8 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Digite algo para começar a buscar</p>
                  <p className="text-sm mt-2">Encontre artigos, tutoriais e muito mais</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-lg">Nenhum resultado encontrado</p>
                  <p className="text-sm mt-2">Tente usar outras palavras-chave</p>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-4 px-2">
                    {filteredPosts.length} resultado{filteredPosts.length !== 1 ? "s" : ""} encontrado
                    {filteredPosts.length !== 1 ? "s" : ""}
                  </p>
                  <div className="space-y-2">
                    {filteredPosts.map((post) => (
                      <Link
                        href={`/post/${post.id}`}
                        key={post.id}
                        onClick={handleClose}
                        className="block p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <h4 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">Clique para ler o artigo completo</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
