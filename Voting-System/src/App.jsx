import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CandidateProvider } from "./context/CandidateContext";
import { VoterProvider } from "./context/VoterContext";
import { PhaseProvider } from "./context/PhaseContext";

import LandingPage from "./pages/LandingPage";
import LoginSignupUser from "./pages/LoginSignupUser";
import LoginSignupAdmin from "./pages/LoginSignupAdmin";

import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

import Guide from "./components/Guide";
import VoterRegistration from "./components/VoterRegistration";
import AddCandidate from "./components/AddCandidate";
import CandidatesDetail from "./components/CandidatesDetail";
import Register from "./components/Register";
import ChangePhase from "./components/ChangePhase";
import VotingArea from "./components/VotingArea";
import Results from "./components/Results"; // Import the Results component

const App = () => {
  return (
    <PhaseProvider>
      <VoterProvider>
        <CandidateProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login-user" element={<LoginSignupUser />} />
            <Route path="/login-admin" element={<LoginSignupAdmin />} />

            {/* Admin Dashboard with Nested Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route path="add-candidate" element={<AddCandidate />} />
              <Route path="candidates" element={<CandidatesDetail />} />
              <Route path="register" element={<Register />} />
              <Route path="change-phase" element={<ChangePhase />} />
            </Route>

            {/* User Dashboard with Nested Routes */}
            <Route path="/user-dashboard" element={<UserDashboard />}>
              <Route path="guide" element={<Guide />} />
              <Route path="register" element={<VoterRegistration />} />
              <Route path="vote" element={<VotingArea />} />
              <Route path="results" element={<Results />} /> {/* New Results Route */}
            </Route>
          </Routes>
        </CandidateProvider>
      </VoterProvider>
    </PhaseProvider>
  );
};

export default App;
