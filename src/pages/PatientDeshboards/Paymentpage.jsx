import React, { useState } from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";
import { IoArrowBack } from "react-icons/io5";

const Paymentpage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [patientEmail, setPatientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
          receipt_email: patientEmail,
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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <PatientSidebar />

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <Link to="/patienthome">
          <button className="flex items-center mb-4 text-blue-600">
            <IoArrowBack /> Back
          </button>
        </Link>

        <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>

        <form onSubmit={handlePay} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="border p-3 rounded">
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