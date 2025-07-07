import PostForm from "./postForm"
import Link from "next/link"

export default function categoryPage(){
  return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Link href={'/dashboard'}>
      <button className="p-2 rounded-xl bg-gray-400 hover:scale-105 transition-all cursor-pointer">Voltar</button>
      </Link>
      <PostForm/>
    </div>
  )
}