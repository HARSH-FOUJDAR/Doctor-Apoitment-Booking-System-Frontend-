import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Testimonial from "../components/Testimonial";
const Home = () => {
  const [Doctor, setDoctor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://doctor-apoitment-booking-system.onrender.com/doctor/getDoctor",
        );
        setDoctor(res.data.doctors || []);
      } catch (err) {
        toast.error("Could not load ");
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="">
        <section className="relative overflow-hidden pt-20 pb-24 bg-slate-50">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
                <span className="text-blue-600 text-sm font-bold tracking-wide uppercase">
                  Trusted Healthcare Solutions
                </span>
              </div>

              <h1 className="text-2xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                We’re changing the way people
                <span className="text-blue-600 ml-5 ">connect.</span>
              </h1>

              <div className="mt-6 flex items-center gap-2">
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-xl font-bold border border-red-100">
                  100% Insurance Coverage *
                </span>
              </div>

              <p className="mt-8 text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                Building innovative medical solutions for modern healthcare.
                From virtual consultations to real-time patient tracking, we
                deliver excellence in every care.
              </p>

              {/* Button with Animated Line */}
              <div className="mt-10">
                <Link to="/login">
                  <button className=" cursor-pointer relative group overflow-hidden px-10 py-4 bg-blue-600 text-white rounded-2xl text-xl font-extrabold shadow-blue-200 shadow-2xl transition-all hover:bg-blue-700">
                    <span className="relative z-10 flex items-center gap-2">
                      Get started
                      <svg
                        className="w-8 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>

              {/* Features List */}
              <div className="mt-12">
                <ul className="grid sm:grid-cols-2 gap-4 text-slate-800 font-bold text-lg">
                  {[
                    "Non-Surgical Pain Treatment",
                    "30 - 60 Minute Procedures",
                    "Insurance Support",
                    "Expert Medical Team",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 group">
                      <div className="bg-green-100 p-1 rounded-full group-hover:bg-green-500 transition-colors">
                        <svg
                          className="w-5 h-5 text-green-600 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-6 justify-center lg:justify-end pr-4">
              <div className="flex flex-col gap-6 pt-20 animate-float-slow">
                <img
                  src="https://media.istockphoto.com/id/1418999473/photo/doctors-comforting-disabled-elderly-patient.jpg?s=612x612&w=0&k=20&c=ggVR5D9U8IY7irIrgvfqSmlLwA7se4vc2fRSAjV2lSs="
                  className="w-48 h-72 object-cover rounded-[2.5rem] shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-500"
                  alt="Healthcare technology"
                />
                <img
                  src="https://media.istockphoto.com/id/1369619516/photo/shot-of-a-doctor-examining-a-patient-with-a-stethoscope-during-a-consultation-in-a-clinic.jpg?s=612x612&w=0&k=20&c=c5bA_7X1KOrhsqWeMKufWrGhknLJwRznCv9mTn-PB7Y="
                  className="w-48 h-72 object-cover rounded-[2.5rem] shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-500"
                  alt="Doctor using tablet"
                />
              </div>

              {/* Right Column - Floating Fast */}
              <div className="flex flex-col gap-6 animate-float-fast">
                <img
                  src="https://media.istockphoto.com/id/1496640744/photo/indian-doctor-examining-sick-senior-man-by-using-stethoscope-while-sitting-on-sofa-at-home.jpg?s=612x612&w=0&k=20&c=meu2nAd7QDiCG8qez4Jy-RwXNabT_uj-lfH7Pltqqu8="
                  className="w-48 h-72 object-cover rounded-[2.5rem] shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-500"
                  alt="Modern Hospital Room"
                />
                <img
                  src="https://media.istockphoto.com/id/1460981468/photo/smiling-indian-caring-doctor-supporting-holding-hand-of-olde-senior-female-patient-lying-on.jpg?s=612x612&w=0&k=20&c=qZrcUANaJBbDned216IM40I94CqSktxIONW0pbSzTD8="
                  className="w-48 h-72 object-cover rounded-[2.5rem] shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-500"
                  alt="Surgeon"
                />
                <img
                  src="https://etimg.etb2bimg.com/photo/111399120.cms"
                  className="w-48 h-72 object-cover rounded-[2.5rem] shadow-2xl border-4 border-white 
                  hover:scale-105 transition-transform duration-500"
                  alt="Female Doctor Portrait"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="  bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-blue-800 dark:via-indigo-900 dark:to-black text-gray-800 dark:text-gray-200  rounded-2xl mx-4">
          <div className="max-w-9xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-center">
              {/* Box 1 */}
              <div className="p-8 rounded-3xl">
                <p className="text-4xl font-extrabold text-white">44M</p>
                <p className="text-xs mt-2 text-white  uppercase tracking-wider">
                  Happy Patient
                </p>
              </div>

              {/* Box 2 */}
              <div className="p-8  rounded-3xl">
                <p className="text-4xl font-extrabold text-white">5.3K</p>
                <p className="text-md mt-2 text-white    uppercase tracking-wider">
                  Effective than Other Pain-Relief Treatments
                </p>
              </div>

              {/* Box 3 */}
              <div className="p-8  rounded-3xl">
                <p className="text-4xl font-extrabold text-white">100%</p>
                <p className="text-md mt-2 text-white   uppercase tracking-wider">
                  Very Care
                </p>
              </div>
              <div className="p-8  rounded-3xl">
                <p className="text-4xl font-extrabold text-white">30+</p>
                <p className="text-md mt-2 text-white     uppercase tracking-wider">
                  Advanced Non-Surgical Procedures
                </p>
              </div>
              <div className="p-8  rounded-3xl">
                <p className="text-4xl font-extrabold text-white">50+</p>
                <p className="text-md mt-2 text-white   uppercase tracking-wider">
                  Years of Experienced Pain Specialists
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Testimonial></Testimonial>
        </section>
        {/* Doctor Cards Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading Section */}
            <div className="mb-12 ">
              <h2 className="text-3xl md:text-4xl justify-center items-center flex  font-bold text-blue-900">
                Expert Medical Professionals
              </h2>
              <p className="mt-2 text-gray-600  justify-center items-center flex text-lg">
                Book an appointment with our top-rated specialists.
              </p>
            </div>

            {/* Grid setup: Ek line mein 4 cards (Desktop par) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Doctor.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden flex flex-col w-full"
                >
                  {/* Image */}
                  <div className="h-64">
                    <img
                      src={doctor.profile?.profilePicture}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900">
                      Dr. {doctor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm mt-1 uppercase tracking-wide">
                      {doctor.specialization}
                    </p>
                    <div className="flex items-center gap-2 text-green-600 text-sm font-bold mt-5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Available Today
                    </div>
                    {/* Simple Info Row */}
                    <div className="flex justify-between items-center py-4 border-t border-gray-100 mt-6">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Experience
                        </p>
                        <p className="text-md font-bold text-gray-800">
                          {doctor.experience} Years
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Fees
                        </p>
                        <p className="text-md font-bold text-gray-800">
                          ₹{doctor.payment}
                        </p>
                      </div>
                    </div>
                    <Link to="/login">
                      <button className="w-full cursor-pointer mt-2 bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors">
                        Book Appointment
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
