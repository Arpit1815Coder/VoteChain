import React, { useState, useContext } from "react";
import { VoterContext } from "../context/VoterContext"; // Import VoterContext for voter registration
import { PhaseContext } from "../context/PhaseContext"; // Import PhaseContext for phase control

const VotingRegistration = () => {
  const { registerVoter } = useContext(VoterContext); // Context for voter actions
  const { phase } = useContext(PhaseContext); // Context for election phase

  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState(""); // UI messages
  const [messageType, setMessageType] = useState(""); // Message type (success/error)

  const isValidAadhaar = (aadhaar) => /^[0-9]{12}$/.test(aadhaar);

  const handleSendOtp = () => {
    if (!isValidAadhaar(aadhaar)) {
      setMessage("❌ Please enter a valid 12-digit Aadhaar number.");
      setMessageType("error");
      return;
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otpCode);
    setOtpSent(true);
    setMessage(`✅ OTP sent successfully! (OTP: ${otpCode})`);
    setMessageType("success");
  };

  const handleResendOtp = () => {
    handleSendOtp();
    setMessage("🔄 OTP Resent Successfully!");
    setMessageType("success");
  };

  const handleOtpChange = (e) => {
    const enteredOtp = e.target.value.replace(/\D/g, "");
    setOtp(enteredOtp);

    if (enteredOtp === generatedOtp?.toString()) {
      setOtpVerified(true);
      setMessage("✅ OTP Verified Successfully!");
      setMessageType("success");
    } else {
      setOtpVerified(false);
      setMessage("❌ Invalid OTP. Please try again.");
      setMessageType("error");
    }
  };

  const handleRegister = () => {
    if (otpVerified) {
      registerVoter(aadhaar, otp);
      setMessage("🎉 Registration successful!");
      setMessageType("success");
      setAadhaar("");
      setOtp("");
      setGeneratedOtp(null);
      setOtpSent(false);
      setOtpVerified(false);
    } else {
      setMessage("❌ Please enter the correct OTP before registering.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col font-mono items-center justify-center  p-8 text-gray-200">
      

      {/* Phase Messages */}
      {phase === "voting" ? (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-yellow-400 text-xl font-semibold">
          ⚠️ Registration has ended. Voting is now live!
        </div>
      ) : phase === "results" ? (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-red-400 text-xl font-semibold">
          🛑 Election is over!
        </div>
      ) : (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-green-400 text-xl font-semibold">
          ✅ Registration is open!
        </div>
      )}

      {/* Registration Form */}
      {phase === "registration" && (
        <div className="flex flex-col md:flex-row gap-10 items-center mt-20 justify-center w-full">
          <div className="md:w-1/2 max-w-md bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center text-blue-400 mb-4">Go and Register Yourself!</h2>

            <input
              type="text"
              maxLength="12"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              className="w-full p-2 border text-center border-gray-700 rounded-md mb-4 bg-gray-800 text-gray-200"
              placeholder="Enter Aadhaar Number"
            />

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full p-2 mt-2 text-white rounded-md bg-blue-600 hover:bg-blue-700"
              >
                Send OTP
              </button>
            ) : (
              <>
                <label className="block mt-4 mb-2 font-medium text-gray-300">Enter OTP</label>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                  placeholder="Enter OTP"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleResendOtp}
                    className="p-2 text-white rounded-md bg-yellow-600 hover:bg-yellow-700"
                  >
                    Resend OTP
                  </button>
                  <button
                    onClick={handleRegister}
                    className={`p-2 text-white rounded-md ${otpVerified ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-600 cursor-not-allowed"}`}
                    disabled={!otpVerified}
                  >
                    Register
                  </button>
                </div>
              </>
            )}

            {message && (
              <p className={`text-center mt-4 p-2 rounded-md ${messageType === "success" ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"}`}>
                {message}
              </p>
            )}
          </div>

          <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img
              src="/—Pngtree—diverse people waiting patiently in_15734001.png"
              alt="Voter Registration"
              className="w-auto h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingRegistration;
