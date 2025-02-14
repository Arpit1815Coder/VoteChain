import React, { useContext } from "react";
import { CandidateContext } from "../context/CandidateContext";
import { PhaseContext } from "../context/PhaseContext"; // Import PhaseContext

const Result = () => {
  const { candidates } = useContext(CandidateContext);
  const { phase } = useContext(PhaseContext); // Get current phase

  // Display message based on the phase
  if (phase === "registration") {
    return (
      <div className="flex flex-col font-mono items-center mt-10 justify-center  text-yellow-400 text-3xl font-bold">
        📝 Registration is going on.
        <h2 className="flex items-center mt-2 justify-center font-bold text-green-400 text-xl ">Register Yourself First</h2>
      </div>
    );
  }

  if (phase === "voting") {
    return (
      <div className="flex items-center mt-10 font-mono justify-center  text-red-400 text-2xl font-semibold">
        🗳️ Go and vote first!
      </div>
    );
  }

  if (!candidates || candidates.length === 0) {
    return (
      <div className="flex items-center mt-10 font-mono justify-center  text-gray-400 text-xl">
        No candidates available.
      </div>
    );
  }

  // Find the candidate(s) with the maximum votes
  const maxVotes = Math.max(...candidates.map((c) => c.votes));
  const winners = candidates.filter((c) => c.votes === maxVotes);

  return (
    <div className="flex flex-col font-mono  items-center justify-center  p-8 text-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-300 mb-6">🏆 Election Results</h1>
      
      {/* Results Table */}
      <div className="overflow-x-auto w-full max-w-3xl">
        <table className="w-full text-center border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 border border-gray-700">Candidate</th>
              <th className="p-3 border border-gray-700">Name</th>
              <th className="p-3 border border-gray-700">Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border border-gray-700 bg-gray-900">
                <td className="p-3 flex items-center">
                  <img src={candidate.image} alt={candidate.name} className="w-16 h-16 mx-auto rounded-full" />
                </td>
                <td className="p-3 border border-gray-700">{candidate.name}</td>
                <td className="p-3 border border-gray-700 font-semibold text-yellow-400">{candidate.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Winner Announcement */}
      <div className="mt-6 p-5 bg-green-900 text-green-300 rounded-lg text-center max-w-lg shadow-lg">
        {winners.length > 1 ? (
          <p>🎉 It's a tie! The winners are: <span className="font-bold">{winners.map((w) => w.name).join(", ")}</span></p>
        ) : (
          <p>🎉 The winner is <span className="font-bold">{winners[0].name}</span> with <span className="font-bold">{maxVotes}</span> votes!</p>
        )}
      </div>
    </div>
  );
};

export default Result;
