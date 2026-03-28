import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const PaymentProcess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  const orderId = searchParams.get("orderId");
  const type = searchParams.get("type");
  const amount = searchParams.get("amount");
  const email = searchParams.get("email");

  // Format amount to INR currency
  const formattedAmount = amount
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Number(amount))
    : "N/A";

  const handlePayNow = async () => {
  try {
    setLoading(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // 🔥 store key in env
      amount: Number(amount) * 100,
      currency: "INR",
      order_id: orderId,

      name: "Digitace Influencer Awards",
      description: type,

      handler: async function (response: any) {
        try {
          await axios.post(
            "https://influencers.digitacetechsolutions.com/api/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          setPaymentStatus("SUCCESS");

        } catch (err) {
          console.error("Verification failed", err);
        }
      },

      prefill: {
        email: email || "",
      },

      theme: {
        color: "#C9A13B",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download functionality
    console.log("Downloading invoice for order:", orderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Success Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary/20 text-center space-y-8">
          {/* Success Message */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <svg
                className="w-10 h-10 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Thank you for registration
            </h1>
            <p className="text-lg text-muted-foreground">
              You are just one step behind the registration
            </p>
          </div>

          {/* Registration Details */}
          <div className="space-y-4 bg-secondary/30 rounded-2xl p-6 md:p-8">
            <div className="space-y-3">
              <p className="text-muted-foreground">
                You have applied for:{" "}
                <span className="font-semibold text-foreground text-lg">
                  {type || "N/A"}
                </span>
              </p>
              <p className="text-muted-foreground">
                Order Id:{" "}
                <span className="font-mono font-semibold text-primary text-lg">
                  {orderId || "N/A"}
                </span>
              </p>
              {email && (
                <p className="text-muted-foreground">
                  Email:{" "}
                  <span className="font-semibold text-foreground text-lg">
                    {email}
                  </span>
                </p>
              )}
              <p className="text-muted-foreground">
                You have to pay amount:{" "}
                <span className="font-semibold text-primary text-xl">
                  {formattedAmount}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
  onClick={handlePayNow}
  size="lg"
  disabled={loading || paymentStatus === "SUCCESS"}
  className="gradient-gold text-primary-foreground font-semibold px-8 py-6 rounded-full"
>
  {loading ? "Processing..." : paymentStatus === "SUCCESS" ? "Paid ✅" : "Pay Now"}
</Button>
            <Button
  onClick={handleDownloadInvoice}
  disabled={paymentStatus !== "SUCCESS"}
  variant="outline"
  size="lg"
  className={`font-semibold px-8 py-6 rounded-full flex items-center justify-center gap-2 ${
    paymentStatus !== "SUCCESS"
      ? "opacity-50 cursor-not-allowed"
      : ""
  }`}
>
  <Download className="w-5 h-5" />
  Download Invoice
</Button>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-primary/10">
            <p className="text-sm text-muted-foreground">
              Having any issues? Contact us at{" "}
              <span className="font-semibold text-foreground">
                {"{Contact_No}"}
              </span>{" "}
              or via email at{" "}
              <span className="font-semibold text-foreground">
                {"{email}"}
              </span>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Keep your Order ID for future reference</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;
