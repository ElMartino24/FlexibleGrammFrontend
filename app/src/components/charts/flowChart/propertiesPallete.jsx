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
          const widthNum = parseFloat(value);
          if (!isNaN(widthNum)) { 
            model.setDataProperty(props.selectedNodeData, property, widthNum);
          }
        }else if(property === "borderWidth"){
          const widthNum = parseFloat(value);
          if (!isNaN(widthNum)) { 
            model.setDataProperty(props.selectedNodeData, property, widthNum);
          }
        }else if(property === "headHeight"){
          const widthNum = parseFloat(value);
          if (!isNaN(widthNum)) { 
            model.setDataProperty(props.selectedNodeData, property, widthNum);
          }
        }else if(property === "headWidth"){
          const widthNum = parseFloat(value);
          if (!isNaN(widthNum)) { 
            model.setDataProperty(props.selectedNodeData, property, widthNum);
          }
        }else if(property === "shaftHeight"){
          const widthNum = parseFloat(value);
          if (!isNaN(widthNum)) { 
            model.setDataProperty(props.selectedNodeData, property, widthNum);
          }
        }else if(property === "shaftWidth"){
          const widthNum = parseFloat(value);
          if (!isNaN(widthNum)) { 
            model.setDataProperty(props.selectedNodeData, property, widthNum);
          }
        }else if(property === "angle"){
          const widthNum = parseFloat(value);
          if (!isNaN(widthNum)) { 
            model.setDataProperty(props.selectedNodeData, property, widthNum);
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
      
    return (
        <div>
            <h3>Properties</h3>
            <label hidden={props.selectedNodeData.category == "Arrow"}>
              Text:
              <input
                type="text"
                value={props.selectedNodeData?.text || ""}
                onChange={(e) => handlePropertyChange("text", e.target.value)}
              />
            </label>
            <label>
              {props.selectedNodeData.category != "Arrow" ? "Color" : "Shaft Color"}
              <input
                type="color"
                value={props.selectedNodeData?.color || "#ffffff"}
                onChange={(e) => handlePropertyChange("color", e.target.value)}
              />
            </label>
            <label hidden={props.selectedNodeData.category != "Arrow"}>
              Head Color:
              <input
                type="color"
                value={props.selectedNodeData?.headColor || "#ffffff"}
                onChange={(e) => handlePropertyChange("headColor", e.target.value)}
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
            <label hidden={props.selectedNodeData.category == "Arrow" || props.selectedNodeData.category == "Text"}>
              Width:
              <input
                  type="number"
                  value={props.selectedNodeData.width } 
                  onChange={(e) => handlePropertyChange("width", e.target.value)}
              />
          </label>
          <label hidden={props.selectedNodeData.category == "Arrow"}>
            Height:
              <input
                  type="number"
                  value={props.selectedNodeData.height} 
                  onChange={(e) => handlePropertyChange("height", e.target.value)}
              />
          </label>
          <label hidden={props.selectedNodeData.category == "Text"}>
            Border Color:
            <input
              type="color"
              value={props.selectedNodeData.border} 
              onChange={(e) => handlePropertyChange("border", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category == "Text"}>
            Border:
            <input
              type="number"
              value={props.selectedNodeData.borderWidth} 
              onChange={(e) => handlePropertyChange("borderWidth", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category != "Arrow"}>
            head Height:
            <input
              type="number"
              value={props.selectedNodeData.headHeight} 
              onChange={(e) => handlePropertyChange("headHeight", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category != "Arrow"}>
            head Width:
            <input
              type="number"
              value={props.selectedNodeData.headWidth} 
              onChange={(e) => handlePropertyChange("headWidth", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category != "Arrow"}>
            shaft Height:
            <input
              type="number"
              value={props.selectedNodeData.shaftHeight} 
              onChange={(e) => handlePropertyChange("shaftHeight", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category != "Arrow"}>
            shaft Width:
            <input
              type="number"
              value={props.selectedNodeData.shaftWidth} 
              onChange={(e) => handlePropertyChange("shaftWidth", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category != "Arrow"}>
            angle:
            <input
              type="number"
              value={props.selectedNodeData.angle} 
              onChange={(e) => handlePropertyChange("angle", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category == "Arrow"}>
            Font Weight:
            <select
              onChange={(e) => handleFontStyleChange("fontWeight", e.target.value)}
              value={props.selectedNodeData?.font?.split(" ")[0]}>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </label>
          <label hidden={props.selectedNodeData.category == "Arrow"}>
            Font Size:
            <input
              type="number"
              value={parseInt(props.selectedNodeData?.font?.split(" ")[1]) || 14} 
              onChange={(e) => handleFontStyleChange("fontSize", e.target.value)}
            />
          </label>
          <label hidden={props.selectedNodeData.category == "Arrow"}>
            Font Style:
            <select
              value={props.selectedNodeData?.font?.split(" ")[2]}
              onChange={(e) => handleFontStyleChange("fontStyle", e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>
          <label hidden={props.selectedNodeData.category == "Arrow" || props.selectedNodeData.category == "Text"}>
              Font Color:
              <input
                type="color"
                value={props.selectedNodeData?.textColor || "#ffffff"}
                onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              />
            </label>
          </div>
    )
};

export default PropertiesPallete;