import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="flex flex-col  justify-center min-h-screen bg-cover bg-center relative p-6"
      style={{
        backgroundImage: `url('/pexels-tara-winstead-8850706.jpg')`, // ✅ Use relative path from public/
      }}
    >
      {/* Dark Overlay for Readability */}
      

      {/* Content */}
      <div className="relative ml-20 text-white">
        {/* Welcome Message */}
        <h1 className="text-4xl  mb-3"> Welcome to the <strong>VoteChain</strong></h1>
        <p className="text-lg mb-6 max-w-md ">
           Choose your role and get started!
        </p>

        {/* Login Buttons */}
        <div className="flex space-x-4">
          <Link to="/login-user">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
              👤 Login as User
            </button>
          </Link>
          <Link to="/login-admin">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md">
              🛠️ Login as Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
