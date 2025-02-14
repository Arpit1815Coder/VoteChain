import React, { createContext, useState, useEffect } from "react";

export const PhaseContext = createContext();

export const PhaseProvider = ({ children }) => {
  // Load phase from localStorage if it exists, otherwise default to "registration"
  const [phase, setPhase] = useState(
    localStorage.getItem("electionPhase") || "registration"
  );

  useEffect(() => {
    // Save phase to localStorage whenever it changes
    localStorage.setItem("electionPhase", phase);
  }, [phase]);

  return (
    <PhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </PhaseContext.Provider>
  );
};
