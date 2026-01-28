import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../Components/theme/Typography";
import { logo } from "../../src/assets/images";
import TextInput from "../Components/theme/TextInput";
const SKINORA_API_URL = process.env.REACT_APP_SKINORA_API_URL;


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const navigate =useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  // clear previous message
  setMessage("");

  if (password !== confirmPassword) {
    setMessage("Passwords do not match");
    setMessageType("error");

    setTimeout(() => setMessage(""), 3000);
    return;
  }

  try {
    const res = await axios.post(
      `${SKINORA_API_URL}/api/auth/register`,
      {
        name,
        email,
        password,
      }
    );

    setMessage("Registration successful! Redirecting to login...");
    setMessageType("success");

    console.log("Registered:", res.data);

    // redirect after 1.5s
    setTimeout(() => {
      navigate("/login");
    }, 1500);

    // hide message after 3s
    setTimeout(() => setMessage(""), 3000);

  } catch (error) {
    const backendMessage =
      error.response?.data?.message || "Something went wrong";

    setMessage(backendMessage);
    setMessageType("error");

    setTimeout(() => setMessage(""), 3000);
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-xl shadow-xl">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Skinora Logo" className="h-20 w-auto" />
            <Typography
              variant="h1"
              className="text-2xl font-bold text-primary whitespace-nowrap"
            >
              Skin<span className="text-secondary">Ora</span>
            </Typography>
          </Link>

          <h2 className="mt-4 text-4xl font-semibold text-primary">
            Create Account
          </h2>
          <p className="text-gray-700 text-center">
            Fill in the details to create your account
          </p>
        </div>
        {message && (
                    <div
            className={`mt-6 p-3 text-sm rounded-lg text-center ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-4">
          <div>
            <label className="text-gray-800">Full Name</label>
            <TextInput
              size="medium"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-800">Email Address</label>
            <TextInput
              size="medium"
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-800">Password</label>
            <TextInput
              size="medium"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-800">Confirm Password</label>
            <TextInput
              size="medium"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <p className="text-gray-800 font-serif text-sm">
            By creating an account you agree to our{" "}
            <Link
              to="/terms"
              className="font-semibold hover:text-secondary underline"
            >
              Terms & Conditions
            </Link>
            .
          </p>

          <div>
            <button
              type="submit"
              className="mt-8 bg-primary text-white hover:bg-secondary mx-auto block px-5 py-2 rounded-lg font-semibold transition w-full duration-200"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login */}
        <p className="mt-4 text-center text-gray-800 font-serif">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:text-secondary underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
