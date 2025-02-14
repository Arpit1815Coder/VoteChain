import React, { useContext, useEffect, useState } from "react";
import { VoterContext } from "../context/VoterContext";

const Register = () => {
  const { registeredVoters, setRegisteredVoters, authenticateVoter } = useContext(VoterContext);
  const [otp, setOtp] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [message, setMessage] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(false); // New state for re-render

  useEffect(() => {
    console.log("Registered Voters:", registeredVoters);
  }, [registeredVoters, reloadTrigger]); // Added reloadTrigger to dependency array

  const handleAuthenticate = () => {
    const success = authenticateVoter(aadhaar, otp);
    if (success) {
      setMessage("✅ Voter authenticated successfully! You can now vote.");
      setAadhaar("");
      setOtp("");
      localStorage.setItem("voterEligibility", JSON.stringify({ aadhaar, eligible: true }));
    } else {
      setMessage("❌ Invalid Aadhaar or OTP. Please try again.");
    }
  };

  const handleClearVoters = () => {
    if (window.confirm("Are you sure you want to clear all registered voters?")) {
      localStorage.removeItem("registeredVoters"); // Remove from local storage
      setRegisteredVoters([]); // Clear context state
      setMessage("✅ All registered voter data has been cleared.");
      setReloadTrigger((prev) => !prev); // Toggle state to force re-render
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg flex flex-col md:flex-row gap-6 shadow-lg">
      {/* Registered Voters Table */}
      <div className="w-full md:w-2/3 p-5 rounded-lg shadow bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-5">Registered Voters</h2>
        {registeredVoters.length === 0 ? (
          <p className="text-center text-gray-400">No voters registered yet.</p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="border border-gray-600 p-3">Aadhaar Number</th>
                  <th className="border border-gray-600 p-3">Assigned OTP</th>
                  <th className="border border-gray-600 p-3">Registered</th>
                  <th className="border border-gray-600 p-3">Eligible to Vote</th>
                </tr>
              </thead>
              <tbody>
                {registeredVoters.map((voter, index) => (
                  <tr key={index} className="text-center even:bg-gray-700 odd:bg-gray-800">
                    <td className="border border-gray-600 p-3">{voter.aadhaar}</td>
                    <td className="border border-gray-600 p-3 font-semibold text-blue-400">{voter.otp}</td>
                    <td className="border border-gray-600 p-3 font-semibold text-green-400">Yes</td>
                    <td className="border border-gray-600 p-3 font-semibold">
                      {voter.eligible ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleClearVoters}
              className="w-full mt-5 p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              🗑 Clear Registered Voters
            </button>
          </>
        )}
      </div>

      {/* Voter Authentication Section */}
      <div className="w-full md:w-1/3 p-5 rounded-lg shadow bg-gray-800 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-center mb-4">Authenticate Voter</h2>
        <input
          type="text"
          placeholder="Enter Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAuthenticate}
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          ✅ Authenticate
        </button>
        {message && <p className="mt-3 text-center font-semibold text-gray-300">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
