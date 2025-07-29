import { PostViewer } from "@/components/post-viewer";
import findPost from "@/lib/post/findPost";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: { id: string } }) {
  const post = await findPost(Number(params.id));

  if (!post) {
    notFound(); // Redireciona para página 404 do Next.js
  }

  return <PostViewer post={post} />;
}
