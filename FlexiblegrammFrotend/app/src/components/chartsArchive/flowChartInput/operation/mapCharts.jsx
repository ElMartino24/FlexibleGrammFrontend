import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../../../authContext";
import UpdateForm from "./updateForm";
import { ReactDiagram } from "gojs-react";

import InitChart from "../../../charts/flowChart/initChart";

import "../../../charts/sharedComponendStyle.css";


function MapCharts(props) {
  const diagramRef = useRef();
  const context = useContext(authContext);
  const navigate = useNavigate();

  const handleShowCharts = (chartData) => {
    navigate("/flowchart", { state: { chartData } });
  };

  return (
    <div>
      {props.allPosts.map((charts) => (
        <div
          key={charts._id}
          className="container rounded-md mx-auto md:px-2 w-[60%] md:w-[60%] mt-[3%] bg-customGrey"
        >
          <div>
            <div className="diagram-container">
              <ReactDiagram
                ref={diagramRef}
                initDiagram={InitChart}
                divClassName="diagram-component"
                nodeDataArray={charts.code}
              />
            </div>
            {context.authState && (
              <UpdateForm
                charts={charts}
                allPosts={props.allPosts}
                setAllPosts={props.setAllPosts}
              />
            )}
          </div>
          <button onClick={() => handleShowCharts(charts.code)}>Show Chart</button>
        </div>
      ))}
    </div>
  );
}

export default MapCharts;