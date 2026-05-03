import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import PatientSidebar from "./patientSidebar";
import { IoArrowBack } from "react-icons/io5";
import { PaymentElement } from "@stripe/react-stripe-js";
const Paymentpage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");

  const ammount = state?.ammount || 0;
  const appoitmentId = state?.appoitmentId || "";
  const doctorId = state?.doctorId || "";
  const patientId = state?.patientId || "";

  const handelCreatePayment = async () => {
    try {
      setMessage("");

      const res = await axios.post(
        "https://doctor-apoitment-booking-system.onrender.com/Payment/createPayment",
        {
          appoitmentId,
          doctorId,
          patientId,
          patientName,
          patientEmail,
        },
      );
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.log(err);
      setMessage("Unable to Create a Payment");
    }
  };

  const handelPaybutton = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setMessage("Please continue to payment first");
    }
    try {
      setLoading(true);
      setMessage("");

      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          receipt_email: patientEmail,
          return_url: "http://localhost:5173/payment-success",
        },
      });

      if (result.error) {
        setMessage(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("payment successfully");
      } else {
        setMessage(`payment status: ${result.paymentIntent?.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <PatientSidebar></PatientSidebar>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <Link to="/patienthome">
          <button className="flex items-center cursor-pointer text-slate-800 underline mb-6 hover:text-blue-600">
            <IoArrowBack className="mr-2 cursor-pointer" />
            Back
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Payment Form
        </h1>

        <form className="space-y-5" onSubmit={handelPaybutton}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              required
              name="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-slate-50 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Patient Email
            </label>
            <input
              type="email"
              name="Patient Email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              placeholder="Enter patient email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-slate-50 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Card Details
            </label>
            <div className="w-full px-2 py-2 rounded-xl border border-gray-300 bg-slate-50 text-gray-400">
            <PaymentElement></PaymentElement>
            </div>
          </div>

          <button
            type="submit"
            onClick={handelCreatePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Paymentpage;
