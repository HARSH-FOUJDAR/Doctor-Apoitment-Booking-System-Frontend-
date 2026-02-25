import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApoitmentForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    specialization: "",
    experience: "",
    contactNumber: "",
    clinicAddress: "",
    payment: "",
    file: null,
  });

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  };
  return (
    <div>
      <div className="flex bg-gray-50 min-h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-xl">
            <div className="bg-white px-10 py-12 shadow-2xl rounded-[2.5rem] border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Add New Doctor
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    placeholder="Full Name"
                    onChange={onChangeHandler}
                    className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                  <select
                    name="specialization"
                    value={input.specialization}
                    onChange={onChangeHandler}
                    className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select specialization</option>

                    {alldoctor.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <textarea
                  name="description"
                  placeholder="Doctor Bio / Description"
                  rows="3"
                  onChange={onChangeHandler}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    onChange={onChangeHandler}
                    className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                  <input
                    name="contactNumber"
                    placeholder="Phone Number"
                    onChange={onChangeHandler}
                    className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>

                <input
                  name="clinicAddress"
                  placeholder="Clinic Full Address"
                  onChange={onChangeHandler}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />

                <input
                  name="payment"
                  placeholder="Consultation Fees (e.g. ₹500)"
                  onChange={onChangeHandler}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />

                <div className="mt-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-bold p-4 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-100 mt-6`}
                >
                  {loading ? "Uploading to Cloudinary..." : "Register Doctor"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApoitmentForm;
