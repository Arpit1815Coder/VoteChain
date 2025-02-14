import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ userType }) => {
  const userLinks = [
    { name: "Guide", path: "/user-dashboard/guide" },
    { name: "Voter Registration", path: "/user-dashboard/register" },
    { name: "Voting Area", path: "/user-dashboard/vote" },
    { name: "Results", path: "/user-dashboard/results" },
    { name: "Logout", path: "/" },
  ];

  const adminLinks = [
    { name: "Add Candidate", path: "/admin-dashboard/add-candidate" },
    { name: "Candidate Details", path: "/admin-dashboard/candidates" },
    { name: "Authentication", path: "/admin-dashboard/register" },
    { name: "Change Phase", path: "/admin-dashboard/change-phase" },
    { name: "Logout", path: "/" },
  ];

  const links = userType === "user" ? userLinks : adminLinks;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-6 shadow-lg flex flex-col">
      {/* Dashboard Title */}
      <h2 className="text-lg font-bold uppercase tracking-wide mb-6 pb-2 border-b border-gray-700">
        {userType} Dashboard
      </h2>

      {/* Navigation Links */}
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`block px-4 py-3 font-mono font-bold rounded-lg transition-all duration-300 hover:bg-gray-700 
                ${
                  link.name === "Logout"
                    ? "text-red-500 hover:bg-red-800 hover:text-white"
                    : "text-white/70 hover:text-gray-200"
                }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
