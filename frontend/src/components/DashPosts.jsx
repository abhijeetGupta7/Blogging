import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } else {
        console.error("Failed to fetch posts");
      }
      setLoading(false);
    }
    if (currentUser?.isAdmin) fetchPosts();
  }, [currentUser?._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    setLoading(true);
    const res = await fetch(
      `/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`
    );
    if (res.ok) {
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } else {
      console.error("Failed to fetch posts");
    }
    setLoading(false);
  };

  const handlePostDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/post/deletePost/${postIdToDelete}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (res.ok) {
      setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      if (posts.length < 9) {
        setShowMore(false);
      }
      setShowModal(false);
    } else {
      console.error("Failed to delete post");
    }
    setDeleting(false);
  };

  return (
    <div className="overflow-x-auto bg-gray-50 min-h-[300px] p-4 text-center">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Your Posts</h2>
      
      {loading && posts.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="xl" />
          <span className="ml-2">Loading posts...</span>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Post image</TableHeadCell>
                <TableHeadCell>Post title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
                <TableHeadCell>
                  <span>Edit</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {posts.map((post) => (
                <TableRow key={post._id} className="bg-white border-gray-200">
                  <TableCell className="px-6 py-4 text-gray-900">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-200 rounded"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    <Link className="hover:underline" to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="px-6 py-4">{post.category}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setPostIdToDelete(post._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Link
                      className="font-medium text-blue-600 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {loading && posts.length > 0 && (
            <div className="flex justify-center mt-4">
              <Spinner size="sm" />
              <span className="ml-2">Loading more posts...</span>
            </div>
          )}
        </>
      )}

      {showModal && (
        <Modal
          show={showModal}
          size="md"
          onClose={() => !deleting && setShowModal(false)}
          popup
        >
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="red" onClick={handlePostDelete} disabled={deleting}>
                  {deleting ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Deleting...
                    </>
                  ) : (
                    "Yes, I'm sure"
                  )}
                </Button>
                <Button 
                  color="alternative" 
                  onClick={() => setShowModal(false)}
                  disabled={deleting}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}

      {showMore && !loading && (
        <Button
          className="mt-5 mx-auto cursor-pointer"
          onClick={handleShowMore}
        >
          Show More
        </Button>
      )}
    </div>
  );
}