import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  const reference = searchParams.get("reference");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const payment = await axios.get(
          `http://localhost:3000/pay/verify/${reference}`,
        );
        setStatus(payment.data.data.status);
      } catch (error) {
        console.log(error.response.data || "Something went wrong");
      }
    };

    confirmPayment();
  }, [reference]);

  return (
    <div className="flex items-center justify-center flex-col min-h-[80vh]">
      {status === "loading" && (
        <div className="flex items-center justify-center flex-col gap-5">
          <button className="animate-spin">
            <ImSpinner2 />
          </button>
          <h1>Loading ...</h1>
        </div>
      )}
      {status === "success" && (
        <div className="flex items-center justify-center flex-col gap-5">
          <h1 className="text-green-500 text-xl">Your payment is Successful</h1>
          <Link to="/">
            <button className="py-2 px-4 text-black border border-gray-900 rounded-md text-xl cursor-pointer">
              Go to home page
            </button>
          </Link>
        </div>
      )}
      {status === "failed" && (
        <div className="flex items-center justify-center flex-col gap-5">
          <h1 className="text-red-500 text-xl">Your payment failed</h1>
          <Link to="/">
            <button className="py-2 px-4 text-black border border-gray-900 rounded-md text-xl cursor-pointer">
              Go to home page
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
