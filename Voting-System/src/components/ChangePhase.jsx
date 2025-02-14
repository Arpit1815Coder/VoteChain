import React, { useContext } from "react";
import { PhaseContext } from "../context/PhaseContext";

const ChangePhase = () => {
  const { phase, setPhase } = useContext(PhaseContext);

  const changePhase = (newPhase) => {
    setPhase(newPhase);
    localStorage.setItem("electionPhase", newPhase); // ✅ Save to localStorage
  };

  return (
    <div className="flex flex-col font-mono items-center min-h-screen bg-gray-900 text-white p-6">
      {/* Heading at the top */}
      <div className="w-full text-center py-6">
        <h1 className="text-3xl font-bold text-gray-400">⚡ Election Phase Control ⚡</h1>
      </div>

      {/* Toggle Buttons for Each Phase */}
      <div className="flex space-x-4  mt-8">
        <button
          onClick={() => changePhase("registration")}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            phase === "registration" ? "bg-green-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={phase === "registration"}
        >
          📋 Registration
        </button>
        <button
          onClick={() => changePhase("voting")}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            phase === "voting" ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={phase === "voting"}
        >
          🗳 Voting
        </button>
        <button
          onClick={() => changePhase("results")}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            phase === "results" ? "bg-red-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={phase === "results"}
        >
          📊 Results
        </button>
      </div>

      {/* Display Current Phase */}
      <div className="text-2xl font-semibold mt-6 text-center">
        {phase === "registration" && <p>📋 <span className="text-green-400">Registration is Open</span></p>}
        {phase === "voting" && <p>🗳 <span className="text-blue-400">Voting is Live</span></p>}
        {phase === "results" && <p>📊 <span className="text-red-400">Election is Over</span></p>}
      </div>
    </div>
  );
};

export default ChangePhase;
