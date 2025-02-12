import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReactDiagram } from "gojs-react";

import "../sharedComponendStyle.css";

import Pallete from "./pallete";
import InitChart from "./initChart";
import PropertiesPallete from "./propertiesPallete";
import GenerateHtmlAndCss from "./generateHtmlCss";
import GenerateReactJsx from "./generateReactJsx";
import CodeEditor from "../../editor/codeEditor";
import ParseJsxToNodeData from "./parseJsxCode";
import ParseHTMLCssToData from "./parseHtmlCss";
import axios from "../../axios-instance";

function Flowchart() {
  const diagramRef = useRef();
  
  const [nodeDataArray, setNodeDataArray] = useState([
    {key: 0, text: "Start", color: "#ADD8E6", figure: "Capsule", loc: "-150 -300", width: 70, height: 50, border: "#1F2936", borderWidth: 1, font: "bold 14px Arial", textColor: "red"},
    {key: 1, text: "Process", color: "#ADD8E6", figure: "Rectangle", loc: "150 -300", width: 70, height: 50, border: "#1F2936", borderWidth: 1, font: "normal 14px Arial", textColor: "red"},
    {key: 2, text: "Yes or No!", color: "#ADD8E6", figure: "Triangle", loc: "110 -200", width: 200, height: 80, border: "#1F2936", borderWidth: 1, font: "normal 14px Arial", textColor: "black"},
    {key: 3, text: "Process", color: "#ADD8E6", figure: "Rectangle", loc: "0 -200", width: 70, height: 50, border: "#1F2936", borderWidth: 1, font: "normal 14px Arial", textColor: "black"},
    {key: 4, text: "Process", color: "#ADD8E6", figure: "Rectangle", loc: "150 -75", width: 70, height: 50, border: "#1F2936", borderWidth: 1, font: "normal 14px Arial", textColor: "black"},
    {key: 5, text: "End", color: "#ADD8E6", figure: "Capsule", loc: "-150 -75", width: 70, height: 50, border: "#1F2936", borderWidth: 1, font: "bold 14px Arial", textColor: "black"},
    // Arrow
    {key: 6, category: "Arrow", loc: "36 -275", angle: 90, color: "#1F2936", shaftWidth: 1, shaftHeight: 218, border: "#1F2936" , borderWidth: 1, headWidth: 10, headHeight: 10, headColor: "#1F2936"},
    {key: 7, category: "Arrow", loc: "200 -220", angle: 180, color: "#1F2936", shaftWidth: 1, shaftHeight: 43, border: "#1F2936" , borderWidth: 1, headWidth: 10, headHeight: 10, headColor: "#1F2936"},
    {key: 8, category: "Arrow", loc: "122 -175", angle: 270, color: "#1F2936", shaftWidth: 1, shaftHeight: 95, border: "#1F2936" , borderWidth: 1, headWidth: 10, headHeight: 10, headColor: "#1F2936"},
    {key: 9, category: "Arrow", loc: "185 -97", angle: 180, color: "#1F2936", shaftWidth: 1, shaftHeight: 33, border: "#1F2936" , borderWidth: 1, headWidth: 10, headHeight: 10, headColor: "#1F2936"},
    {key: 10, category: "Arrow", loc: "-53 -113", angle: 235, color: "#1F2936", shaftWidth: 1, shaftHeight: 121, border: "#1F2936" , borderWidth: 1, headWidth: 10, headHeight: 10, headColor: "#1F2936"},
    {key: 11, category: "Arrow", loc: "36 -50", angle: 270, color: "#1F2936", shaftWidth: 1, shaftHeight: 218, border: "#1F2936" , borderWidth: 1, headWidth: 10, headHeight: 10, headColor: "#1F2936"},
    // manuel Text
    {key: 12, category: "Text",loc: "-3 -300", text: "Process", color: "black", font: "normal 14px Arial" },
  ]);

  const [selectedNodeData, setSelectedNodeData] = useState("");

  const handleNodeSelection = (e) => {
    const diagram = e.diagram;
    const selectedNode = diagram.selection.first();

    if (selectedNode && selectedNode instanceof go.Node) {
      setSelectedNodeData(selectedNode.data);
    } else {
      setSelectedNodeData(null);
    }
  };

  const [generatedCode, setGeneratedCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

   const updateGeneratedCode = () => {

    const diagram = diagramRef.current.getDiagram();
    
    const json = diagram.model.toJson();
    const code = selectedLanguage == "javascript" ? GenerateReactJsx(json, "flowChart") : GenerateHtmlAndCss(json, "flowChart");
    setGeneratedCode(code);
  };

  const handleCodeEditorChange = async () => {
    
    try {

      let updatedNodeDataArray;
      if(selectedLanguage == "javascript"){
        updatedNodeDataArray = ParseJsxToNodeData(generatedCode);
      }else if(selectedLanguage == "html"){
        updatedNodeDataArray = ParseHTMLCssToData(generatedCode);
      }
      
      setNodeDataArray(updatedNodeDataArray);

      const diagram = diagramRef.current.getDiagram();
      diagram.model = go.Model.fromJson({ nodeDataArray: updatedNodeDataArray });
 
      await axios.post(
        "/flowCharts/createFlowCharts", { code: updatedNodeDataArray }
      );
        
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Diagramms:", error);
    }
  };

  
  const location = useLocation();
  useEffect(() => {
    const diagram = diagramRef.current?.getDiagram();
    
    if (diagram) {
      const listener = handleNodeSelection;
  
      diagram.addDiagramListener("ChangedSelection", listener);
      diagram.addModelChangedListener(() => {
        updateGeneratedCode();
      });
      
      if (location.state?.chartData) {
        setNodeDataArray(location.state.chartData);
      }
      updateGeneratedCode();
  
      return () => {
        diagram.removeDiagramListener("ChangedSelection", listener);
        diagram.removeModelChangedListener(updateGeneratedCode);
      };
    }
  }, [selectedLanguage]);

  return (
    <main>
    <div className="flex">
      <Pallete/>
      <div className="diagram-container" >
        <ReactDiagram
          ref={diagramRef}
          initDiagram={InitChart}
          divClassName="diagram-component"
          nodeDataArray={nodeDataArray}
        />
      </div>
      <div className="property-panel">
        {selectedNodeData ? (
          <PropertiesPallete
            nodeDataArray={nodeDataArray}
            setNodeDataArray={setNodeDataArray}
            diagramRef={diagramRef}
            selectedNodeData={selectedNodeData}
            setSelectedNodeData={setSelectedNodeData}
          />
        ) : (
          <p>Select Node</p>
        )}
      </div>
    </div>
      <CodeEditor code={generatedCode} 
        setCode={setGeneratedCode} 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage} 
        handleCodeEditorChange={handleCodeEditorChange}/>
    </main>
  );
}

export default Flowchart;