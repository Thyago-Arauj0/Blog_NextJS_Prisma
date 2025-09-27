import CategoryForm from "@/components/categoryForm"

export default async function categoryPage({ params } : { params: {name: string}} ){
  const decodedName = decodeURIComponent(params.name)
  return(
    <div className="min-h-screen flex flex-col justify-center py-4 w-full">
      <CategoryForm mode="edit" categoryName={decodedName}/>
    </div>
  )
}