import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Singup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "patient",
  });

  const onChangeHandelr = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const responce = await axios.post(
        "https://doctor-apoitment-booking-system.onrender.com/auth/register",
        input,
      );
      if (responce.data.success) {
        toast.success(responce.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-container max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://image.similarpng.com/file/similarpng/very-thumbnail/2022/01/Health-Medical-Logo-design-on-transparent-background-PNG.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSumbit}>
            {/* Username Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="username"
                  type="text"
                  required
                  value={input.username}
                  onChange={onChangeHandelr}
                  className="block w-full px-3 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={input.email}
                  onChange={onChangeHandelr}
                  className="block w-full px-3 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={input.password}
                  onChange={onChangeHandelr}
                  className="block w-full px-3 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>
            <div className="text-sm justify-end flex">
              <Link to="/login">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 underline transition-colors"
                >
                  Already Login
                </a>
              </Link>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${input.role === "patient" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white border-slate-200 text-slate-500"}`}
              >
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={input.role === "patient"}
                  onChange={onChangeHandelr}
                  className="hidden"
                />
                <span className="text-sm font-bold">Patient</span>
              </label>

              <label
                className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${input.role === "doctor" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white border-slate-200 text-slate-500"}`}
              >
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={input.role === "doctor"}
                  onChange={onChangeHandelr}
                  className="hidden"
                />
                <span className="text-sm font-bold">Doctor</span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
