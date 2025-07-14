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
  Modal,
  ModalBody,
  ModalHeader,
  Alert,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setShowMore(data.comments.length >= 9);
        } else {
          throw new Error("Failed to fetch comments");
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) fetchComments();
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    setLoading(true);
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        setShowMore(data.comments.length >= 9);
      } else {
        throw new Error("Failed to load more comments");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c._id !== commentIdToDelete));
        setShowModal(false);
      } else {
        throw new Error("Failed to delete comment");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-50 min-h-[300px] p-4 text-center">
      <h2 className="text-xl font-bold mb-6 text-gray-900">All Comments</h2>

      {loading && comments.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="xl" />
          <span className="ml-2">Loading comments...</span>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments found.</p>
      ) : (
        <>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date Updated</TableHeadCell>
                <TableHeadCell>Content</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
                <TableHeadCell>Post ID</TableHeadCell>
                <TableHeadCell>User ID</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {comments.map((comment) => (
                <TableRow key={comment._id} className="bg-white border-gray-200">
                  <TableCell className="px-6 py-4 text-gray-900">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4">{comment.content}</TableCell>
                  <TableCell className="px-6 py-4">{comment.numberOfLikes}</TableCell>
                  <TableCell className="px-6 py-4">{comment.postId}</TableCell>
                  <TableCell className="px-6 py-4">{comment.userId}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setCommentIdToDelete(comment._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {loading && comments.length > 0 && (
            <div className="flex justify-center mt-4">
              <Spinner size="sm" />
              <span className="ml-2">Loading more comments...</span>
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
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="red" onClick={handleDeleteComment} disabled={deleting}>
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
        <Button className="mt-5 mx-auto cursor-pointer" onClick={handleShowMore}>
          Show More
        </Button>
      )}

      {error && (
        <div className="mt-4">
          <Alert color="red">{error}</Alert>
        </div>
      )}
    </div>
  );
}
