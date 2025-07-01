import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashProfile() {

   const {currentUser} = useSelector((state)=>state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        {/* Image Upload Preview Box */}
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          
          <img
            src={currentUser.photoUrl}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>

        {/* Input Fields */}
        <TextInput type='text' placeholder='Username'
            defaultValue={currentUser.username}
        />
        <TextInput type='email' placeholder='Email' 
            defaultValue={currentUser.email}
        />
        <TextInput type='password' placeholder='Password' 
        />

        {/* Update Button */}
        <Button type='submit' outline>
          Update
        </Button>

      </form>

      {/* Delete / Sign Out */}
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer border-2 p-1 rounded-xl hover:font-semibold'>Delete Account</span>
        <span className='cursor-pointer border-2 p-1 rounded-xl hover:font-semibold'>Sign Out</span>
      </div>

    </div>
  );
}
