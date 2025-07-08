import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiDocument, HiTable, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  
  const {currentUser}=useSelector((state)=>state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  return (
    <Sidebar aria-label="dashSideBar" className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>

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

          <SidebarItem
            active={tab === "sign-out"}
            icon={HiTable}
            labelColor="dark"
            className="hover:bg-gray-300"
          >
            Sign Out
          </SidebarItem>

        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
