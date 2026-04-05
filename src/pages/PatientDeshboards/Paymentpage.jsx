import React, { useState } from "react";
import axios from "axios";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const Paymentpage = () => {
  const stripe = useStripe();
  const element = useElements();
  const { state } = useLocation();
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientSecrte, setClientSecrate] = useState("");
  const [message, setMessage] = useState("");

  const ammount = state?.ammount || 0;
  const appoitmentId = state?.appoitmentId || "";
  const doctorId = state?.doctorId || "";
  const patientId = state?.patientId || "";

  const handelCreatePayment = async () => {
    try {
      setMessage("");

      const  res = await axios.post(
        "https://doctor-apoitment-booking-system.onrender.com/Payment/createPayment",
        {
          appoitmentId,
          doctorId,
          patientId,
          patientName,
          patientEmail
        }
      );
      setClientSecrate(res.data.clientSecrte
      )
    } catch (err) {
      console.log(err);
      setMessage("Unable to Create a Payment")
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Payment Form
        </h1>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              required
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
              placeholder="Enter patient email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-slate-50 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Card Details
            </label>
            <div className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-slate-50 text-gray-400">
              Stripe Card Element Here
            </div>
          </div>

          <button
            type="submit"
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
