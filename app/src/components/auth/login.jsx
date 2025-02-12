import React, { useState, useContext } from "react";
import axios from "../axios-instance";
import { authContext } from "../../../authContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login(props) {
  const navigate = useNavigate();
  const context = useContext(authContext);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [showLoginDropdown, setShowLoginDropdown] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorState(null);
    try {
      const { data } = await axios.post("/user/login/", loginState);
      if (data.isSuccess === true) {
        const userId = data.content;
        context.setLogin(userId);
        localStorage.setItem("userId", JSON.stringify(userId));
        navigate("/");
        props.toggleOverlayLogin();
        setShowLoginDropdown(false);
      }
    } catch (err) {
      console.error("Error during axios POST request:", err);
      if (err.response) {
        console.error("Server Response Data:", err.response.data.message);
      }
      setErrorState(err.response.data.message);
    }
  }

  const handleRegisterClick = (e) => {
    e.preventDefault();
    props.toggleOverlayLogin();
    props.toggleOverlayRegister();
    console.log(props)
  }

  return (
    <main>
      {showLoginDropdown && (
        <div>
          <form
            onSubmit={submitHandler}
            className="relative z-50 p-8 bg-white rounded-lg shadow-lg w-[400px] border border-neutral-400 "
            style={{
              background: "linear-gradient(to bottom right, #f3f4f6, #ffffff)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
            }}>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-neutral-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={loginState.email}
                onChange={(e) => {
                  setLoginState({ ...loginState, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Passwort"
                className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-neutral-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={loginState.password}
                onChange={(e) => {
                  setLoginState({ ...loginState, password: e.target.value });
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-700">Noch kein Account?</span>
              <a
                onClick={handleRegisterClick}
                className="text-sm text-purple-600 cursor-pointer hover:underline"
              >
                Registrieren
              </a>
            </div>
            <button
              type="submit"
              className="w-full p-3 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium"
            >
              Log in
            </button>
            {errorState && (
              <p className="mt-4 text-sm text-red-500">{errorState}</p>
            )}
          </form>
        </div>
      )}
    </main>
  );
}

export default Login;