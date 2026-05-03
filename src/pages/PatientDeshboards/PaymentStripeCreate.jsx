import React, { useEffect } from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Paymentpage from "./Paymentpage";
const stripepromise = loadStripe(
  "pk_test_51TGyn4EoUfTQXtUdA6uNjn5F1vd8iQOEyh0H6JTptB2SPyV60hO0eI8ln8ggFkJxTzzDu1qmTKFZuFRwjvfhws3k00YbnpcvnZ",
);
const PaymentStripeCreate = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(
          "https://doctor-apoitment-booking-system.onrender.com/Payment/createPayment",
          {
            appoitmentId,
            ammount: 500,
            doctorId,
            patientId,
            patientName,
            patientEmail,
          },
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    createPaymentIntent();
  });

  return;
  <div className="flex min-h-screen flex-col justify-center py-12 mb-20 bg-slate-50 sm:px-6 lg:px-8">
    <PatientSidebar></PatientSidebar>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        {clientSecret && (
          <Elements stripe={stripepromise} options={{ clientSecret }}>
            <Paymentpage />
          </Elements>
        )}
      </div>
    </div>
  </div>;
};

export default PaymentStripeCreate;
