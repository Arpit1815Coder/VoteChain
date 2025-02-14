import React, { useContext, useState, useEffect } from "react";
import { CandidateContext } from "../context/CandidateContext";

const CandidatesDetail = () => {
  const { candidates, setCandidates } = useContext(CandidateContext);
  const [deleteMessage, setDeleteMessage] = useState(""); // State for delete message

  // Function to delete all candidate data from localStorage
  const handleDeleteCandidates = () => {
    localStorage.removeItem("candidates"); // Remove from localStorage
    setCandidates([]); // Clear state
    setDeleteMessage("✅ All candidate data has been deleted!"); // Set message
  };

  // Effect to clear message after 3 seconds
  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);

  return (
    <div className="p-6 min-h-full flex font-mono flex-col items-center bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-300">📜 Candidates List</h2>

      <div className="w-full max-w-5xl bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              {["Image", "Name", "Age", "Party", "Qualification", "Votes"].map((header) => (
                <th key={header} className="p-3 border border-gray-600 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-800 odd:bg-gray-700 text-gray-300 text-center hover:bg-gray-600 transition-all"
                >
                  <td className="p-3 border border-gray-600">
                    {candidate.image ? (
                      <img src={candidate.image} alt={candidate.name} className="w-12 h-12 rounded-full mx-auto" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-3 border border-gray-600">{candidate.name}</td>
                  <td className="p-3 border border-gray-600">{candidate.age}</td>
                  <td className="p-3 border border-gray-600">{candidate.party}</td>
                  <td className="p-3 border border-gray-600">{candidate.qualification}</td>
                  <td className="p-3 border border-gray-600 font-semibold text-blue-400">
                    {candidate.votes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400 font-semibold">
                  No candidates added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Button */}
      {candidates.length > 0 && (
        <button
          onClick={handleDeleteCandidates}
          className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-md"
        >
          🗑 Delete All Candidates
        </button>
      )}

      {/* Message after deletion */}
      {deleteMessage && (
        <p className="mt-4 text-green-400 font-semibold animate-fadeOut">
          {deleteMessage}
        </p>
      )}
    </div>
  );
};

export default CandidatesDetail;
