import EditCategoryForm from "./editCategoryForm"
import Link from "next/link"

export default async function categoryPage({ params } : { params: {name: string}} ){
  const decodedName = decodeURIComponent(params.name)
  return(
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 p-4">
      <Link href={'/dashboard'}>
        <button className="p-2 rounded-xl bg-gray-400 hover:scale-105 transition-all cursor-pointer">voltar</button>
      </Link>
      <br />
      <EditCategoryForm name={decodedName}/>
    </div>
  )
}