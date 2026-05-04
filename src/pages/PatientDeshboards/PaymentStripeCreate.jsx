import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Paymentpage from "./Paymentpage";
import PatientSidebar from "./PatientSidebar";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51TGyn4EoUfTQXtUdA6uNjn5F1vd8iQOEyh0H6JTptB2SPyV60hO0eI8ln8ggFkJxTzzDu1qmTKFZuFRwjvfhws3k00YbnpcvnZ",
);

const PaymentStripeCreate = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/Payment/createPayment",
          {
            amount: 500,
          },
        );

        console.log("Payment Response:", res.data);

        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
        setError("Payment form failed to load.");
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="mt-10 sm:mx-auto sm:w-full">
        <div className=" px-6 py-12  rounded-lg border-blue-400">
          {clientSecret && (
            <Elements
              className="stripe-elements"
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <Paymentpage />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStripeCreate;
