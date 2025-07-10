import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Crear Nuevo Post</h1>
      <PostForm />
    </div>
  );
}