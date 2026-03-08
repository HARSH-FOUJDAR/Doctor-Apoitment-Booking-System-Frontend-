import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    role: "patient", // Set a default role
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandelr = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, role, password } = input;

      const res = await axios.post(
        "https://doctor-apoitment-booking-system.onrender.com/auth/login",
        {
          email,
          role,
          password,
        },
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login Successful!");

        if (role === "doctor") {
          navigate("/doctorhome");
        } else {
          navigate("/patienthome");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="flex min-h-screen flex-col justify-center py-12 bg-slate-50 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <img
            className="mx-auto h-12 w-auto"
            src="https://image.similarpng.com/file/similarpng/very-thumbnail/2022/01/Health-Medical-Logo-design-on-transparent-background-PNG.png"
            alt="Health Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Please enter your details to sign in
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-xl border border-slate-100 sm:rounded-2xl sm:px-12">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={input.email}
                  onChange={onChangeHandelr}
                  className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={input.password}
                  onChange={onChangeHandelr}
                  className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
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

              <button
                type="submit"
                className="w-full flex justify-center bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-all"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?
                <Link to="/singup">
                  <button className="font-bold relative left-5 cursor-pointer text-indigo-600 hover:underline">
                    Create Account
                  </button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
