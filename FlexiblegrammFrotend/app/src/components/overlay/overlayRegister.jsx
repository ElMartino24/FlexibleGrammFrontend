import React from "react";
import Register from "../auth/register";

function Overlay(props) {
    if (!props.isUserRegisterVisible){
        return null;
    };
    
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            props.toggleOverlayRegister();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackgroundClick}>
              <Register toggleOverlayRegister={props.toggleOverlayRegister} toggleOverlayLogin={props.toggleOverlayLogin}/>
        </div>
    );
};

export default Overlay;