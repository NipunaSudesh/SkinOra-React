import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "../components/theme/Typography";
import { logo } from "../../src/assets/images";
import TextInput from "../components/theme/TextInput";
import Button from "../components/theme/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: call login API here
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-200 rounded-xl shadow-xl">
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
            Sign In
          </h2>
          <p className="text-gray-700 text-center">
            Use your email or phone number to sign in
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-4">
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
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p className="text-gray-800 font-serif text-sm">
            By signing in you agree to our{" "}
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
  Sign In
</button>
</div>

          {/* <Button className="w-full" type="submit">
            Sign In
          </Button> */}
        </form>

        {/* Register */}
        <p className="mt-4 text-center text-gray-800 font-serif">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold hover:text-secondary underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
