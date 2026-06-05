import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Paymentpage from "./Paymentpage";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const stripePromise = loadStripe(
  "pk_test_51TGyn4EoUfTQXtUdA6uNjn5F1vd8iQOEyh0H6JTptB2SPyV60hO0eI8ln8ggFkJxTzzDu1qmTKFZuFRwjvfhws3k00YbnpcvnZ",
);

const PaymentStripeCreate = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://doctor-apoitment-booking-system.onrender.com/Payment/createPayment",
          {
            amount: 500,
          },
        );

        console.log("Payment Response:", res.data);

        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
        setError("Payment form failed to load.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0  bg-opacity-100 flex items-center justify-center z-50">
          <ClipLoader color="#3B82F6" size={100} speedMultiplier={0.8} />
          <br />
          <span className="ml-4 text-lg font-medium text-gray-700">
            Loading...
          </span>
        </div>
      )}
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
    </>
  );
};

export default PaymentStripeCreate;
