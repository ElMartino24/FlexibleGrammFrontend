import * as go from "gojs";
import React from "react";
import { ReactPalette } from "gojs-react";
import "../sharedComponendStyle.css";

function initPalette() {
    const initGraphObj = go.GraphObject.make;

    const palette = initGraphObj(go.Palette);

    palette.nodeTemplate = initGraphObj(
      go.Node,
      "Vertical",
      { locationSpot: go.Spot.Center },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      initGraphObj(
        go.Shape,
        new go.Binding("figure"), 
        new go.Binding("fill", "color"),
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
      ),
      initGraphObj(go.TextBlock, { margin: 8 }, new go.Binding("text")),
      new go.Binding("text", "text").makeTwoWay(),
      new go.Binding("stroke", "textColor").makeTwoWay(),
    );

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
            height: 40,
          }),
        ),new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      );

    palette.nodeTemplateMap.add("Text",
      initGraphObj(go.Node, "Vertical",
        { locationSpot: go.Spot.Center },
        initGraphObj(go.Shape, "rectangle", {
           width: 60, 
           height: 40, 
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

    palette.nodeTemplateMap.add("Arrow",
          initGraphObj(go.Node, "Spot",
            initGraphObj(go.Shape, "Rectangle", {
              name: "ARROW",
              fill: "black",
              stroke: "black",
              strokeWidth: 1,
              width: 2,
              height: 30,
              alignment: go.Spot.Center,
              cursor: "pointer", 
            },
            ),initGraphObj(go.Shape, "Triangle", {
              name: "ARROW",
              fill: "black",
              stroke: "black",
              strokeWidth: 1,
              width: 10,
              height: 10,
              alignment: go.Spot.TopCenter,
              alignmentFocus: go.Spot.Bottom, 
            },
            new go.Binding("width", "headWidth",).makeTwoWay(),
            new go.Binding("height", "headHeight",).makeTwoWay(),
            ),
          ),new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        );
   
    palette.model.nodeDataArray = [
      {category: "PlaceHolder" },
      {category: "Text", text: "Text", loc: "0 0"},
      {category: "Arrow", angle: 0, color: "black", shaftWidth: 2, shaftHeight: 50, border: "#1F2936" , borderWidth: 1, headWidth: 10, headHeight: 10, loc: "0 0"},
      {text: "Triangle", color: "#ADD8E6", border: "#1F2936", figure: "Triangle", height: 40,  width: 70, borderWidth: 1, font: "normal 14px Arial", textColor: "black", loc: "0 0"},
      {text: "Capsule", color: "#ADD8E6", border: "#1F2936", figure: "Capsule", width: 70, height: 40, borderWidth: 1, font: "normal 14px Arial", textColor: "black", loc: "0 0"},
      {text: "RoundedRectangle", color: "#ADD8E6", border: "#1F2936", figure: "RoundedRectangle", width: 60, height: 40,  borderWidth: 1, font: "normal 14px Arial", textColor: "black", loc: "0 0"},
      {text: "Rectangle", color: "#ADD8E6", border: "#1F2936", figure: "Rectangle", width: 70, height: 40, borderWidth: 1, font: "normal 14px Arial", textColor: "black", loc: "0 0"},
      {text: "Diamond", color: "#ADD8E6", border: "#1F2936", figure: "Diamond", width: 70, height: 40, borderWidth: 1, font: "normal 14px Arial", textColor: "black", loc: "0 0"},
      {text: "Ellipse", color: "#ADD8E6", border: "#1F2936", figure: "Ellipse", width: 70, height: 40, borderWidth: 1, font: "normal 14px Arial", textColor: "black", loc: "0 0"},
    ];
    
    return palette;
};

function Pallete(){
    return (
      <div className="flex">
          <div className="palette-container">
            <ReactPalette
              initPalette={initPalette}
              divClassName="palette-component"
            />
          </div>
      </div>
    )
};

export default Pallete;