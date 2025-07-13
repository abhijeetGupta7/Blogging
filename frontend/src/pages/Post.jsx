import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

export default function Post() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok || !data.posts || data.posts.length === 0) {
          setError("Post not found");
          setPost(null);
        } else {
          setPost(data.posts[0]);
          setError(null);
        }

        setLoading(false);
      } catch (err) {
        setError(err || "Something went wrong while fetching the post.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>

      <Link to={`/search?category=${post.category}`} className="self-center mt-5">
        <Button color="gray" pill size="xs">
          {post.category}
        </Button>
      </Link>

      <img
        src={post.image}
        alt={post.title || "Post image"}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {Math.max(1, Math.ceil(parseInt(post.content.length)/100000))} min read
        </span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full
          [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-6 [&>h1]:mb-3
          [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-5 [&>h2]:mb-2
          [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-4 [&>h3]:mb-2
          [&>p]:mb-4 [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-gray-800
          [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
          [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4
          [&>li]:mb-2
          [&>a]:text-blue-600 [&>a]:underline
          [&>img]:my-4 [&>img]:rounded-lg [&>img]:max-w-full"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <CommentSection postId={post._id}/>

    </main>
  );
}
