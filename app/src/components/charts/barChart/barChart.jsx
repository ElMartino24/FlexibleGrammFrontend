import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReactDiagram } from "gojs-react";

import InitChart from "./initBarChart";
import Pallete from "./palleteBarChart";
import "../sharedComponendStyle.css";
import PropertiesPallete from "./propertiesPallete";
import GenerateHtmlAndCss from "./generateHtmlCss";
import GenerateReactJsx from "./generateReactJsx.Jsx";
import CodeEditor from "../../editor/codeEditor";
import ParseJsxToNodeData from "./parseJsxCode";
import ParseHTMLCssToData from "./parseHtmlCss";
import axios from "../../axios-instance";

function BarChart() {
  const diagramRef = useRef(null);

  //last Key 46
  const [nodeDataArray, setNodeDataArray] = useState([
    //main LineHorizontal
    {key: 32, category: "LineHorizontal", loc: "-200 0", color: "#1F2936", height: 2, width: 200, borderWidth: 2},
    {key: 33, category: "LineHorizontal", loc: "200 0", color: "#1F2936", height: 2, width: 200, borderWidth: 2},
    //small LineVertical Right
    {key: 12, category: "LineVertical", loc: "100 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 13, category: "LineVertical", loc: "150 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 14, category: "LineVertical", loc: "200 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 15, category: "LineVertical", loc: "250 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 16, category: "LineVertical", loc: "300 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    //small LineVertical Left
    {key: 17, category: "LineVertical", loc: "-100 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 18, category: "LineVertical", loc: "-150 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 19, category: "LineVertical", loc: "-200 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 20, category: "LineVertical", loc: "-250 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    {key: 21, category: "LineVertical", loc: "-300 0", color: "#1F2936", height: 10, width: 2, borderWidth: 2},
    //BarHorizontal Left
    {key: 34, category: "BarHorizontal", loc: "124 0", color: "#467BAD", height: 20, width: 50, border: "#1F2936", borderWidth: 1},
    {key: 35, category: "BarHorizontal", loc: "134 -30", color: "#467BAD", height: 20, width: 70, border: "#1F2936", borderWidth: 1},
    {key: 36, category: "BarHorizontal", loc: "139 -60", color: "#467BAD", height: 20, width: 80, border: "#1F2936", borderWidth: 1},
    {key: 37, category: "BarHorizontal", loc: "159 -90", color: "#467BAD", height: 20, width: 120, border: "#1F2936", borderWidth: 1},
    {key: 38, category: "BarHorizontal", loc: "174 -120", color: "#467BAD", height: 20, width: 150, border: "#1F2936", borderWidth: 1},
    {key: 39, category: "BarHorizontal", loc: "144 -150", color: "#467BAD", height: 20, width: 90, border: "#1F2936", borderWidth: 1},
    {key: 40, category: "BarHorizontal", loc: "139 -180", color: "#467BAD", height: 20, width: 80, border: "#1F2936", borderWidth: 1},
    {key: 41, category: "BarHorizontal", loc: "124 -210", color: "#467BAD", height: 20, width: 50, border: "#1F2936", borderWidth: 1},
    {key: 42, category: "BarHorizontal", loc: "114 -240", color: "#467BAD", height: 20, width: 30, border: "#1F2936", borderWidth: 1},
    {key: 43, category: "BarHorizontal", loc: "104 -270", color: "#467BAD", height: 20, width: 10, border: "#1F2936", borderWidth: 1},
    //BarHorizontal 
    {key: 44, category: "BarHorizontal", loc: "-124 0", color: "#467BAD", height: 20, width: 50, border: "#1F2936", borderWidth: 1},
    {key: 45, category: "BarHorizontal", loc: "-134 -30", color: "#467BAD", height: 20, width: 70, border: "#1F2936", borderWidth: 1},
    {key: 46, category: "BarHorizontal", loc: "-139 -60", color: "#467BAD", height: 20, width: 80, border: "#1F2936", borderWidth: 1},
    {key: 47, category: "BarHorizontal", loc: "-159 -90", color: "#467BAD", height: 20, width: 120, border: "#1F2936", borderWidth: 1},
    {key: 48, category: "BarHorizontal", loc: "-174 -120", color: "#467BAD", height: 20, width: 150, border: "#1F2936", borderWidth: 1},
    {key: 49, category: "BarHorizontal", loc: "-144 -150", color: "#467BAD", height: 20, width: 90, border: "#1F2936", borderWidth: 1},
    {key: 50, category: "BarHorizontal", loc: "-139 -180", color: "#467BAD", height: 20, width: 80, border: "#1F2936", borderWidth: 1},
    {key: 51, category: "BarHorizontal", loc: "-124 -210", color: "#467BAD", height: 20, width: 50, border: "#1F2936", borderWidth: 1},
    {key: 52, category: "BarHorizontal", loc: "-114 -240", color: "#467BAD", height: 20, width: 30, border: "#1F2936", borderWidth: 1},
    {key: 53, category: "BarHorizontal", loc: "-104 -270", color: "#467BAD", height: 20, width: 10, border: "#1F2936", borderWidth: 1},
    //left side Text
    {key: 0, category: "Text",loc: "-200 -300", text: "Group 1", color: "#1F2936", font: "Bold 14px Arial"},
    //right side Text
    {key: 1, category: "Text",loc: "200 -300", text: "Group 2", color: "#1F2936", font: "Bold 14px Arial" },
    //line numbers
    {key: 2, category: "Text",loc: "97 10", text: "0", color: "#1F2936", font: "normal 14px Arial" },
    {key: 3, category: "Text",loc: "142 10", text: "10", color: "#1F2936", font: "normal 14px Arial" },
    {key: 4, category: "Text",loc: "192 10", text: "20", color: "#1F2936", font: "normal 14px Arial" },
    {key: 5, category: "Text",loc: "242 10", text: "30", color: "#1F2936", font: "normal 14px Arial" },
    {key: 6, category: "Text",loc: "292 10", text: "40", color: "#1F2936", font: "normal 14px Arial" },
    {key: 7, category: "Text",loc: "-103 10", text: "0", color: "#1F2936", font: "normal 14px Arial" },
    {key: 8, category: "Text",loc: "-158 10", text: "10", color: "#1F2936", font: "normal 14px Arial" },
    {key: 9, category: "Text",loc: "-208 10", text: "20", color: "#1F2936", font: "normal 14px Arial" },
    {key: 10, category: "Text",loc: "-258 10", text: "30", color: "#1F2936", font: "normal 14px Arial" },
    {key: 11, category: "Text",loc: "-308 10", text: "40", color: "#1F2936", font: "normal 14px Arial" },
    //mid Text
    {key: 22, category: "Text",loc: "-15 -20", text: "0-10", color: "#1F2936", font: "normal 14px Arial" },
    {key: 23, category: "Text",loc: "-20 -50", text: "10-20", color: "#1F2936", font: "normal 14px Arial" },
    {key: 24, category: "Text",loc: "-20 -80", text: "20-30", color: "#1F2936", font: "normal 14px Arial" },
    {key: 25, category: "Text",loc: "-20 -110", text: "30-40", color: "#1F2936", font: "normal 14px Arial" },
    {key: 26, category: "Text",loc: "-20 -140", text: "40-50", color: "#1F2936", font: "normal 14px Arial" },
    {key: 27, category: "Text",loc: "-20 -170", text: "50-60", color: "#1F2936", font: "normal 14px Arial" },
    {key: 28, category: "Text",loc: "-20 -200", text: "60-70", color: "#1F2936", font: "normal 14px Arial" },
    {key: 29, category: "Text",loc: "-20 -230", text: "70-80", color: "#1F2936", font: "normal 14px Arial" },
    {key: 30, category: "Text",loc: "-20 -260", text: "80-90", color: "#1F2936", font: "normal 14px Arial" },
    {key: 31, category: "Text",loc: "-24 -290", text: "90-100", color: "#1F2936", font: "normal 14px Arial" },
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
      diagram.model = go.Model.fromJson({ nodeDataArray: updatedNodeDataArray });
 
      await axios.post(
        "/barCharts/createBarCharts", { code: updatedNodeDataArray }
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

export default BarChart;