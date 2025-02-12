import React from "react";

function PropertiesPallete(props){
  
    const handlePropertyChange = (property, value) => {
      const diagram = props.diagramRef.current.getDiagram();
      const model = diagram.model;
   
      if (!props.selectedNodeData) return;
      
      model.startTransaction();
    
      if (property === "loc") {
        const [x, y] = value.split(" ").map(parseFloat);
        if (!isNaN(x) && !isNaN(y)) {
          model.setDataProperty(props.selectedNodeData, property, `${x} ${y}`);
        }
      }else if(property === "width"){
        const widthNum = parseFloat(value);
        if (!isNaN(widthNum)) { 
          model.setDataProperty(props.selectedNodeData, property, widthNum);
        }
      }else if(property === "height"){
        const heighthNum = parseFloat(value);
        if (!isNaN(heighthNum)) { 
          model.setDataProperty(props.selectedNodeData, property, heighthNum);
        }
      }else if(property === "borderWidth"){
        const borderWidthNum = parseFloat(value);
        if (!isNaN(borderWidthNum)) { 
          model.setDataProperty(props.selectedNodeData, property, borderWidthNum);
        }
      }
      else {
        model.setDataProperty(props.selectedNodeData, property, value);
      }
  
      model.commitTransaction("Update " + property);
      props.setNodeDataArray([...model.nodeDataArray]); 
      props.setSelectedNodeData(model.findNodeDataForKey(props.selectedNodeData.key));
    };
    
    const handleFontStyleChange = (property, value) => {
      if (!props.selectedNodeData) return;
    
      const fontParts = props.selectedNodeData.font.split(" ");
      let updatedFontWeight = fontParts[0];
      let updatedFontSize = fontParts[1];
      let updatedFontStyle = fontParts[2]; 
    
      if (property === "fontWeight") {
        updatedFontWeight = value;
      } else if (property === "fontSize") {
        updatedFontSize = `${value}px`;
      } else if (property === "fontStyle") {
        updatedFontStyle = value;
      }
    
      const newFont = `${updatedFontWeight} ${updatedFontSize} ${updatedFontStyle}`;
      handlePropertyChange("font", newFont);
    };

    return(
        <div>
            <h3>Properties</h3>
            <label hidden={ props.selectedNodeData.category == "BarVertical" || props.selectedNodeData.category == "BarHorizontal" || props.selectedNodeData.category == "LineHorizontal" || props.selectedNodeData.category == "LineVertical" }>
              Text:
              <input
                type="text"
                value={props.selectedNodeData?.text || ""}
                onChange={(e) => handlePropertyChange("text", e.target.value)}
              />
            </label>
            <label>
              Color:
              <input
                type="color"
                value={props.selectedNodeData?.color || "#ffffff"}
                onChange={(e) => handlePropertyChange("color", e.target.value)}
              />
            </label>
            <label>
              Y-Position:
              <input
                type="number"
                value={parseFloat(props.selectedNodeData?.loc.split(" ")[1])}
                onChange={(e) =>
                  handlePropertyChange(
                    "loc",
                    `${props.selectedNodeData?.loc.split(" ")[0]} ${e.target.value}`
                  )
                }
              />
            </label>
            <label>
              X-Position:
              <input
                type="number"
                value={parseFloat(props.selectedNodeData?.loc.split(" ")[0])}
                onChange={(e) =>
                  handlePropertyChange(
                    "loc",
                    `${e.target.value} ${props.selectedNodeData?.loc.split(" ")[1]}`
                  )
                }
              />
            </label>
            <label hidden={props.selectedNodeData?.category != "LineVertical"}>
              Height:
              <input
                  type="number"
                  value={props.selectedNodeData?.height} 
                  onChange={(e) => handlePropertyChange("height", e.target.value)}
              />
          </label>
            <label hidden={props.selectedNodeData.category == "Text" || props.selectedNodeData?.category == "LineVertical"}>
              Width:
              <input
                  type="number"
                  value={props.selectedNodeData?.width} 
                  onChange={(e) => handlePropertyChange("width", e.target.value)}
              />
          </label>
          <label hidden={props.selectedNodeData?.category == "LineHorizontal"  || props.selectedNodeData?.category == "LineVertical" || props.selectedNodeData.category == "Text"}>
            Height:
              <input
                  type="number"
                  value={props.selectedNodeData?.height} 
                  onChange={(e) => handlePropertyChange("height", e.target.value)}
              />
          </label>
          <label hidden={props.selectedNodeData?.category == "LineHorizontal"  || props.selectedNodeData?.category == "LineVertical" || props.selectedNodeData.category == "Text"}>
            Border Color:
            <input
              type="color"
              value={props.selectedNodeData?.border} 
              onChange={(e) => handlePropertyChange("border", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category == "Text"}>
            {props.selectedNodeData?.category == "LineHorizontal" ? "Height:" : props.selectedNodeData?.category == "LineVertical" ? "Width:" : "Border width:"}
            <input
              type="number"
              value={props.selectedNodeData?.borderWidth} 
              onChange={(e) => handlePropertyChange("borderWidth", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category !== "Text"}>
            Font Weight:
            <select
              onChange={(e) => handleFontStyleChange("fontWeight", e.target.value)}
              value={props.selectedNodeData?.font?.split(" ")[0]}>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </label>
          <label hidden={props.selectedNodeData.category !== "Text"}>
            Font Size:
            <input
              type="number"
              value={parseInt(props.selectedNodeData?.font?.split(" ")[1]) || 14} 
              onChange={(e) => handleFontStyleChange("fontSize", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category !== "Text"}>
            Font Style:
            <select
              onChange={(e) => handleFontStyleChange("fontStyle", e.target.value)}
              value={props.selectedNodeData?.font?.split(" ")[2]}>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>
          </div>
    )
};

export default PropertiesPallete;