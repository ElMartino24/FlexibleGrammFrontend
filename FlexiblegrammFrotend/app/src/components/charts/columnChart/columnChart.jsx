import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReactDiagram } from "gojs-react";

import InitChart from "./initColumChart";
import Pallete from "./palleteColumnChart";
import "../sharedComponendStyle.css";
import PropertiesPallete from "./propertiesPallete";
import GenerateHtmlAndCss from "./generateHtmlCss";
import GenerateSvelteCode from "./generateSvelte";
import GenerateReactJsx from "./generateReactJsx";
import CodeEditor from "../../editor/codeEditor";
import ParseJsxToNodeData from "./parseJsxCode";
import ParseHTMLCssToData from "./parseHtmlCss";
import axios from "../../axios-instance";

function ColumnChart() {
  const diagramRef = useRef(null);

  //last Key 50
  const [nodeDataArray, setNodeDataArray] = useState([
    //main LineHorizontal
    { key: 11, category: "LineHorizontal", loc: "0 0", color: "#1F2936", height: 2, width: 470, borderWidth: 2 },
    //normal LineHorizontal
    { key: 24, category: "LineHorizontal", loc: "0 -25", color: "#8D8D8D", height: 2, width: 470, borderWidth: 2 },
    { key: 25, category: "LineHorizontal", loc: "0 -50", color: "#8D8D8D", height: 2, width: 470, borderWidth: 2 },
    { key: 26, category: "LineHorizontal", loc: "0 -75", color: "#8D8D8D", height: 2, width: 470, borderWidth: 2 },
    { key: 27, category: "LineHorizontal", loc: "0 -100", color: "#8D8D8D", height: 2, width: 470, borderWidth: 2 },
    //main LineVertical
    { key: 12, category: "LineVertical", loc: "-220 -70", color: "#1F2936", height: 140, width: 2, borderWidth: 2 },
    //normal LineVertical
    { key: 13, category: "LineVertical", loc: "-195 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 14, category: "LineVertical", loc: "-160 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 15, category: "LineVertical", loc: "-125 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 16, category: "LineVertical", loc: "-90 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 17, category: "LineVertical", loc: "-55 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 18, category: "LineVertical", loc: "-20 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 19, category: "LineVertical", loc: "15 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 20, category: "LineVertical", loc: "50 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 21, category: "LineVertical", loc: "85 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 22, category: "LineVertical", loc: "120 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 23, category: "LineVertical", loc: "155 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    { key: 46, category: "LineVertical", loc: "190 0", color: "#1F2936", height: 20, width: 2, borderWidth: 2 },
    //BarVertical
    { key: 0, category: "BarVertical", loc: "-195 0", color: "#ADD8E6", height: 50, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 1, category: "BarVertical", loc: "-160 0", color: "#ADD8E6", height: 120, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 2, category: "BarVertical", loc: "-125 0", color: "#ADD8E6", height: 80, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 3, category: "BarVertical", loc: "-90 0", color: "#ADD8E6", height: 50, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 4, category: "BarVertical", loc: "-55 0", color: "#ADD8E6", height: 15, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 5, category: "BarVertical", loc: "-20 0", color: "#ADD8E6", height: 80, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 6, category: "BarVertical", loc: "15 0", color: "#ADD8E6", height: 50, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 7, category: "BarVertical", loc: "50 0", color: "#ADD8E6", height: 15, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 8, category: "BarVertical", loc: "85 0", color: "#ADD8E6", height: 80, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 9, category: "BarVertical", loc: "120 0", color: "#ADD8E6", height: 50, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 10, category: "BarVertical", loc: "155 0", color: "#ADD8E6", height: 120, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 45, category: "BarVertical", loc: "190 0", color: "#ADD8E6", height: 120, width: 20, border: "#1F2936", borderWidth: 1 },
    //yAchsis Text 
    { key: 28, category: "Text", loc: "-205 10", text: "Jan", color: "#1F2936", font: "normal 14px Arial" },
    { key: 29, category: "Text", loc: "-170 10", text: "Feb", color: "#1F2936", font: "normal 14px Arial" },
    { key: 30, category: "Text", loc: "-135 10", text: "Mar", color: "#1F2936", font: "normal 14px Arial" },
    { key: 31, category: "Text", loc: "-100 10", text: "Apr", color: "#1F2936", font: "normal 14px Arial" },
    { key: 32, category: "Text", loc: "-65 10", text: "Mai", color: "#1F2936", font: "normal 14px Arial" },
    { key: 33, category: "Text", loc: "-30 10", text: "Jun", color: "#1F2936", font: "normal 14px Arial" },
    { key: 34, category: "Text", loc: "5 10", text: "Jul", color: "#1F2936", font: "normal 14px Arial" },
    { key: 35, category: "Text", loc: "40 10", text: "Aug", color: "#1F2936", font: "normal 14px Arial" },
    { key: 36, category: "Text", loc: "75 10", text: "Sep", color: "#1F2936", font: "normal 14px Arial" },
    { key: 37, category: "Text", loc: "110 10", text: "Oct", color: "#1F2936", font: "normal 14px Arial" },
    { key: 38, category: "Text", loc: "145 10", text: "Nov", color: "#1F2936", font: "normal 14px Arial" },
    { key: 44, category: "Text", loc: "180 10", text: "Dez", color: "#1F2936", font: "normal 14px Arial" },
    //xAchsis Text
    { key: 39, category: "Text", loc: "-250 -7", text: "0", color: "#1F2936", font: "normal 14px Arial" },
    { key: 40, category: "Text", loc: "-270 -32", text: "2000", color: "#1F2936", font: "normal 14px Arial" },
    { key: 41, category: "Text", loc: "-270 -57", text: "4000", color: "#1F2936", font: "normal 14px Arial" },
    { key: 42, category: "Text", loc: "-270 -82", text: "6000", color: "#1F2936", font: "normal 14px Arial" },
    { key: 43, category: "Text", loc: "-270 -107", text: "8000", color: "#1F2936", font: "normal 14px Arial" },
    //Legend
    { key: 47, category: "BarVertical", loc: "-250 80", color: "#ADD8E6", height: 20, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 48, category: "Text", loc: "-225 65", text: "Legend", color: "#1F2936", font: "normal 14px Arial" },
    { key: 49, category: "BarVertical", loc: "-150 80", color: "#ADD8E6", height: 20, width: 20, border: "#1F2936", borderWidth: 1 },
    { key: 50, category: "Text", loc: "-125 65", text: "Legend", color: "#1F2936", font: "normal 14px Arial" },
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
    const code = selectedLanguage == "javascript" ? GenerateReactJsx(json, "columnChart") : GenerateHtmlAndCss(json, "columnChart");
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
      console.log(diagram)
      diagram.model = go.Model.fromJson({ nodeDataArray: updatedNodeDataArray });

      await axios.post(
        "/columnCharts/createColumnCharts", { code: updatedNodeDataArray }
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
    <div>
      <div className="flex">
        <Pallete />
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
              selectedNodeData={selectedNodeData}
              setSelectedNodeData={setSelectedNodeData}
              diagramRef={diagramRef}
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
    </div>
  )
}

export default ColumnChart;