import CategoryForm from "./categoryForm";
import Link from "next/link";

export default function categoryPage(){
  return(
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 p-4">
      <Link href={'/dashboard'}>
        <button className="p-2 rounded-xl bg-gray-400 hover:scale-105 transition-all cursor-pointer">voltar</button>
      </Link>
      <br />
      <CategoryForm/>
    </div>
  )
}