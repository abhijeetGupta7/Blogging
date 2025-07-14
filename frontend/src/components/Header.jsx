import {
  Avatar,
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import { signoutUserFailure, signoutUserSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location=useLocation();
  const { currentUser: user } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const [searchTerm,setSearchTerm]=useState(null);
  const navigate=useNavigate();


  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromUrl=urlParams.get('searchTerm');
    if(searchTermFromUrl) setSearchTerm(searchTermFromUrl);    
  }, [location.search])

   const handleSignout = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/signout`, {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) {
          const data = res.json();
          dispatch(signoutUserFailure(data.message || "Singout failed"));
        }
        dispatch(signoutUserSuccess());
      } catch {
        dispatch(signoutUserFailure("Something went wrong"));
      }
    };

    const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 border-gray-200">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from bg-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
          Abhijeet's
        </span>
        <span className="text-black">Blog</span>
      </Link>

      <form onSubmit={handleSearchSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden rounded-lg" color="gray">
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-3 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        {user ? (
          <Dropdown 
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={user.profilePicture} className="hover:border-1 hover:border-blue-500"/>
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{user.username}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </DropdownHeader>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem icon={HiViewGrid}>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem icon={HiLogout} onClick={handleSignout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              outline
              className="hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === "/"}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about" active={path === "/about"}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/projects" active={path === "/projects"}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
