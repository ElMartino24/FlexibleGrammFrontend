import React, { useState, useEffect } from "react";

export const authContext = React.createContext();

export default function AuthProvider(props) {
  const [authState, setAuthState] = useState(false);
  const [loggoutState, setLoggedState] = useState(true);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    const storedLoggedState = localStorage.getItem("loggoutState");

    if (storedAuthState !== null && storedAuthState !== "undefined") {
      setAuthState(JSON.parse(storedAuthState));
    } else {
      setAuthState(false);
    }

    if (storedLoggedState !== null) {
      setLoggedState(JSON.parse(storedLoggedState));
    } else {
      setLoggedState(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
    localStorage.setItem("loggoutState", JSON.stringify(loggoutState));
  }, [authState, loggoutState]);

  function setLogin(userId) {
    setAuthState(true);
    setLoggedState(false);
    localStorage.setItem("userId", JSON.stringify(userId));
    localStorage.setItem("authState", JSON.stringify(true));
    localStorage.setItem("loggoutState", JSON.stringify(false));
  }

  function logout() {
    setAuthState(false);
    setLoggedState(true);
    localStorage.removeItem("userId");
    localStorage.setItem("authState", JSON.stringify(false));
    localStorage.setItem("loggoutState", JSON.stringify(true));
  }

  return (
    <authContext.Provider value={{ authState, setLogin, logout, loggoutState }}>
      {props.children}
    </authContext.Provider>
  );
}