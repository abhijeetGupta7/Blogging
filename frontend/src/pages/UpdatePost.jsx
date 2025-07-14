import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import BlogEditor from "../components/BlogEditor";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  const { postId } = useParams();
  const [blogImageUrl, setBlogImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle text/select input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle file upload
  function handleImageChange(e) {
    const image = e.target.files[0];
    if (image) {
      setForm((prev) => ({
        ...prev,
        image,
      }));
      setBlogImageUrl(URL.createObjectURL(image));
    }
  }

  // Handle content from BlogEditor (rich text editor)
  function handleContentChange(text) {
    setForm((prev) => ({
      ...prev,
      content: text,
    }));
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/getPosts?postId=${postId}`);
        if (res.ok) {
          const data = await res.json();
          setForm(data.posts[0]);
          if (data.posts[0].image) {
            setBlogImageUrl(data.posts[0].image);
          }
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { title, category, content, image } = form;

    if (!title || !category || !content) {
      setError("Please fill all the fields");
      setLoading(false); 
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      if (image) formData.append("file", image);

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/update-post/${postId}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const data = await res.json();
      console.log("Post created:", data);
      // Reset form
      setForm({
        title: "",
        category: "",
        content: "",
        image: null,
      });
      setBlogImageUrl(null);
      setLoading(false);
      setError(null)
      navigate(`/post/${data.slug}`);
    } catch (error) {
      console.error("Error publishing post:", error);
      setError("Something went wrong while publishing the post.");
    }
  }

  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center font-semibold my-7 text-3xl">
        Update your Post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title & Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="flex-1"
          />

          <Select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="max-w-3xl"
          >
            <option value="">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="css">CSS</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        {blogImageUrl && (
          <img
            src={blogImageUrl}
            alt="Preview"
            className="w-full h-auto rounded-lg"
          />
        )}

        {/* Blog Content */}
        <BlogEditor text={form.content} setText={handleContentChange} />

        {/* Submit Button */}
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" /> Updating...
            </span>
          ) : (
            "Update Post"
          )}
        </Button>

        {error && <Alert color="red">{error}</Alert>}
      </form>
    </div>
  );
}
