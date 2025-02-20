function GenerateReactJsx(chartString, chartType) {
  const chartObj = JSON.parse(chartString).nodeDataArray;

  let response = `function ${chartType}() { return (<div className="relative">`;
  if (chartObj) {
    for (let values of chartObj) {
      let [x, y] = values.loc.split(" ").map(Number);
      x += 400;
      y += 400;

      if (values.category == "LineHorizontal") {
        x -= values.width / 2;
        response += `<div id="LineHorizontal" className={\`absolute 
                    bg-[${values.color}] 
                    w-[${values.width}px] 
                    h-[${values.borderWidth}px] 
                    left-[${x}px] top-[${y}px]\`}>
                    </div>`;
      }
      if (values.category == "LineVertical") {
        y -= values.height / 2;
        response += `<div id="LineVertical" className={\`absolute 
                    bg-[${values.color}] 
                    w-[${values.borderWidth}px] 
                    h-[${values.height}px] 
                    left-[${x}px] top-[${y}px]\`}>
                    </div>`;
      }
      if (values.category == "BarHorizontal") {
        x -= values.width / 2;
        y -= values.height;
        response += `<div id="BarHorizontal" className={\`absolute 
                bg-[${values.color}] 
                border-[${values.borderWidth}px] 
                border-[${values.border}] 
                w-[${values.width}px] 
                h-[${values.height}px] 
                left-[${x}px] top-[${y}px]\`}>
                </div>`;
      }
      if (values.category == "Text") {
        y -= 5;
        x -= 3;

        response += `<p id="Text" className={\`absolute 
                    text-[${values.color}] 
                    font-[${values.font}] 
                    left-[${x}px] top-[${y}px]\`}>
                    ${values.text}
                    </p>`;
      }
      if (values.category == "BarVertical") {
        x -= values.width / 2;
        y -= values.height;
        response += `<div id="BarVertical" className={\`absolute 
                    bg-[${values.color}] 
                    border-[${values.borderWidth}px] 
                    border-[${values.border}] 
                    w-[${values.width}px] 
                    h-[${values.height}px] 
                    left-[${x}px] top-[${y}px]\`}
                    ></div>`;
      }
    }
  } else {
    console.error("You didn't create a chart!");
  }

  response += `</div>); } export default ${chartType};`;

  return response;
}

export default GenerateReactJsx;
