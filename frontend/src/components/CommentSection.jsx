import {
  Alert,
  Button,
  Modal,
  ModalBody,
  Spinner,
  Textarea,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment'; // Individual comment component
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  // Current logged-in user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Local state variables
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

  // Loading states
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [likingCommentId, setLikingCommentId] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const navigate = useNavigate();

  // Handle new comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;

    setSubmitLoading(true);
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Reset input and add comment to top of list
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      } else {
        setCommentError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Fetch comments when component mounts or postId changes
  useEffect(() => {
    const getComments = async () => {
      setLoadingComments(true);
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoadingComments(false);
      }
    };
    getComments();
  }, [postId]);

  // Handle like/unlike action
  const handleLike = async (commentId) => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }

    setLikingCommentId(commentId);
    try {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });

      if (res.ok) {
        const data = await res.json();
        // Update the specific comment with new like data
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLikingCommentId(null);
    }
  };

  // Handle in-place edit update
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  // Handle comment delete
  const handleDelete = async (commentId) => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }

    setDeletingCommentId(commentId);
    setShowModal(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>

      {/* Show current user info or sign-in prompt */}
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}

      {/* Comment input form */}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline type='submit' disabled={submitLoading}>
              {submitLoading ? <Spinner size='sm' /> : 'Submit'}
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {/* Show loading, or comments */}
      {loadingComments ? (
        <div className='flex justify-center items-center my-5'>
          <Spinner size='lg' />
        </div>
      ) : comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>

          {/* Map and render each comment */}
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
              liking={likingCommentId === comment._id}
            />
          ))}
        </>
      )}

      {/* Confirm delete modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
                disabled={deletingCommentId === commentToDelete}
              >
                {deletingCommentId === commentToDelete ? (
                  <Spinner size='sm' />
                ) : (
                  "Yes, I'm sure"
                )}
              </Button>
              <Button
                color='gray'
                onClick={() => setShowModal(false)}
                disabled={deletingCommentId === commentToDelete}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
