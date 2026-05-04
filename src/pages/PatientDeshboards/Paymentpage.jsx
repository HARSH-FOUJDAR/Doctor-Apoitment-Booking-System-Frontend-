import React, { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";
import { IoArrowBack } from "react-icons/io5";
import { PaymentElement } from "@stripe/react-stripe-js";

const Paymentpage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [patientEmail, setPatientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const State = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const City = [
    "Jaipur",
    "Udaipur",
    "Jodhpur",
    "Kota",
    "Mumbai",
    "Pune",
    "Nagpur",
    "Bengaluru",
    "Mysuru",
    "Chennai",
    "Bharatpur",
    "Coimbatore",
    "Lucknow",
    "Kanpur",
    "Agra",
    "Ahmedabad",
    "Surat",
    "Gandhinagar",
    "Kolkata",
    "Siliguri",
    "Hyderabad",
    "Delhi",
    "Chandigarh",
    "Amritsar",
    "Gurgaon",
    "Bhopal",
    "Indore",
    "Patna",
    "Bhubaneswar",
    "Thiruvananthapuram",
    "Kochi",
    "Guwahati",
  ];

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe not ready");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/payment-success",
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      }
    } catch (err) {
      console.log(err);
      setMessage("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <PatientSidebar />
      <div className="w-full max-w-5xl p-10 rounded-xl bg-white  shadow">
        <Link to="/patienthome">
          <button className="flex items-center mb-4 text-blue-600">
            <IoArrowBack /> Back
          </button>
        </Link>

        <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>
        <form onSubmit={handlePay} className="space-y-4">
          <div className="grid grid-cols-3 gap-5">
            <input
              type="text"
              placeholder="Patient Name"
              required
              // value={patientEmail}
              // onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full  p-2 rounded-xl hover:border-blue-500 border border-blue-500"
            />
            <input
              type="email"
              placeholder=" Register Email"
              required
              // value={patientEmail}
              // onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full  p-2 rounded-xl hover:border-blue-500 border border-blue-500"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              required
              // value={patientEmail}
              // onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full  p-2 rounded-xl hover:border-blue-500 border border-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              required
              // value={patientEmail}
              // onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full  p-2 rounded-xl hover:border-blue-500 border border-blue-500"
            />
            <select
              name=""
              id=""
              className="w-full  p-2 rounded-xl pr-3 hover:border-blue-500 border border-blue-500"
            >
              <option>City</option>
              {City.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
            </select>

            <select
              name=""
              id=""
              className="w-full  p-2 rounded-xl pr-3 hover:border-blue-500 border border-blue-500"
            >
              <option>State</option>
              {State.map((state, index) => (
                <option key={index}>{state}</option>
              ))}
            </select>
          </div>
          <div className="border-blue-400 border  rounded">
            <PaymentElement />
          </div>

          <button
            type="submit"
            disabled={loading || !stripe}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {message && <p className="text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Paymentpage;
