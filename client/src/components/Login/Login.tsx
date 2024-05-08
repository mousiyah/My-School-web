import React, { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth.ts";
import { useNavigate } from "hooks/useNavigate";

import InputBox from "../common/InputWithIcon.tsx";
import Logo from "components/Logo.tsx";

import visual from "assets/visual_login.png";

import { FaArrowLeft } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";

const Login: React.FC = () => {
  const { login, userExists } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);
  const [signinSuccess, setSigninSuccess] = useState(false);

  const { navigateToDashboard } = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const validateEmailForm = () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return false;
    }
    setError("");
    return true;
  };

  const validatePasswordForm = () => {
    if (!password.trim()) {
      setError("Please enter your password");
      return false;
    }
    setError("");
    return true;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmailForm()) return;

    if (await userExists(email)) {
      setEmailEntered(true);
    } else {
      setError("User with this email does not exist");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    try {
      await login(email, password);
      navigateToDashboard();
      setSigninSuccess(true);
      setError("Login successful");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditEmail = () => {
    setError("");
    setSigninSuccess(false);
    setEmailEntered(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-fit text-center p-4">
        <img src={visual} alt="School" className="w-1/3 mx-auto" />
        <Logo size={4.5} />

        <form
          onSubmit={emailEntered ? handlePasswordSubmit : handleEmailSubmit}
          method="get"
          autoComplete="on"
        >
          {emailEntered ? (
            <div>
              <div className="text-left">
                <button type="button" onClick={handleEditEmail}>
                  <div className="flex ml-2 items-center text-accent">
                    <FaArrowLeft />
                    <p className="mb-0 ml-4 text-base text-gray-600">{email}</p>
                  </div>
                </button>
              </div>

              <InputBox
                icon={<MdLock />}
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : (
            <InputBox
              icon={<MdEmail />}
              placeholder="Email address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {error && (
            <div
              className={`${
                signinSuccess ? "text-green-600" : "text-red-600"
              } mt-4`}
            >
              {error}
            </div>
          )}

          {!emailEntered && (
            <button type="submit" className="btn btn-primary btn-wide mt-2">
              Next
            </button>
          )}

          {emailEntered && (
            <button type="submit" className="btn btn-primary btn-wide mt-2">
              Login
            </button>
          )}
        </form>

        <div className="mt-4">
          <span className="text-gray-600">Forgot password? </span>
          <a href="#" className="text-primary hover:underline">
            Reset
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
