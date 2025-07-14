import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import BlogEditor from "../components/BlogEditor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
  GEMINI_API_KEY;

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  const [blogImageUrl, setBlogImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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

  function handleContentChange(text) {
    setForm((prev) => ({
      ...prev,
      content: text,
    }));
  }

  // AI Generation function using Gemini
  async function handleAIGenerate() {
    const { title, category } = form;

    if (!title || !category) {
      setError(
        "Please enter both title and category before using AI generation."
      );
      return;
    }

    setError(null);
    setAiGenerating(true);

    try {
      const prompt = `
Generate a high-quality blog post in HTML format based on the following inputs:

Title: "${title}"
Category: "${category}"

Instructions:
- Write engaging, well-structured content relevant to the title and category.
- Format the output using ONLY valid HTML elements such as <h1>, <h2>, <p>, <ul>, <ol>, <blockquote>, <strong>, <em>, <span>, and <br>.
- Include clear sections with headings, optional emojis, and short paragraphs.
- Do NOT wrap the output in triple backticks or Markdown (no \`\`\`html or \`\`\`).
- Do NOT include outer HTML tags like <html>, <head>, or <body>.
- This HTML will be directly inserted into a WYSIWYG editor.
`;

      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await res.json();
      console.log(data);
      const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (!output) throw new Error("No content returned from Gemini");
      
      const cleanHTML = output.replace(/^```html|```$/g, "").trim();

      setForm((prev) => ({
        ...prev,
        content: cleanHTML,
      }));
    } catch (err) {
      console.error("Gemini error:", err);
      setError("Failed to generate content with AI.");
    } finally {
      setAiGenerating(false);
    }
  }

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

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to create post");

      const data = await res.json();

      setForm({
        title: "",
        category: "",
        content: "",
        image: null,
      });
      setBlogImageUrl(null);
      setLoading(false);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      console.error("Error publishing post:", error);
      setError("Something went wrong while publishing the post.");
      setLoading(false);
    }
  }

  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center font-semibold my-7 text-3xl">Create a Post</h1>

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
            <option value="lifestyle">Lifestyle</option>
            <option value="ai">AI</option>
          </Select>
        </div>

        {/* AI Disclaimer & Button */}
        <div className="text-sm text-gray-500 italic">
          * You can generate a blog post automatically using AI. Just provide a
          title and category.
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={handleAIGenerate}
            disabled={aiGenerating}
          >
            {aiGenerating ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Generating...
              </span>
            ) : (
              "Generate with AI"
            )}
          </Button>
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
        <BlogEditor text={form.content} setText={handleContentChange}/>

        {/* Submit Button */}
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" /> Publishing...
            </span>
          ) : (
            "Publish Post"
          )}
        </Button>

        {/* Error Display */}
        {error && <Alert color="red">{error}</Alert>}
      </form>
    </div>
  );
}
