import React, { useState } from 'react';
import { useAppContext } from '../../UseContext/context';
import axios from 'axios';
import { useEffect } from 'react';

export const LoginForm = ({ onClose }) => {
  const { LoginData, setLoginData, handleLogin, AllData } = useAppContext();

  const handleLoginData = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(); // Ensure login is successful before proceeding
      await AllData(); // Fetch all data after login
      onClose(); // Close the modal
    } catch (err) {
      console.error("Login failed: ", err);
      // Optionally show an error toast here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 mt-6">
        <input
          type="email"
          id="email"
          placeholder="Enter Registered Email ID"
          name="email"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          value={LoginData.email}
          onChange={handleLoginData}
          required
        />
      </div>
      <div className="mb-10">
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          value={LoginData.password}
          onChange={handleLoginData}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full mb-8 bg-blue-500 dark:bg-blue-600 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

// Signup Form

export const SignupForm = ({ onClose,Otpverify }) => {
  const { signInData, setSignInData, handleSignIn } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignIn(); // Sign up the user
      onClose(); // Close the modal after signup
      Otpverify(true);

    } catch (err) {
      console.error("Signup failed: ", err);
      // Optionally show an error toast here
    }
  };

  const handleSignData = (e) => {
    setSignInData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 mt-6">
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name"
          name="name"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          value={signInData.name}
          onChange={handleSignData}
          required
        />
      </div>
      <div className="mb-6">
        <input
          type="email"
          id="email"
          placeholder="Enter Email ID"
          name="email"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          value={signInData.email}
          onChange={handleSignData}
          required
        />
      </div>
      <div className="mb-10">
        <input
          type="password"
          id="password"
          placeholder="Create Password"
          name="password"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          value={signInData.password}
          onChange={handleSignData}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full mb-8 bg-green-500 dark:bg-green-600 text-white py-2 rounded hover:bg-green-600 dark:hover:bg-green-700"
      >
        Sign Up
      </button>
    </form>
  );
};

export const Otpverify = ({onClose,close}) => {
  const { Otpverification, setOtpData, verifyOtpData } = useAppContext();
  const [otpIs, setOtp] = useState(""); // Initialize OTP as a string
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log("Updated OTP Data:", verifyOtpData.email, verifyOtpData.otp);
  // }, [verifyOtpData]);

  const HandleSubmitOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await Otpverification(otpIs,onClose); // Call OTP verification function
      setLoading(false); // Stop loading after success
      setOtp("");
      
    } catch (err) {
      console.log("error");
      console.error(err);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <form onSubmit={HandleSubmitOtp} className="flex flex-col gap-[2rem]">
      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="Enter Valid OTP"
          name="otp"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          value={otpIs} // Correctly bind otp state to input
          onChange={(e) => setOtp(e.target.value)} // Update OTP value
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mb-8 bg-green-500 dark:bg-green-600 text-white py-2 rounded hover:bg-green-600 dark:hover:bg-green-700"
        disabled={loading} // Disable button during loading
      >
        {loading ? "Verifying..." : "Verify OTP"} 
      </button>
    </form>
  );
};