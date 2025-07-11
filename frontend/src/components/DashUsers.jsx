import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/getUsers`, {
          method: "GET",
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
          setShowMore(data.users.length >= 9);
        } else {
          throw new Error("Failed to fetch Users");
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (currentUser?.isAdmin) fetchUsers();
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    setLoading(true);
    try {
      const res = await fetch(`/api/user/getUsers?startIndex=${startIndex}`);
      if (res.ok) {
        const data = await res.json();
        setUsers((prev) => [...prev, ...data.users]);
        setShowMore(data.users.length >= 9);
      } else {
        throw new Error("Failed to fetch more users");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowMore(users.length > 9);
        setShowModal(false);
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-50 min-h-[300px] p-4 text-center">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Your Users</h2>
      
      {loading && users.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="xl" />
          <span className="ml-2">Loading users...</span>
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No Users found.</p>
      ) : (
        <>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date Created</TableHeadCell>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>User Email</TableHeadCell>
                <TableHeadCell>Is Admin ?</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {users.map((user) => (
                <TableRow key={user._id} className="bg-white border-gray-200">
                  <TableCell className="px-6 py-4 text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-20 h-10 object-cover bg-gray-200 rounded"
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    {user.username}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setUserIdToDelete(user._id);
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

          {loading && users.length > 0 && (
            <div className="flex justify-center mt-4">
              <Spinner size="sm" />
              <span className="ml-2">Loading more users...</span>
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
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="red" onClick={handleUserDelete} disabled={deleting}>
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

      {error && (
        <div className="mt-4">
          <Alert color="red">{error}</Alert>
        </div>
      )}
    </div>
  );
}