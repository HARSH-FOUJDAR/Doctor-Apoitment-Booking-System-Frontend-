import React from "react";
import { Link } from "react-router-dom";
import { IoCallSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-transparent  border-gray-200  shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side: Logo & Name */}
          <div className="flex items-center gap-2">
            <div className="min-w-[48px] h-12 bg-gradient-to-br  from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 text-white">
              <img
                className="w-10 h-10 object-contain rounded-2xl "
                src="https://image.similarpng.com/file/similarpng/very-thumbnail/2022/01/Health-Medical-Logo-design-on-transparent-background-PNG.png"
                alt="Medical Logo"
              />
            </div>
            <Link to="/">
              <span className="text-xl font-bold text-indigo-900 tracking-tight">
                Appoint<span className="text-blue-500">ify</span>
              </span>
            </Link>
          </div>

          {/* Right Side: Links */}

          <div className="flex justify-end items-center gap-3 border px-2 p-2 rounded-lg cursor-pointer">
            <IoCallSharp className="text-2xl text-red-500" />
            <a href="tel:9783454978">
              <button className="font-extrabold text-lg cursor-pointer">
                Emergencies Call{" "}
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
