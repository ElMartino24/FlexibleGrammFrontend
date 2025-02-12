import * as go from "gojs";

function InitChart() {
    const initGraphObj = go.GraphObject.make;

    const diagram = initGraphObj(go.Diagram, {
      "undoManager.isEnabled": true,
      "linkingTool.isEnabled": true,
      "relinkingTool.isEnabled": true,
      allowDrop: true,
    });

    let copiedNodeData = null;
        const nodeMenu = initGraphObj(
          "ContextMenu",
          initGraphObj(
            "ContextMenuButton",
            initGraphObj(go.TextBlock, "Delete",{
              margin: 8,
            }),
            {
              click: (_e, obj) => {
                const part = obj.part.adornedPart;
                if (part !== null) diagram.remove(part);
              },
            }
          ),
          initGraphObj(
            "ContextMenuButton",
            initGraphObj(go.TextBlock, "Copy" ,{
              margin: 8,
            }),
            {
              click: (_e, obj) => {
                const part = obj.part.adornedPart;
                if (part !== null) {
                  copiedNodeData = diagram.model.copyNodeData(part.data); 
                }
              },
            }
          )
        );
    
        const contexMenu = initGraphObj(
          "ContextMenu",
          initGraphObj(
            "ContextMenuButton",
            initGraphObj(go.TextBlock, "Paste", {
              margin: 8,
            }),
            {
              click: () => {
                if (copiedNodeData) {
                  const point = diagram.lastInput.documentPoint;
                  const newData = diagram.model.copyNodeData(copiedNodeData);
                  newData.loc = go.Point.stringify(point);
                  diagram.model.addNodeData(newData); 
                }
              },
            }
          ),
          initGraphObj(
            "ContextMenuButton",
            initGraphObj(go.TextBlock, "Undo", {
              margin: 8,
            }),
            {
              click: (e, obj) => {
                e.diagram.commandHandler.undo(),
                obj.diagram.commandHandler.canUndo()
              },
            }
          ),initGraphObj(
            "ContextMenuButton",
            initGraphObj(go.TextBlock, "Redo", {
              margin: 8,
            }),
            {
              click: (e) => {
                e.diagram.commandHandler.redo()
              },
            }
          )
        );

    diagram.nodeTemplateMap.add("BarVertical",
      initGraphObj(go.Node, "Spot",
        { contextMenu: nodeMenu },
        { locationSpot: go.Spot.Bottom, resizable: true, resizeObjectName: "BAR" },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        initGraphObj(go.Panel, "Vertical",
          initGraphObj(go.Shape, "Rectangle", {
            name: "BAR",
            fill: "#ADD8E6",
            stroke: "black",
            width: 20,
            height: 60,
            cursor: "pointer",
            strokeWidth: 1,
          },new go.Binding("height", "height").makeTwoWay(),
            new go.Binding("width", "width").makeTwoWay(),
            new go.Binding("fill", "color").makeTwoWay(),
            new go.Binding("stroke", "border").makeTwoWay(),
            new go.Binding("strokeWidth", "borderWidth").makeTwoWay(),
          ),
        )
      )
    );

    diagram.nodeTemplateMap.add("BarHorizontal",
      initGraphObj(go.Node, "Spot",
        { contextMenu: nodeMenu },
        { locationSpot: go.Spot.Bottom, resizable: true, resizeObjectName: "BAR" },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        initGraphObj(go.Panel, "Horizontal",
          initGraphObj(go.Shape, "Rectangle", {
            name: "BAR",
            fill: "#ADD8E6",
            stroke: "black",
            cursor: "pointer",
            height: 20,
            width: 60,
            strokeWidth: 1,
          },new go.Binding("height", "height").makeTwoWay(),
            new go.Binding("width", "width").makeTwoWay(),
            new go.Binding("fill", "color").makeTwoWay(),
            new go.Binding("stroke", "border").makeTwoWay(),
            new go.Binding("strokeWidth", "borderWidth").makeTwoWay(),
          ),
        )
      )
    );

    diagram.nodeTemplateMap.add("Text",
      initGraphObj(go.Node, "Auto",
        { contextMenu: nodeMenu },
        initGraphObj(go.TextBlock, { 
          editable: true, 
          wrap: go.Wrap.Fit, },
          new go.Binding("text", "text").makeTwoWay(),
          new go.Binding("stroke", "color").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay()
        ), 
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      ),
    );

    diagram.nodeTemplateMap.add("LineHorizontal",
      initGraphObj(go.Node, "Spot",
        { contextMenu: nodeMenu },
        { 
          resizable: true, 
          resizeObjectName: "LINE",
          locationSpot: go.Spot.Center,
        },
        initGraphObj(go.Shape, "LineH", {
          name: "LINE",
          stroke: "black",
          strokeWidth: 2,
          width: 2, 
          height: 2,  
          cursor: "row-resize",  
        },
        new go.Binding("stroke", "color").makeTwoWay(),
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        new go.Binding("strokeWidth", "borderWidth").makeTwoWay(),),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify).makeTwoWay(),
      )
    );

    diagram.nodeTemplateMap.add("LineVertical",
      initGraphObj(go.Node, "Spot",
        { contextMenu: nodeMenu },
        { 
          resizable: true, 
          resizeObjectName: "LINE",
          locationSpot: go.Spot.Center,
        },
        initGraphObj(go.Shape, "LineV", {
          name: "LINE",
          stroke: "black",
          strokeWidth: 2,
          width: 2, 
          height: 140,
          cursor: "row-resize", 
        },
        new go.Binding("stroke", "color").makeTwoWay(),
        new go.Binding("width", "width").makeTwoWay(),
        new go.Binding("height", "height").makeTwoWay(),
        new go.Binding("strokeWidth", "borderWidth").makeTwoWay()),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify).makeTwoWay(),
      )
    );
    
    diagram.contextMenu = contexMenu;

    return diagram;
  };

  export default InitChart;