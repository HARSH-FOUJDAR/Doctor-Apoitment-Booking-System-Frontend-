import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Paymentpage from "./Paymentpage";
import PatientSidebar from "./PatientSidebar";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentStripeCreate = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useLocation();

  const appointmentId = state?.appointmentId;
  const patientName = state?.patientName;
  const patientEmail = state?.patientEmail;

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/Payment/createPayment",
          {
            appointmentId,
            amount: 500,
            patientName,
            patientEmail,
          },
        );

        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    if (appointmentId) createPaymentIntent();
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 bg-slate-50">
      <PatientSidebar />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow rounded-lg">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Paymentpage />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStripeCreate;
