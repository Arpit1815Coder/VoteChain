import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaVoteYea, FaPoll, FaSignOutAlt, FaUserPlus, FaListAlt, FaKey, FaExchangeAlt } from "react-icons/fa";

const Sidebar = ({ userType }) => {
  const userLinks = [
    { name: "Guide", path: "/user-dashboard/guide", icon: <FaUser /> },
    { name: "Voter Registration", path: "/user-dashboard/register", icon: <FaUserPlus /> },
    { name: "Voting Area", path: "/user-dashboard/vote", icon: <FaVoteYea /> },
    { name: "Results", path: "/user-dashboard/results", icon: <FaPoll /> },
    { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
  ];

  const adminLinks = [
    { name: "Add Candidate", path: "/admin-dashboard/add-candidate", icon: <FaUserPlus /> },
    { name: "Candidate Details", path: "/admin-dashboard/candidates", icon: <FaListAlt /> },
    { name: "Authentication", path: "/admin-dashboard/register", icon: <FaKey /> },
    { name: "Change Phase", path: "/admin-dashboard/change-phase", icon: <FaExchangeAlt /> },
    { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
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
              className={`flex items-center px-2 py-3 font-mono font-bold rounded-lg transition-all duration-300 hover:bg-gray-700 
                ${
                  link.name === "Logout"
                    ? "text-red-500 hover:bg-red-800 hover:text-white"
                    : "text-white/70 hover:text-gray-200"
                }`}
            >
              <span className="mr-3 text-lg">{link.icon}</span> {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
