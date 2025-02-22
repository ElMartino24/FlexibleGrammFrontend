function GenerateHtmlAndCss(chartString, chartType) {
  const chartObj = JSON.parse(chartString).nodeDataArray;

  let response = `<html><body style='margin:0px;position:relative; top: 10rem; left: 10rem'>`;
  response += `<h1>Erstellung von: ${chartType}</h1>`;

  if (chartObj) {
    for (let values of chartObj) {
      let [x, y] = values.loc.split(" ").map(Number);

      x += 400;
      y += 400;

      if (values.category === "LineHorizontal") {
        x -= values.width / 2;
        response += `<div id="LineHorizontal" style="width:${values.width}px; 
                    height:${values.borderWidth}px; 
                    background-color:${values.color}; 
                    position: absolute; 
                    left: ${x}px; top: ${y}px;">
                    </div>`;
      }
      if (values.category === "LineVertical") {
        y -= values.height / 2;
        response += `<div id="LineVertical" style="width:${values.borderWidth}px; 
                    height:${values.height}px; 
                    background-color:${values.color}; 
                    position: absolute; 
                    left: ${x}px; top: ${y}px;">
                    </div>`;
      }
      if (values.category === "BarHorizontal") {
        x -= values.width / 2;
        y -= values.height;
        response += `<div id="BarHorizontal" style="width:${values.width}px; 
                    height:${values.height}px; 
                    border:${values.borderWidth}px solid ${values.border}; 
                    background-color:${values.color}; 
                    position: absolute; 
                    left: ${x}px; top: ${y}px;">
                    </div>`;
      }
      if (values.category === "Text") {
        response += `<p id="Text" style="color:${values.color}; 
                    font:${values.font}; 
                    position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    margin: 0;">
                    ${values.text}
                    </p>`;
      }
      if (values.category === "BarVertical") {
        x -= values.width / 2;
        y -= values.height;
        response += `<div id="BarVertical" style="width:${values.width}px; 
                    height:${values.height}px; 
                    border:${values.borderWidth}px solid ${values.border}; 
                    background-color:${values.color}; 
                    position: absolute; 
                    left: ${x}px; top: ${y}px;">
                    </div>`;
      }
    }
    response += `</body></html>`;
  } else {
    console.error("You didn't create a chart!");
  }

  return response;
}

export default GenerateHtmlAndCss;
