import PostForm from "../../../components/postForm"
import createPost from "@/lib/post/createPost"

export default function categoryPage(){
  return(
    <div className="min-h-screen flex flex-col justify-center bg-white w-full">
      <PostForm action={createPost} submitLabel="Criar Post"/>
    </div>
  )
}