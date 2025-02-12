function ParseHTMLCssToData(jsxCode) {
  
    const nodeDataArray = [];
    
    const barVerticalRegex = /<div[^>]*id=["']BarVertical["'][^>]*>/g;
    const barVerticalMatchesObj = jsxCode.match(barVerticalRegex);
  
    const lineHorizontalRegex = /<div[^>]*id=["']LineHorizontal["'][^>]*>/g;
    const lineHorizontalObj = jsxCode.match(lineHorizontalRegex);
  
    const lineVerticalRegex = /<div[^>]*id=["']LineVertical["'][^>]*>/g;
    const lineVerticalObj = jsxCode.match(lineVerticalRegex);
  
    const barHorizontalRegex = /<div[^>]*id=["']BarHorizontal["'][^>]*>/g;
    const barHorizontalObj = jsxCode.match(barHorizontalRegex);
  
    const textRegex = /<p[^>]*id=["']Text["'][^>]*>.*?<\/p>/gs;
    const textMatchesObj = jsxCode.match(textRegex);
    
    let key = 0;
    if (textMatchesObj) {
      for (let textMatch in textMatchesObj) {
        key++;
        
        const color = textMatchesObj[textMatch].match(/color:\s*([^;]+)/)[1];
        
        const font = textMatchesObj[textMatch].match(/font:\s*([^;]+)/)[1];
        const text = textMatchesObj[textMatch].match(/>([^<]*)<\/p>/)[1].trim();
        const left = parseFloat(textMatchesObj[textMatch].match(/left:\s*([^;]+)/)[1]);
        const top = parseFloat(textMatchesObj[textMatch].match(/top:\s*([^;]+)/)[1]);
    
        const x = left - 400 + 3; 
        const y = top - 200 + 5; 
        const loc = `${x} ${y}`;
  
        nodeDataArray.push({
          key,
          category: "Text",
          loc,
          text,
          color,
          font,
        });
      }
    }if (lineHorizontalObj) {
        for (let lineHorizontal in lineHorizontalObj) {
          key++;
     
            const width = parseFloat(lineHorizontalObj[lineHorizontal].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
            const height = parseFloat(lineHorizontalObj[lineHorizontal].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
            const color = lineHorizontalObj[lineHorizontal].match(/background-color:\s*([^;]+)/)[1];
      
            const left = parseFloat(lineHorizontalObj[lineHorizontal].match(/left:\s*(-?\d+(\.\d+)?)px/)[1]);
            const top = parseFloat(lineHorizontalObj[lineHorizontal].match(/top:\s*(-?\d+(\.\d+)?)px/)[1]);
      
            const x = left - 400 + (width / 2);
            const y = top - 200;
            const loc = `${x} ${y}`;
      
            nodeDataArray.push({
                key,
                category: "LineHorizontal",
                loc,
                color,
                width,
                borderWidth: height,
                height
              });
            }
    }if(lineVerticalObj){
        for(let lineVertical in lineVerticalObj){
            key++
            
            const width = parseFloat(lineVerticalObj[lineVertical].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
            const height = parseFloat(lineVerticalObj[lineVertical].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
            const color = lineVerticalObj[lineVertical].match(/background-color:\s*([^;]+)/)[1];
        
            const left = parseFloat(lineVerticalObj[lineVertical].match(/left:\s*(-?\d+(\.\d+)?)px/)[1]);
            const top = parseFloat(lineVerticalObj[lineVertical].match(/top:\s*(-?\d+(\.\d+)?)px/)[1]);
    
            const x = left - 400 ;
            const y = top - 200 + (height / 2);
            const loc = `${x} ${y}`;
    
            nodeDataArray.push({
            key,
            category: "LineVertical",
            loc,
            color,
            height,
            borderWidth: width
        
            });
        }
    }if (barVerticalMatchesObj) {
        for (let barVertical in barVerticalMatchesObj) {
        key++;
            console.log(barVerticalMatchesObj[barVertical])
        const width = parseFloat(barVerticalMatchesObj[barVertical].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
        const height = parseFloat(barVerticalMatchesObj[barVertical].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
        const color = barVerticalMatchesObj[barVertical].match(/background-color:\s*([^;]+)/)[1];
    
        const borderWidth = parseFloat(barVerticalMatchesObj[barVertical].match(/border:\s*(\d+(\.\d+)?)px/)[1]);
        const borderColor = barVerticalMatchesObj[barVertical].match(/border(?:-[a-zA-Z]+)*:\s*[^;]*\s*#([a-fA-F0-9]{6})/)[1];
    
        const left = parseFloat(barVerticalMatchesObj[barVertical].match(/left:\s*(-?\d+(\.\d+)?)px/)[1]);
        const top = parseFloat(barVerticalMatchesObj[barVertical].match(/top:\s*(-?\d+(\.\d+)?)px/)[1]);
    
        const x = left - 400 + width / 2;
        const y = top - 200 + height;
    
        const loc = `${x} ${y}`;
    
        nodeDataArray.push({
            key,
            category: "BarVertical",
            loc,
            color,
            height,
            width,
            borderWidth,
            border: `#${borderColor}`,
        });
        }
    }if (barHorizontalObj) {
      for(let barHorizontal in barHorizontalObj){
  
        key++;
      
        const width = parseFloat(barHorizontalObj[barHorizontal].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
        const height = parseFloat(barHorizontalObj[barHorizontal].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
        const color = barHorizontalObj[barHorizontal].match(/background-color:\s*([^;]+)/)[1];
    
        const borderWidth = parseFloat(barHorizontalObj[barHorizontal].match(/border:\s*(\d+(\.\d+)?)px/)[1]);
        const borderColor = barHorizontalObj[barHorizontal].match(/border(?:-[a-zA-Z]+)*:\s*[^;]*\s*#([a-fA-F0-9]{6})/)[1];
    
        const left = parseFloat(barHorizontalObj[barHorizontal].match(/left:\s*(-?\d+(\.\d+)?)px/)[1]);
        const top = parseFloat(barHorizontalObj[barHorizontal].match(/top:\s*(-?\d+(\.\d+)?)px/)[1]);
      
        const x = left - 400 + (width / 2);
        const y = top - 200 + (height)
        const loc = `${x} ${y}`;
  
        nodeDataArray.push({
          key,
          category: "BarHorizontal",
          loc,
          color,
          height,
          width,
          borderWidth,
          border: `#${borderColor}`,
        });
      };
    }
  
    return nodeDataArray;
  }
  
  export default ParseHTMLCssToData;