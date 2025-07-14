import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/getPosts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-10  px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl pt-10">
          Welcome to my Blog
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Welcome to my blog! I'm Abhijeet — a final-year Computer Science
          student trying to juggle web development, DSA practice, and the
          occasional existential crisis. Here, you'll find a mix of articles,
          tutorials, and personal experiences aimed at fellow students and
          aspiring developers. Whether you’re struggling with your final
          project, grinding LeetCode problems at 2 AM, or just trying to make
          sense of it all — this space is for you. I write about web dev, coding
          tips, and the real stuff we all deal with: deadlines, doubts, and
          dreams. Dive in, explore, and let’s grow together — one bug fix at a
          time.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
