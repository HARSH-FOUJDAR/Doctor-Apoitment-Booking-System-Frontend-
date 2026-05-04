import React from "react";
import { Link } from "react-router-dom";
import { IoCallSharp } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import { Menu } from "lucide-react";
const Navbar = () => {
  const [open, setOpen] = React.useState(false);

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
          <div>
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md border md:hidden hover:bg-accent transition cursor-pointer"
            >
              <Menu size={24} />
            </button>
            {/* //Mobile Menu */}
            

          </div>
          {/* Right Side: Links */}
          <div className=" hidden md:flex items-center gap-4">
            <a
              href="tel:9783454978"
              className="flex items-center justify-center sm:justify-end gap-3 border px-4 sm:px-6 py-2 rounded-lg cursor-pointer hover:bg-red-50 transition"
            >
              <IoCallSharp className="text-xl sm:text-2xl text-red-500" />
              <span className="font-bold text-sm sm:text-lg">
                Emergency Call
              </span>
            </a>

            <Link to="/">
              <button className="flex  items-center gap-2 text-blue-400  font-bold border px-4 sm:px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                General Queries : 97834000000
              </button>
            </Link>

            <Link to="/login">
              <button className="flex items-center gap-2 text-red-400  font-bold border px-4 sm:px-6 py-2 rounded-lg cursor-pointer hover:bg-red-50 transition">
                <TbLogin2 className="text-2xl text-red-400" />
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
