import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const reference = searchParams.get("reference");

        if (!reference) {
          setStatus("failed");
          return;
        }

        const token = Cookies.get("token");

        const response = await axios.get(
          `http://localhost:3000/pay/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.log(error);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" && (
        <div className="text-center">
          <ImSpinner2 className="text-5xl mx-auto animate-spin text-blue-600" />

          <h2 className="mt-4 text-xl font-semibold">Verifying payment...</h2>

          <p className="text-gray-500 mt-2">
            Please wait while we confirm your payment.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <FaCheckCircle className="text-7xl mx-auto text-green-500" />

          <h2 className="mt-4 text-2xl font-bold">Payment Successful!</h2>

          <p className="text-gray-500 mt-2">
            Your payment has been verified successfully.
          </p>
        </div>
      )}

      {status === "failed" && (
        <div className="text-center">
          <FaTimesCircle className="text-7xl mx-auto text-red-500" />

          <h2 className="mt-4 text-2xl font-bold">Payment Failed</h2>

          <p className="text-gray-500 mt-2">We couldn't verify your payment.</p>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
