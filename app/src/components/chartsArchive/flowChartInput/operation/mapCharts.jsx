import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../../../authContext";
import DeleteChart from "./deleteChart";
import { ReactDiagram } from "gojs-react";
import InitChart from "../../../charts/flowChart/initChart";
import "../../../charts/sharedComponendStyle.css";


function MapCharts(props) {
  const diagramRef = useRef();
  const context = useContext(authContext);
  const navigate = useNavigate();

  const handleShowCharts = () => {
    navigate("/flowchart");
  };

  return (
    <div>
      {props.allPosts.map((charts) => (
        <div
          key={charts._id}
          className="container rounded-md mx-auto md:px-2 w-[60%] md:w-[60%] mt-[3%] bg-customGrey">
            <div className="diagram-container">
              <ReactDiagram
                ref={diagramRef}
                initDiagram={InitChart}
                divClassName="diagram-component"
                nodeDataArray={charts.code}/>
            </div>
          <div className="flex justify-end mt-4">
          {context.authState && (
              <DeleteChart
                charts={charts}
                allPosts={props.allPosts}
                setAllPosts={props.setAllPosts}
              />
            )}
            <button
              className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 transition h-10 rounded"
              onClick={() => handleShowCharts(charts.code)}>
              Show Chart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MapCharts;