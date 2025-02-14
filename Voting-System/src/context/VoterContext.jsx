import React, { createContext, useState, useEffect } from "react";

export const VoterContext = createContext();

export const VoterProvider = ({ children }) => {
  const [registeredVoters, setRegisteredVoters] = useState(() => {
    const storedVoters = localStorage.getItem("registeredVoters");
    return storedVoters ? JSON.parse(storedVoters) : [];
  });

  useEffect(() => {
    localStorage.setItem("registeredVoters", JSON.stringify(registeredVoters));
  }, [registeredVoters]);

  const registerVoter = (aadhaar, otp) => {
    const newVoter = { aadhaar, otp, isRegistered: true, eligible: false, hasVoted: false };
    setRegisteredVoters((prev) => [...prev, newVoter]);
  };

  const authenticateVoter = (aadhaar, otp) => {
    const updatedVoters = registeredVoters.map((voter) =>
      voter.aadhaar === aadhaar && voter.otp === otp
        ? { ...voter, eligible: true }
        : voter
    );

    const isValidVoter = updatedVoters.some(
      (voter) => voter.aadhaar === aadhaar && voter.otp === otp
    );

    if (isValidVoter) {
      setRegisteredVoters(updatedVoters);
      return true;
    }
    return false;
  };

  const checkAadhaarEligibility = (aadhaar) => {
    const voter = registeredVoters.find(
      (v) => v.aadhaar === aadhaar && v.eligible
    );
    return voter ? true : false;
  };

  return (
    <VoterContext.Provider
      value={{ registeredVoters, registerVoter, authenticateVoter, checkAadhaarEligibility }}
    >
      {children}
    </VoterContext.Provider>
  );
};
