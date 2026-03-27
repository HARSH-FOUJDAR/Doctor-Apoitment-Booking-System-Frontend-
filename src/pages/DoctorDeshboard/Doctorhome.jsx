import React from "react";
import SideBar from "./SideBar";
import DoctorNavbar from "./DoctorNavbar";


const Doctorhome = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      
      {/* 1. Sidebar stays on the far left */}
      <SideBar />

      {/* 2. Main content wrapper (takes up all remaining width to the right) */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        
        {/* Navbar sits at the top of the main area */}
        <DoctorNavbar />

   
      </div>

    </div>
  );
};

export default Doctorhome;