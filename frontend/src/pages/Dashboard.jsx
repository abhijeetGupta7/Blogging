import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Profile from "../components/Profile";
import DashSideBar from "../components/DashSideBar";

export default function Dashboard() {
  const location=useLocation();

  const [tab, setTab] = useState('');
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Dashboard SideBar */}
      <div className="md:w-56">
        <DashSideBar/>
      </div>

      {/* Dashboard Profile */}
      { tab ==='profile' && <Profile/> }
      
    </div>
  )
}
