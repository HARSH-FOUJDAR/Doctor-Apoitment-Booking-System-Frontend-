import React from "react";
import PatientSidebar from "./patientSidebar";
const PaymentVoucher = () => {
  return (
    <div>
      <PatientSidebar />
      <div className="p-6 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Payment Voucher
          </h2>
          <p className="flex justify-center items-center text-red-600">Not available</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentVoucher;
