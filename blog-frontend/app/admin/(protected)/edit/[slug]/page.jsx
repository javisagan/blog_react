import PostForm from "@/components/PostForm";
import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Post</h1>
      <PostForm initialData={post} />
    </div>
  );
}
