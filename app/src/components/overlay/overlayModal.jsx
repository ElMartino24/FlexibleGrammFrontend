import React from "react";
import { Link } from "react-router-dom";
import BarChartPic from "../pics/BarChart.png";
import ColumnChartPic from "../pics/ColumnChart.png";
import FlowChartPic from "../pics/FlowChart.png";
import XIcon from "../pics/xIcon.png";

function Overlay(props) {
    if (!props.showOverlay) {
        return null;
    }

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            props.toggleOverlay();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackgroundClick}>
            <div className="p-4 bg-white shadow rounded relative w-[80%] h-[80%] overflow-auto">
                <div className="flex items-center justify-start mb-4">
                    
                    <h3 className="text-center flex-1">Choose Chart</h3>
                    <img src={XIcon} alt="X-Icon" className="w-[1rem] h-[1rem] cursor-pointer mr-2" onClick={props.toggleOverlay}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/barChart" className="no-underline" onClick={props.toggleOverlay}>
                        <div className="border p-4 text-center">
                            <p>Bar Chart:</p>
                            <div className="w-full h-60 bg-gray-300 flex justify-center items-center">
                                <img src={BarChartPic} alt="Bar Chart Picture" className="w-[100%] h-[100%] p-0"/>
                            </div>
                        </div>
                    </Link>
                    <Link to="/columnChart" className="no-underline" onClick={props.toggleOverlay}>
                        <div className="border p-4 text-center">
                            <p>Column Chart:</p>
                            <div className="w-full h-60 bg-gray-300 flex justify-center items-center">
                                <img src={ColumnChartPic} alt="Column Chart Picture" className="w-[100%] h-[100%] p-0"/>
                            </div>
                        </div>
                    </Link>
                    <Link to="/flowChart" className="no-underline" onClick={props.toggleOverlay}>
                        <div className="border p-4 text-center">
                            <p>Flow Chart:</p>
                            <div className="w-full h-60 flex justify-center items-center">
                                <img src={FlowChartPic} alt="Flow Chart Picture" className="w-[80%] h-[100%]"/>
                            </div>
                        </div>
                    </Link>
                    <Link to="/howToAnimation" className="no-underline" onClick={props.toggleOverlay}>
                        <div className="border p-4 text-center">
                            <p>How To Create a Chart and generate the Code</p>
                            <div className="w-full h-6o bg-gray-300 flex justify-center items-center">
                                YouTube
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Overlay;
