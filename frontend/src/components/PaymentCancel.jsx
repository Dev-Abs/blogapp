// cancel payment component , design using tailwind css

import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Payment Cancelled</h1>
            <button
            onClick={() => navigate("/pricing")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            Go to Pricing
            </button>
        </div>
        </div>
    );
};

export default PaymentCancel;