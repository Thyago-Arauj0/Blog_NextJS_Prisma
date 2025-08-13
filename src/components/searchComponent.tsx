"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Post } from "@/types/types"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PostViewerProps {
  allPosts: Post[]
}

export default function SearchComponent({ allPosts }: PostViewerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<typeof allPosts>([])

  const router = useRouter()

  const handleSearch = (value: string) => {
    setSearchTerm(value)

    if(value.trim() === ""){
      setFilteredPosts([])
    }else{
      const results = allPosts.filter(post =>
        post.title.toLowerCase().includes(value.toLowerCase()) 
      )
      setFilteredPosts(results)
    }
  }

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault()

    if(searchTerm.trim() !== ""){
      router.push(`/founds/${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <section>
      <div className=" rounded-2xl px-8 py-4 text-center ">
        <h2 className="text-black text-3xl font-bold mb-4">Pesquise aqui</h2>
        <p className="text-red-500 mb-8 font-semibold max-w-md mx-auto">
          Encontre artigos, tutoriais e dicas sobre marketing digital e desenvolvimento web
        </p>
        <form onSubmit={handleSubmit}  className="max-w-md mx-auto relative">
          <Input
            type="text"
            placeholder="Digite sua busca..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-gray-100 border-0 shadow-none rounded-2xl h-14 pl-12 pr-4 text-lg focus:border-red-400 focus:shadow-red-400 transition-shadow"
          />
          <button
            type="submit" className="h-5 w-4 absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search className=" text-gray-400 " />
          </button>
        </form>
      </div>

      {/* Resultados da busca */}
      <div className="mt-6 grid gap-4">
        {filteredPosts.map(post => (
          <Link href={`/post/${post.id}`} key={post.id} className="p-4 ">
            <p className="font-bold">{post.title}</p>
            <br />
            <hr />
          </Link>
        ))}
      </div>
    </section>
  )
}
