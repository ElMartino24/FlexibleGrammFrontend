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
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="p-4 bg-white shadow rounded-lg relative w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] h-[80%] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-center flex-1">
            Choose Chart
          </h3>
          <img
            src={XIcon}
            alt="xIcon"
            className="w-5 h-5 cursor-pointer"
            onClick={props.toggleOverlay}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/barChart"
            className="no-underline"
            onClick={props.toggleOverlay}
          >
            <div className="border p-4 text-center">
              <p>Bar Chart:</p>
              <div className="w-full h-60 flex justify-center items-center">
                <img
                  src={BarChartPic}
                  alt="Bar Chart Picture"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>
          <Link
            to="/columnChart"
            className="no-underline"
            onClick={props.toggleOverlay}
          >
            <div className="border p-4 text-center">
              <p>Column Chart:</p>
              <div className="w-full h-60 flex justify-center items-center">
                <img
                  src={ColumnChartPic}
                  alt="Column Chart Picture"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>
          <Link
            to="/flowChart"
            className="no-underline"
            onClick={props.toggleOverlay}
          >
            <div className="border p-4 text-center">
              <p>Flow Chart:</p>
              <div className="w-full h-60 flex justify-center items-center">
                <img
                  src={FlowChartPic}
                  alt="Flow Chart Picture"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>
          <Link
            to="https://youtu.be/YxyRbKOXlGw"
            className="no-underline"
            onClick={props.toggleOverlay}
          >
            <div className="border p-4 text-center">
              <p>How To Create a Chart and generate the Code</p>
              <div className="w-full bg-gray-300 flex justify-center items-center">
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
