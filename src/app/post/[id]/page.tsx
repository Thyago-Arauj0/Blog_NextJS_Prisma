import { PostViewer } from "@/components/post-viewer";
import findAllPost from "@/lib/post/findAllPost";
import findPost from "@/lib/post/findPost";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: { id: string } }) {
  const post = await findPost(Number(params.id));
  const posts = await findAllPost()

  if (!post) {
    notFound(); // Redireciona para página 404 do Next.js
  }

  const allPosts = posts.filter(
    (p) => p.categoryId === post.categoryId && p.id !== post.id
  )

  return <PostViewer post={post} allPosts={allPosts} />;
}
