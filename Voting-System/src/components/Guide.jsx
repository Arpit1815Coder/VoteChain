import React from "react";

const Guide = () => {
  return (
    <div className="max-w-6xl mx-auto font-mono p-8 bg-gray-900 text-white rounded-lg h-[85vh] overflow-y-auto">
      <h1 className="text-2xl font-bold text-center text-violet-400 mb-8">🗳 Voting System Guide</h1>

      {/* Grid Container */}
      <div className="grid md:grid-cols-2 mt-32 gap-8">
        {/* Voter Registration */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-lg border-l-8 border-blue-500 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">📌 Voter Registration</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 leading-relaxed">
            <li>Users must <strong>register</strong> before voting.</li>
            <li>Registration requires an <strong>Aadhar card number</strong> and an account address.</li>
            <li>Only users aged <strong>18 and above</strong> are eligible to vote.</li>
            <li>An <strong>OTP verification</strong> process is required for successful registration.</li>
          </ul>
        </section>

        {/* Voting Process */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-lg border-l-8 border-green-500 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">🗳️ Voting Process</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 leading-relaxed">
            <li>The voting process has <strong>three phases</strong>: Registration, Voting, and Results.</li>
            <li><strong>Registration Phase</strong>: Users register before the voting process begins.</li>
            <li><strong>Voting Phase</strong>: Click the "Vote" button next to the desired candidate.</li>
            <li>Once a vote is cast, it is <strong>final</strong> and cannot be changed.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Guide;
