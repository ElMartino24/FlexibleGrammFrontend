import * as go from "gojs";
import React from "react";
import { ReactPalette } from "gojs-react";
import "../sharedComponendStyle.css";

function initPalette() {
  const initGraphObj = go.GraphObject.make;

  const palette = initGraphObj(go.Palette);

  palette.nodeTemplateMap.add("PlaceHolder",
    initGraphObj(go.Node, "Vertical",
      { locationSpot: go.Spot.Center,
        pickable: false,
        movable: false
       },
      initGraphObj(go.Shape, {
        figure: "Rectangle",
        fill: "white",
        stroke: "white",
        width: 20,
        height: 50,
      }),
    )
  );

  palette.nodeTemplateMap.add("BarVertical",
    initGraphObj(go.Node, "Vertical",
      { locationSpot: go.Spot.Center },
      initGraphObj(go.Shape, {
        figure: "Rectangle",
        fill: "#ADD8E6",
        strokeWidth: 1,
        width: 20,
        height: 40,
        margin: 2,
      }),
      initGraphObj(go.TextBlock, { margin: 4 }, new go.Binding("text", "text"))
    ),
  ),new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify);

  palette.nodeTemplateMap.add("BarHorizontal",
    initGraphObj(go.Node, "Vertical",
      { locationSpot: go.Spot.Center },
      initGraphObj(go.Shape, {
        figure: "Rectangle",
        fill: "#ADD8E6",
        strokeWidth: 1,
        width: 40,
        height: 20, 
        margin: 2,
      }),
      initGraphObj(go.TextBlock, { margin: 4 }, new go.Binding("text", "text").makeTwoWay(),)
    ),new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  );

  palette.nodeTemplateMap.add("Text",
    initGraphObj(go.Node, "Vertical",
      { locationSpot: go.Spot.Center },
      initGraphObj(go.Shape, "rectangle", {
         width: 40, 
         height: 20, 
         fill: "#F2F2F2",
         strokeWidth: 1,
         margin: 2,
        }),
      initGraphObj(go.TextBlock, { 
        textAlign: "center",
        margin: 4,
      }, new go.Binding("text", "text")),
    ),new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  );

  palette.nodeTemplateMap.add("LineHorizontal",
    initGraphObj(go.Node, "Horizontal",  
      { locationSpot: go.Spot.Center },
      initGraphObj(go.Shape, "LineH", {
        stroke: "black",
        strokeWidth: 2,
        width: 50,  
        height: 2,  
        margin: 4,
      }),
      initGraphObj(go.TextBlock, { 
        text: "Line", 
        margin: 4 
      })  
    ),new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  );

  palette.nodeTemplateMap.add("LineVertical",
    initGraphObj(go.Node, "Vertical",  
      { locationSpot: go.Spot.Center },
      initGraphObj(go.Shape, "LineV", {
        stroke: "black",
        strokeWidth: 2,
        width: 2,  
        height: 50,  
        margin: 4,
      }),
      initGraphObj(go.TextBlock, { 
        text: "Line", 
        margin: 4 
      })  
    ),new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  );

  palette.model.nodeDataArray = [
    {category: "PlaceHolder"},
    {category: "BarVertical", text: "Bar", color: "#ADD8E6", height: 50, width: 20, border: "#1F2936", borderWidth: 1, loc: "0 0"},
    {category: "BarHorizontal", text: "Bar", color: "#ADD8E6", height: 20, width: 50, border: "#1F2936", borderWidth: 1, loc: "0 0"},
    {category: "Text", text: "Text", loc: "0 0"},
    {category: "LineHorizontal", width: 50, height: 2, color: "black",  borderWidth: 2, loc: "0 0"},
    {category: "LineVertical", color: "black", height: 50, width: 2, borderWidth: 2, loc: "0 0" },
  ];

  return palette;
}

function Pallete() {
  return (
    <div className="flex">
        <div className="palette-container">
          <ReactPalette
            initPalette={initPalette}
            divClassName="palette-component"
          />
        </div>
    </div>
  );
};

export default Pallete;