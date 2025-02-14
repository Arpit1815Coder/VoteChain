import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Sidebar from "./Sidebar";

const UserDashboard = () => {
  const location = useLocation();

  // Show welcome message only when at "/user-dashboard" (not nested routes)
  const showWelcome = location.pathname === "/user-dashboard";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar userType="user" />

      {/* Main Content Area */}
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

export default UserDashboard;
