// payment successful component, using tailwind css

import React from "react";
import { useNavigate } from "react-router-dom";


const PaymentSuccessful = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessful;