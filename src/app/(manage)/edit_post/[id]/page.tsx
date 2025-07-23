import PostForm from "../../create_post/postForm"
import updatePost from "@/lib/post/updatePost"
import findPost from "@/lib/post/findPost"

export default async function categoryPage({ params } : { params: {id: string}}){
  const post = await findPost(Number(params.id));
  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <PostForm initialData={post ?? undefined}  action={updatePost} submitLabel="Atualizar Post"  ></PostForm>
    </div>
  )
}