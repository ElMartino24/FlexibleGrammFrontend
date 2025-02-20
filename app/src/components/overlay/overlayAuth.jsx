import React from "react";
import Login from "../auth/login";

function Overlay(props) {
  if (!props.isLoginVisible) {
    return null;
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      props.toggleOverlayLogin();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <Login
        toggleOverlayRegister={props.toggleOverlayRegister}
        toggleOverlayLogin={props.toggleOverlayLogin}
      />
    </div>
  );
}

export default Overlay;
