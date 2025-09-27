import CategoryForm from "../../../components/categoryForm";

export default function categoryPage(){
  return(
    <div className="min-h-screen flex flex-col justify-center py-4 w-full">
      <CategoryForm mode="create"/>
    </div>
  )
}