import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const storageKey = isAdmin ? "admins" : "users";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = () => {
    const storedUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
    const userExists = storedUsers.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (userExists) {
      alert(`${isAdmin ? "Admin" : "User"} login successful!`);
      navigate(isAdmin ? "/admin-dashboard" : "/user-dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleSignup = () => {
    const storedUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (storedUsers.some((user) => user.email === formData.email)) {
      setError("User already registered. Please log in.");
      return;
    }
    storedUsers.push(formData);
    localStorage.setItem(storageKey, JSON.stringify(storedUsers));
    alert("Signup successful! Now log in.");
    setIsLogin(true);
    setFormData({ username: "", email: "", password: "" });
  };

  const handleForgotPassword = () => {
    const storedUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
    const userIndex = storedUsers.findIndex((user) => user.email === formData.email);
    if (userIndex !== -1) {
      const newPassword = prompt("Enter your new password:");
      if (newPassword) {
        storedUsers[userIndex].password = newPassword;
        localStorage.setItem(storageKey, JSON.stringify(storedUsers));
        alert("Password reset successful! Please login with your new password.");
      }
    } else {
      setError("Email not found.");
    }
  };

  const handleDeleteAccount = () => {
    const storedUsers = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedUsers = storedUsers.filter((user) => user.email !== formData.email);
    if (storedUsers.length !== updatedUsers.length) {
      localStorage.setItem(storageKey, JSON.stringify(updatedUsers));
      alert("Account deleted successfully.");
      setIsLogin(true);
      setFormData({ username: "", email: "", password: "" });
    } else {
      setError("Account not found.");
    }
  };

  return (
    <div className="flex items-center font-mono justify-center min-h-screen bg-gray-900 p-6">
      <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? (isAdmin ? "Admin Login" : "User Login") : (isAdmin ? "Admin Signup" : "User Signup")}
        </h2>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        {!isLogin && (
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="w-full p-3 border rounded-lg mb-3 bg-gray-700 text-white"
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full p-3 border rounded-lg mb-3 bg-gray-700 text-white"
        />

        {!showForgotPassword && (
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full p-3 border rounded-lg mb-4 bg-gray-700 text-white"
          />
        )}

        <div className="flex justify-between">
          {isLogin ? (
            <>
              <button onClick={handleAuth} className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">Login</button>
              <button onClick={() => setIsLogin(false)} className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600">Sign Up</button>
            </>
          ) : (
            <>
              <button onClick={handleSignup} className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">Sign Up</button>
              <button onClick={() => setIsLogin(true)} className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600">Login</button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          {isLogin && (
            <button onClick={() => setShowForgotPassword(true)} className="text-blue-400 hover:underline">Forgot Password?</button>
          )}
          {isLogin && (
            <button onClick={() => setShowDeleteConfirm(true)} className="text-red-400 hover:underline ml-4">Delete Account</button>
          )}
        </div>

        {showForgotPassword && (
          <div className="mt-4">
            <button onClick={handleForgotPassword} className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 w-full">Reset Password</button>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="mt-4">
            <p className="text-center">Are you sure you want to delete your account?</p>
            <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 w-full mt-2">Confirm Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;