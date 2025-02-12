import React, {useContext}from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../pics/flexibleGrammLogo.webp";
import { authContext } from "../../../authContext";

function Navi(props) {
    const location = useLocation();
    const chartsArchivePath = location.pathname === "/chartsArchive";

    const {authState, logout} = useContext(authContext);
    const handleLogoutClick = () => {
        logout()
    }
   
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-sm border-b border-gray-300">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <img
                    src={Logo}
                    alt="FlexibleGramm Logo"
                    className="w-10 h-10 mr-[5%] p-0 sm:w-16 sm:h-16"/>
            </Link>
            <div className="flex space-x-0 divide-x divide-gray-400">
                <button
                    className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400 transition rounded-l"
                    onClick={props.toggleOverlay}>
                    Choose Chart
                </button>
                {!chartsArchivePath && (
                    <Link to="/chartsArchive"> 
                        <button className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400 transition">Charts archive</button> 
                    </Link>
                )}
                {chartsArchivePath && (
                    <Link to="/"> 
                        <button className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400 transition">Charts editing</button> 
                    </Link>
                )}
                {!authState ? 
                <button onClick={props.toggleOverlayLogin} className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition rounded-r">Login</button>
                    : 
                <button onClick={handleLogoutClick} className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition rounded-r">Logut</button>}
                
            </div>
        </nav>
    );
}

export default Navi;