function ParseJsxToNodeData(jsxCode) {
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
      
      const color = textMatchesObj[textMatch].match(/text-\[([^\]]+)\]/)[1];
      
      const font = textMatchesObj[textMatch].match(/font-\[([^\]]+)\]/)[1];
      const text = textMatchesObj[textMatch].match(/>([^<]*)<\/p>/)[1].trim();
      const left = parseFloat(textMatchesObj[textMatch].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      const top = parseFloat(textMatchesObj[textMatch].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);
      
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
  }if(lineHorizontalObj){
      for(let lineHorizontal in lineHorizontalObj){
        key++

        const width = parseFloat(lineHorizontalObj[lineHorizontal].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
        const height = parseFloat(lineHorizontalObj[lineHorizontal].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
        const color = lineHorizontalObj[lineHorizontal].match(/bg-\[([^\]]+)]/)[1];
  
        const left = parseFloat(lineHorizontalObj[lineHorizontal].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
        const top = parseFloat(lineHorizontalObj[lineHorizontal].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);
        
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
      
        });
    }
  }if(lineVerticalObj){
    for(let lineVertical in lineVerticalObj){
      key++
      
      const width = parseFloat(lineVerticalObj[lineVertical].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const height = parseFloat(lineVerticalObj[lineVertical].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
      const color = lineVerticalObj[lineVertical].match(/bg-\[([^\]]+)]/)[1];

      const left = parseFloat(lineVerticalObj[lineVertical].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      const top = parseFloat(lineVerticalObj[lineVertical].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

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

      const width = parseFloat(barVerticalMatchesObj[barVertical].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const height = parseFloat(barVerticalMatchesObj[barVertical].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
      const color = barVerticalMatchesObj[barVertical].match(/bg-\[([^\]]+)]/)[1];

      const borderWidth = parseFloat(barVerticalMatchesObj[barVertical].match(/border-\[(\d+(\.\d+)?)px\]/)[1]);
      const borderColor = barVerticalMatchesObj[barVertical].match(/border-\[#([a-fA-F0-9]{6})]/)[1];

      const left = parseFloat(barVerticalMatchesObj[barVertical].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      const top = parseFloat(barVerticalMatchesObj[barVertical].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

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
    
      const width = parseFloat(barHorizontalObj[barHorizontal].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const height = parseFloat(barHorizontalObj[barHorizontal].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
      const color = barHorizontalObj[barHorizontal].match(/bg-\[([^\]]+)]/)[1];

      const borderWidth = parseInt(barHorizontalObj[barHorizontal].match(/border-\[(\d+)px\]/)[1]);
      const borderColor = barHorizontalObj[barHorizontal].match(/border-\[#([a-fA-F0-9]{6})]/)[1]; 

      const left = parseFloat(barHorizontalObj[barHorizontal].match(/left-\[-?(\d+(\.\d+)?)px\]/)[1]);
      const top = parseFloat(barHorizontalObj[barHorizontal].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);
    
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

export default ParseJsxToNodeData;