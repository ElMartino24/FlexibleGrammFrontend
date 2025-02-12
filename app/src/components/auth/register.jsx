import React, { useState, useContext } from "react";
import axios from "../axios-instance";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function UserRegister(props) {
  const navigate = useNavigate();
  const context = useContext(authContext);

  const [createRegisterFields, setCreateRegisterFields] = useState({
    vorname: "",
    nachname: "",
    email: "",
    password: "",
  });

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorState, setErrorState] = useState(null);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const createAccountHandler = async (e) => {
    e.preventDefault();
    setErrorState(null);

    if (createRegisterFields.password !== passwordConfirmation) {
      setErrorState("Passwörter stimmen nicht überein");
      return;
    }

    try {
      const { data } = await axios.post("/user/register/", createRegisterFields);
      if (data.isSuccess === true) {
        const userId = data.content;
        context.setLogin(userId);
        localStorage.setItem("userId", JSON.stringify(userId));
        navigate("/");
        props.toggleOverlayRegister();
      }
    } catch (err) {
      console.error("Fehler beim POST-Request:", err);
      if (err.response) {
        console.error("Server Response Data:", err.response.data);
      }
      setErrorState(err.response.data.message);
    }
  }

  const handleLoginClick = (e) => {
    e.preventDefault();
    props.toggleOverlayLogin();
    props.toggleOverlayRegister();
  }

  return (
    <div>
      {showRegisterDropdown && (
        <div>
          <form
            onSubmit={createAccountHandler}
            className="relative z-50 p-8 bg-white rounded-lg shadow-lg w-full max-w-md border border-neutral-400"
            style={{
              background: 'linear-gradient(to bottom right, #f3f4f6, #ffffff)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Registrieren</h1>

            <div className="mb-4">
              <label htmlFor="vorname" className="sr-only">Vorname</label>
              <input
                type="text"
                id="vorname"
                name="vorname"
                placeholder="Vorname"
                className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-neutral-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={createRegisterFields.vorname}
                onChange={(e) =>
                  setCreateRegisterFields({
                    ...createRegisterFields,
                    vorname: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nachname" className="sr-only">Nachname</label>
              <input
                type="text"
                id="nachname"
                name="nachname"
                placeholder="Nachname"
                className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-neutral-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={createRegisterFields.nachname}
                onChange={(e) =>
                  setCreateRegisterFields({
                    ...createRegisterFields,
                    nachname: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-neutral-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={createRegisterFields.email}
                onChange={(e) =>
                  setCreateRegisterFields({
                    ...createRegisterFields,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="sr-only">Passwort</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Passwort"
                className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-neutral-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={createRegisterFields.password}
                onChange={(e) => {
                  setCreateRegisterFields({
                    ...createRegisterFields,
                    password: e.target.value,
                  });
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}/>
              </button>
            </div>

            <div className="mb-4 relative">
              <label htmlFor="passwordConfirmation" className="sr-only">Passwort wiederholen</label>
              <input
                type={showPassword2 ? "text" : "password"}
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Passwort wiederholen"
                className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-neutral-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1"
                onClick={togglePasswordVisibility2}>
                <FontAwesomeIcon icon={showPassword2 ? faEye : faEyeSlash}/>
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-700">Bereits ein Konto? </span>
              <a
                className="ml-2 text-purple-600 hover:underline cursor-pointer"
                onClick={handleLoginClick}
              >
                Anmelden
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg"
            >
              Registrieren
            </button>

            {errorState && <p className="text-red-500 text-center mt-4">{errorState}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default UserRegister;