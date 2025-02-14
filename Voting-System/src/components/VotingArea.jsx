import React, { useContext, useState } from "react";
import { CandidateContext } from "../context/CandidateContext";
import { VoterContext } from "../context/VoterContext"; 
import { PhaseContext } from "../context/PhaseContext"; // Import PhaseContext

const VotingArea = () => {
  const { candidates, voteCandidate } = useContext(CandidateContext);
  const { checkAadhaarEligibility } = useContext(VoterContext);
  const { phase } = useContext(PhaseContext); // Get phase state
  const [voted, setVoted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aadhaar, setAadhaar] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [error, setError] = useState("");

  const isValidAadhaar = (aadhaar) => /^[0-9]{12}$/.test(aadhaar);

  const handleVoteClick = (index) => {
    setSelectedCandidate(index);
    setIsModalOpen(true);
  };

  const handleAadhaarSubmit = async () => {
    if (!isValidAadhaar(aadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setError("");

    const isEligible = checkAadhaarEligibility(aadhaar);
    if (!isEligible) {
      setError("Your Aadhaar is not authenticated. Please authenticate yourself with the admin.");
      return;
    }

    voteCandidate(selectedCandidate);
    setVoted(true);
    setIsModalOpen(false);
  };

  if (phase === "registration") {
    return (
      <div className="flex flex-col items-center font-mono justify-center p-5 w-full bg-gray-900 text-white">
        <h2 className="text-3xl text-center font-bold mb-6 text-red-400">🚫 Voting Not Available</h2>
        <p className="text-lg text-gray-400">The registration phase is active. Please register yourself before voting.</p>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="flex flex-col items-center font-mono justify-center p-5 w-full bg-gray-900 text-white ">
        <h2 className="text-3xl text-center font-bold mb-6 text-green-400">📊 Election Results</h2>
        <p className="text-lg text-gray-400">The Voting phase is over. Check the results now!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-mono items-center p-5 w-full bg-gray-900 text-white ">
      <h2 className="text-3xl text-center font-bold mb-6 text-blue-400">🗳 Voting is live</h2>
      {candidates.length === 0 ? (
        <p className="text-center text-lg text-gray-400">
          No candidates available. Please wait for the admin to add candidates.
        </p>
      ) : (
        <div className="w-full max-w-5xl mt-10 overflow-x-auto">
          <table className="w-full text-center border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 border border-gray-700">Image</th>
                <th className="p-4 border border-gray-700">Name</th>
                <th className="p-4 border border-gray-700">Party</th>
                <th className="p-4 border border-gray-700">Qualification</th>
                <th className="p-4 border border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="hover:bg-gray-800 transition">
                  <td className="p-4 border border-gray-700">
                    <img
                      src={candidate.image || "/img.png"}
                      alt={candidate.name}
                      className="w-16 h-16 object-cover mx-auto rounded-lg"
                    />
                  </td>
                  <td className="p-4 border border-gray-700 font-semibold">{candidate.name}</td>
                  <td className="p-4 border border-gray-700 text-gray-400">{candidate.party}</td>
                  <td className="p-4 border border-gray-700 text-gray-400">{candidate.qualification || "N/A"}</td>
                  <td className="p-4 border border-gray-700">
                    <button
                      onClick={() => handleVoteClick(index)}
                      className={`px-4 py-2 font-semibold rounded-lg transition-all w-full ${
                        voted ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={voted}
                    >
                      {voted ? "Voted ✅" : "Vote"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center text-white mb-4">Aadhaar Verification</h2>
            <input
              type="text"
              maxLength="12"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-gray-200"
              placeholder="Enter Aadhaar Number"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-white rounded-md bg-red-600 hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAadhaarSubmit}
                className="p-2 text-white rounded-md bg-green-600 hover:bg-green-700"
              >
                Verify & Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingArea;
