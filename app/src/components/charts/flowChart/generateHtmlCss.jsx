function GenerateHtmlAndCss(chartString, chartType) {
    const chartObj = JSON.parse(chartString).nodeDataArray;
    
    let response = `<html><body style='position:relative; top: 10rem; left: 10rem'>`;
    response += `<h1 style="text-Align:center;">Erstellung von: ${chartType}</h1>`;
    
    if (chartObj) {
        for (let values of chartObj) {
            let [x, y] = values.loc.split(" ").map(Number);
            
            x += 400;
            y += 400;
            
            if (values.figure == "Capsule") {
                response += `<div id="Capsule" style="position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    width: ${values.width}px; 
                    height: ${values.height}px; 
                    background-color: ${values.color};
                    border-radius: ${values.height / 2}px;
                    border: ${values.borderWidth}px solid ${values.border};
                    display: flex; align-items: center; justify-content: center; 
                    font: ${values.font}; color: ${values.textColor};"> 
                    ${values.text}</div>`;
            }if(values.figure == "Rectangle"){
                response += `<div id="Rectangle" style="position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    width: ${values.width}px; 
                    height: ${values.height}px; 
                    background-color: ${values.color};
                    border: ${values.borderWidth}px solid ${values.border};
                    display: flex; align-items: center; justify-content: center; 
                    font: ${values.font}; color: ${values.textColor};"> 
                    ${values.text}</div>`;
            }if (values.figure == "Triangle") {
                response += `<div id="Triangle" style="position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    width: 0; 
                    height: 0; 
                    border-left: ${values.width / 2}px solid transparent; 
                    border-right: ${values.width / 2}px solid transparent; 
                    border-bottom: ${values.height}px solid ${values.color};">
                    <div style="position: absolute; 
                        left: 0px; 
                        top: ${values.height / 3 + values.height / 3};  
                        transform: translate(-50%, -50%); 
                        font: ${values.font}; 
                        color: ${values.textColor}; 
                        white-space: nowrap;
                    ">
                        ${values.text}
                    </div>
                </div>`;
            }if (values.category == "Arrow") {
                if(values.angle <= 90 && values.angle >= 0 ){
                    x -= values.headHeight;
                    x += values.headHeight / 3;
                }
                if(values.angle <= 269 && values.angle >= 180){
                    y -= values.headHeight;
                    y += values.headHeight / 3;
                    if(values.angle == 235){
                        x += values.headHeight / 3;
                        y += values.headHeight / 3;
                    }
                }if(values.angle <= 359 && values.angle >= 270){
                    x += values.headHeight / 3;
                }
                
                response += `<div id="Arrow" style="position: absolute; 
                    left: ${x - values.shaftWidth / 2}px; top: ${y - values.shaftHeight / 2}px;
                    width: ${values.shaftWidth}px;
                    height: ${values.shaftHeight}px;
                    border: ${values.borderWidth}px solid ${values.border};
                    transform: rotate(${values.angle}deg);
                    background-color: ${values.color};">
                    <div style="position: absolute; 
                        top: -${values.headHeight}px; 
                        left: ${values.shaftWidth / 2 - values.headWidth / 2}px; 
                        width: 0px;
                        height: 0px;
                        border-left: ${values.headWidth / 2}px solid transparent; 
                        border-right: ${values.headWidth / 2}px solid transparent; 
                        border-bottom: ${values.headHeight}px solid ${values.color};">
                    </div>
                </div>`;
            }if (values.category == "Text") {
                response += `<p id="Text" style="color:${values.color}; 
                    font:${values.font}; 
                    position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    margin: 0;">
                    ${values.text}
                    </p>`;
            }if(values.figure == "Ellipse"){
                response += `<div id="Ellipse" style="position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    width: ${values.width}px; 
                    height: ${values.height}px; 
                    background-color: ${values.color};
                    border-radius: 50%;
                    border: ${values.borderWidth}px solid ${values.border};
                    display: flex; align-items: center; justify-content: center; 
                    font: ${values.font}; color: ${values.textColor};"> 
                    ${values.text}</div>`;
            }if(values.figure == "RoundedRectangle"){
                response += `<div id="RoundedRectangle" style="position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    width: ${values.width}px; 
                    height: ${values.height}px; 
                    background-color: ${values.color};
                    border: ${values.borderWidth}px solid ${values.border};
                    border-radius: 5px;
                    display: flex; align-items: center; justify-content: center; 
                    font: ${values.font}; color: ${values.textColor};"> 
                    ${values.text}</div>`;
            }
            if (values.figure == "Diamond") {

                response += `<div style="position: absolute; 
                    left: ${x}px; top: ${y}px; 
                    width: 0; 
                    height: 0; 
                    border-left: ${values.width / 2}px solid transparent;
                    border-right: ${values.width / 2}px solid transparent;
                    border-bottom: ${values.height / 2}px solid ${values.color};
                    "></div>
                <div id="Diamond" style="position: absolute; 
                    left: ${x}px; top: ${y + values.width / 2}px; 
                    width: 0; 
                    height: 0; 
                    border-left: ${values.width / 2}px solid transparent;
                    border-right: ${values.width / 2}px solid transparent;
                    border-top: ${values.height / 2}px solid ${values.color};
                    margin-top: ${values.height / 2 >= values.width / 2 ? values.height / 2 - values.width / 2 - 1 + 'px' : '-' + (values.width / 2 - values.height / 2) + 'px'};
                    font: ${values.font}; color: ${values.textColor};">
                    ${values.text}</div>`;
            }
            
        }
    }else{
        console.error("You didn't create a chart")
    }

    response += `</body></html>`;
    return response;
}

export default GenerateHtmlAndCss;