import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccesspage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 text-center animate-fade-in">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="80px"
            viewBox="0 -960 960 960"
            width="80px"
            fill="#2854C5"
          >
            <path d="M400-318 247-471l42-42 111 111 271-271 42 42-313 313Z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your payment. Your transaction has been processed
          securely.
        </p>
        <Link
          to="/patienthome"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105"
        >
          Go to Patient Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccesspage;
