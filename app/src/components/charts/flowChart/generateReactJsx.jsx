function GenerateReactJsx(chartString, chartType) {
    const chartObj = JSON.parse(chartString).nodeDataArray;

    let response = `function ${chartType}() { return (<div className="relative">`;
    if (chartObj) {
        for (let values of chartObj) {
            let [x, y] = values.loc.split(" ").map(Number);
            x += 400;
            y += 400;

            if(values.figure == "Capsule"){
                response += `<div id="Capsule" className={\`absolute
                    left-[${x}px] top-[${y}px]
                    w-[${values.width}px] h-[${values.height}px]
                    bg-[${values.color}]
                    border-[${values.borderWidth}px] rounded-[${values.height / 2}px]
                    border-[${values.border}]
                    flex items-center justify-center
                    font-[${values.font}] text-[${values.textColor}]
                    \`}>${values.text}
                    </div>`
            }if(values.figure == "Rectangle"){
                response += `<div id="Rectangle" className={\`absolute
                    left-[${x}px] top-[${y}px]
                    w-[${values.width}px] h-[${values.height}px]
                    bg-[${values.color}]
                    border-[${values.borderWidth}px] border-[${values.border}]
                    flex items-center justify-center
                    font-[${values.font}] text-[${values.textColor}]
                    \`}>${values.text}
                    </div>`
            }if(values.figure == "Triangle"){
                response += `<div id="Triangle" className={\`absolute
                left-[${x}px] top-[${y}px]
                w-0  h-0
                border-l-[${values.width / 2}px] border-l-[transparent]
                border-r-[${values.width / 2}px] border-r-[transparent]
                border-b-[${values.height}px] 
                border-b-[${values.color}]
                \`}>
                <div className={\`absolute
                    left-[50%]
                    top-[${values.height / 2}px]
                    transform 
                    translate-x-[-50%] translate-y-[50%]
                    font-[${values.font}]
                    text-[${values.textColor}]
                    whitespace-nowrap
                    \`}>
                    ${values.text}
                    </div>
                </div>`
            }if (values.category == "Arrow") {
                if (values.angle >= 0 && values.angle <= 90) {
                    x -= values.headHeight;
                    x += values.headHeight / 3;
                }
                if (values.angle >= 180 && values.angle <= 269) {
                    y -= values.headHeight;
                    y += values.headHeight / 3;
                    if (values.angle == 235) {
                        x += values.headHeight / 3;
                        y += values.headHeight / 3;
                    }
                }
                if (values.angle >= 270 && values.angle <= 359) {
                    x += values.headHeight / 3;
                }
                response += `<div id="Arrow" className={\`absolute
                    left-[${x - values.shaftWidth / 2}px] 
                    top-[${y - values.shaftHeight / 2}px]
                    w-[${values.shaftWidth}px] 
                    h-[${values.shaftHeight}px]
                    border-[${values.borderWidth}px] 
                    border-[${values.border}]
                    transform rotate-[${values.angle}deg]
                    bg-[${values.color}]
                \`}>
                    <div className={\`absolute
                        top-[-${values.headHeight}px]
                        left-[${values.shaftWidth / 2 - values.headWidth / 2}px]
                        w-0 h-0
                        border-l-[${values.headWidth / 2}px] border-l-[transparent]
                        border-r-[${values.headWidth / 2}px] border-r-[transparent]
                        border-b-[${values.headHeight}px] border-b-[${values.headColor}]
                    \`}></div>
                </div>`;
            }if(values.category == "Text"){
                response += `<p id="Text" className={\`
                    font-[${values.font}]
                    text-[${values.color}]
                    absolute
                    left-[${x}px] top-[${y}px]
                    m-0
                    \`}>${values.text}
                    </p>`
            }if(values.figure == "Ellipse"){
                response += `<div id="Ellipse" className={\` absolute
                    left-[${x}px] top-[${y}px]
                    w-[${values.width}px] 
                    h-[${values.height}px]
                    bg-[${values.color}]
                    border-[${values.borderWidth}px] rounded-[50%]
                    border-[${values.border}]
                    flex items-center justify-center
                    font-[${values.font}] text-[${values.textColor}]
                    \`}>${values.text}
                    </div>`
            }if(values.figure == "RoundedRectangle"){
                response += `<div id="RoundedRectangle" className={\` absolute
                left-[${x}px] top-[${y}px]
                w-[${values.width}px] 
                h-[${values.height}px]
                bg-[${values.color}]
                border-[${values.borderWidth}px] rounded-[5px]
                border-[${values.border}]
                flex items-center justify-center
                font-[${values.font}] text-[${values.textColor}]
                \`}>${values.text}
                </div>`
            }if(values.figure == "Diamond"){
                response += `<div className={\` absolute
                    left-[${x}px] top-[${y}px]
                    w-[0px] 
                    h-[0px]
                    border-l-[${values.width / 2}px] border-l-[transparent]
                    border-r-[${values.width / 2}px] border-r-[transparent]
                    border-b-[${values.height / 2}px] border-b-[${values.color}]
                    \`}>
                    </div>
                <div className={\`id="Diamond" absolute
                    left-[${x}px] top-[${y + values.width / 2}px]
                    w-[0px] 
                    h-[0px]
                    border-l-[${values.width / 2}px] border-l-[transparent]
                    border-r-[${values.width / 2}px] border-r-[transparent]
                    border-t-[${values.height / 2}px] border-t-[${values.color}]
                    mt-[${values.height / 2 >= values.width / 2 ? values.height / 2 - values.width / 2 - 1 + 'px' : '-' + (values.width / 2 - values.height / 2) + 'px'}]
                    font-[${values.font}] text-[${values.textColor}]
                    \`}>${values.text}
                    </div>`
            }   
        }
    } else {
        console.error("You didn't create a chart!");
    }

    response += `</div>); } export default ${chartType};`;
    return response;
}

export default GenerateReactJsx;