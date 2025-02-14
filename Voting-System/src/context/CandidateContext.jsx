import React, { createContext, useState, useEffect } from "react";

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState(() => {
    const storedCandidates = localStorage.getItem("candidates");
    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  const addCandidate = (candidate) => {
    const updatedCandidates = [...candidates, { ...candidate, votes: 0 }];
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  const voteCandidate = (index) => {
    const updatedCandidates = candidates.map((candidate, i) =>
      i === index ? { ...candidate, votes: candidate.votes + 1 } : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  return (
    <CandidateContext.Provider value={{ candidates, addCandidate, voteCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};
