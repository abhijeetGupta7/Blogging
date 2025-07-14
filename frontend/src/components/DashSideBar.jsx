import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiDocument, HiTable, HiUser, HiUsers } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signoutUserFailure, signoutUserSuccess } from "../redux/user/userSlice";
import { HiAcademicCap } from "react-icons/hi2";

export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch=useDispatch();
  const {currentUser}=useSelector((state)=>state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

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

  return (
    <Sidebar aria-label="dashSideBar" className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>

          { currentUser.isAdmin && (
           <SidebarItem
            as={Link}
            to="/dashboard?tab=dash"
            active={tab === "dash"}
            icon={HiAcademicCap}
            labelColor="dark"
            className="hover:bg-gray-300"
          >
            Dashboard
          </SidebarItem>
          )}

          <SidebarItem
            as={Link}
            to="/dashboard?tab=profile"
            active={tab === "profile"}
            icon={HiUser}
            labelColor="dark"
            className="hover:bg-gray-300"
          >
            Profile
          </SidebarItem>

          {currentUser.isAdmin && (
            <SidebarItem
              as={Link}
              to="/dashboard?tab=post"
              active={tab === "post"}
              icon={HiDocument}
              labelColor="dark"
              className="hover:bg-gray-300"
            >
              Posts
            </SidebarItem>
          )}

                 
          {currentUser.isAdmin && (
            <SidebarItem
              as={Link}
              to="/dashboard?tab=comments"
              active={tab === "comments"}
              icon={HiDocument}
              labelColor="dark"
              className="hover:bg-gray-300"
            >
              Comments
            </SidebarItem>
          )}

          
          {currentUser.isAdmin && (
            <SidebarItem
              as={Link}
              to="/dashboard?tab=users"
              active={tab === "users"}
              icon={HiUsers}
              labelColor="dark"
              className="hover:bg-gray-300"
            >
              Users
            </SidebarItem>
          )}

          <SidebarItem
            active={tab === "sign-out"}
            icon={HiTable}
            labelColor="dark"
            className="hover:bg-gray-300"
            onClick={handleSignout}
          >
            Sign Out
          </SidebarItem>

        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
