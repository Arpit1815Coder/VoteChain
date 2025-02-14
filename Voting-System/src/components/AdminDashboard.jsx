import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Sidebar from "./Sidebar";
import { VoterContext } from "../context/VoterContext"; // Ensure correct path

const AdminDashboard = () => {
  const { registeredVoters } = useContext(VoterContext);
  const location = useLocation();

  // Show welcome message only when at "/admin-dashboard" (not nested routes)
  const showWelcome = location.pathname === "/admin-dashboard";

  // Log registeredVoters to check if AdminDashboard receives it
  useEffect(() => {
    console.log("Registered Voters in AdminDashboard:", registeredVoters);
  }, [registeredVoters]);

  return (
    <div className="flex h-screen">
      <Sidebar userType="admin" />

      <div className="flex-1 bg-gray-900 p-5 text-white">
        {/* Welcome Message */}
        {showWelcome && (
          <div className="text-center mt-40 text-2xl font-semibold">
          Welcome to <span className="text-blue-400 font-mono text-bold">VoteChain</span><br /> Your secure and transparent voting system! 🗳
        </div>
        )}

        {/* Render Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
