import * as go from "gojs";

function InitChart() {
    const initGraphObj = go.GraphObject.make;

    const diagram = initGraphObj(go.Diagram, {
      "undoManager.isEnabled": true,
      "relinkingTool.isEnabled": true,
      "allowDrop": true,
      "grid.visible": true,
      "grid.gridCellSize": new go.Size(10, 10),
      "draggingTool.isGridSnapEnabled": true,
      "draggingTool.gridSnapCellSize": new go.Size(5, 5),
      "draggingTool.gridSnapCellSpot": go.Spot.TopLeft,
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

    diagram.nodeTemplate = initGraphObj(
      go.Node,
      "Auto",
      { contextMenu: nodeMenu },
      { resizable: true },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("width", "width").makeTwoWay(),
      new go.Binding("height", "height").makeTwoWay(),
      initGraphObj(
        go.Shape, {},
        new go.Binding("fill", "color").makeTwoWay(),
        new go.Binding("figure"),
        new go.Binding("stroke", "border").makeTwoWay(),
        new go.Binding("strokeWidth", "borderWidth").makeTwoWay(),
      ),
      initGraphObj(go.TextBlock, {
        maxSize: new go.Size(160, NaN),
        wrap: go.Wrap.Fit,
        editable: true,
      }, 
        new go.Binding("text", "text").makeTwoWay(),
        new go.Binding("font", "font").makeTwoWay(),
        new go.Binding("stroke", "textColor").makeTwoWay(),),
    );

    diagram.nodeTemplateMap.add("Arrow",
      initGraphObj(go.Node, "Spot",
        { contextMenu: nodeMenu },
        { 
          // resizable: true, 
          rotatable: true, 
          resizeObjectName: "ARROW",
          locationSpot: go.Spot.Center,
          selectionAdorned: true,
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("angle").makeTwoWay(),
        initGraphObj(go.Shape, "Rectangle", {
          name: "ARROW",
          fill: "black",
          stroke: "black",
          strokeWidth: 1,
          width: 10,
          height: 30,
          alignment: go.Spot.Center,
          cursor: "pointer", 
        },
        new go.Binding("width", "shaftWidth").makeTwoWay(),
        new go.Binding("height", "shaftHeight").makeTwoWay(), 
        new go.Binding("fill", "color").makeTwoWay(),
        new go.Binding("stroke", "border").makeTwoWay(),
        new go.Binding("strokeWidth", "borderWidth").makeTwoWay(),
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
        // new go.Binding("width", "shaftWidth", (w) => w * 3).makeTwoWay(),
        // new go.Binding("height", "shaftHeight", (h) => h * 2).makeTwoWay(),
        new go.Binding("width", "headWidth",).makeTwoWay(),
        new go.Binding("height", "headHeight",).makeTwoWay(),
        new go.Binding("fill", "headColor").makeTwoWay(),
        new go.Binding("stroke", "border").makeTwoWay(),
        new go.Binding("strokeWidth", "borderWidth").makeTwoWay(),
        ),
      ),
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

    diagram.contextMenu = contexMenu;

    return diagram;
  };

  export default InitChart;