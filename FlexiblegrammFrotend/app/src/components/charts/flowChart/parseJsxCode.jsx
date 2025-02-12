function ParseJsxToNodeData(jsxCode) {
  const nodeDataArray = [];
  
  const capsuleRegex = /<div[^>]*id=["']Capsule["'][^>]*>[\s\S]*?<\/div>/g;
  const capsuleMatchesObj = jsxCode.match(capsuleRegex)

  const rectangleRegex = /<div[^>]*id=["']Rectangle["'][^>]*>[\s\S]*?<\/div>/g;
  const rectangleMatchesObj = jsxCode.match(rectangleRegex)

  const triangleRegex = /<div[^>]*id=["']Triangle["'][^>]*>[\s\S]*?<\/div>/g;
  const triagnleMatchesObj = jsxCode.match(triangleRegex)

  const arrowRegex = /<div[^>]*id=["']Arrow["'][^>]*>[\s\S]*?<\/div>/g;
  const arrowMatchesObj = jsxCode.match(arrowRegex)

  const textRegex = /<p[^>]*id=["']Text["'][^>]*>.*?<\/p>/gs;
  const textMatchesObj = jsxCode.match(textRegex);

  const ellipseRegex = /<div[^>]*id=["']Ellipse["'][^>]*>[\s\S]*?<\/div>/g;
  const ellipseMatchesObj = jsxCode.match(ellipseRegex)

  const roundedRectangleRegex = /<div[^>]*id=["']RoundedRectangle["'][^>]*>[\s\S]*?<\/div>/g;
  const roundedRectangleObj = jsxCode.match(roundedRectangleRegex)

  const diamondRegex = /<div[^>]*id=["']Diamond["'][^>]*>[\s\S]*?<\/div>/g;
  const diamondObj = jsxCode.match(diamondRegex)

  let key = 0;
  if(capsuleMatchesObj){
    for(let capsuleMatch in capsuleMatchesObj){
      key++

      const width = parseFloat(capsuleMatchesObj[capsuleMatch].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const height = parseFloat(capsuleMatchesObj[capsuleMatch].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
      const color = capsuleMatchesObj[capsuleMatch].match(/bg-\[([^\]]+)]/)[1];
      const borderWidth = parseFloat(capsuleMatchesObj[capsuleMatch].match(/border-\[(\d+(\.\d+)?)px\]/)[1]);
      const borderColor = capsuleMatchesObj[capsuleMatch].match(/border-\[#([a-fA-F0-9]{6})]/)[1];

      const font = capsuleMatchesObj[capsuleMatch].match(/font-\[([^\]]+)\]/)[1];
      const text = capsuleMatchesObj[capsuleMatch].match(/>([^<]*)<\/div>/)[1].trim();
      const textColor = capsuleMatchesObj[capsuleMatch].match(/text-\[([^\]]+)\]/)[1];

      let left = parseFloat(capsuleMatchesObj[capsuleMatch].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(capsuleMatchesObj[capsuleMatch].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

      left -= 400;
      top -= 400;

      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        figure: "Capsule",
        loc,
        color,
        height,
        width,
        borderWidth,
        border: `#${borderColor}`,
        textColor,
        font,
        text,
    });
    }
  }if(rectangleMatchesObj){
    for(let rectangleMatch in rectangleMatchesObj){
      key++

      const width = parseFloat(rectangleMatchesObj[rectangleMatch].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const height = parseFloat(rectangleMatchesObj[rectangleMatch].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
      const color = rectangleMatchesObj[rectangleMatch].match(/bg-\[([^\]]+)]/)[1];
      const borderWidth = parseFloat(rectangleMatchesObj[rectangleMatch].match(/border-\[(\d+(\.\d+)?)px\]/)[1]);
      const borderColor = rectangleMatchesObj[rectangleMatch].match(/border-\[#([a-fA-F0-9]{6})]/)[1];

      const font = rectangleMatchesObj[rectangleMatch].match(/font-\[([^\]]+)\]/)[1];
      const text = rectangleMatchesObj[rectangleMatch].match(/>([^<]*)<\/div>/)[1].trim();
      const textColor = rectangleMatchesObj[rectangleMatch].match(/text-\[([^\]]+)\]/)[1];

      let left = parseFloat(rectangleMatchesObj[rectangleMatch].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(rectangleMatchesObj[rectangleMatch].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

      left -= 400;
      top -= 400;

      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        figure: "Rectangle",
        loc,
        color,
        height,
        width,
        borderWidth,
        border: `#${borderColor}`,
        textColor,
        font,
        text,
    });
    }
  }if(triagnleMatchesObj){
    for(let triagnleMatch in triagnleMatchesObj){
      key++

      const halfWidth = parseFloat(triagnleMatchesObj[triagnleMatch].match(/border-l-\[(\d+(\.\d+)?)px\]/)[1]);
      const width = halfWidth * 2;
      const height = parseFloat(triagnleMatchesObj[triagnleMatch].match(/border-b-\[(\d+(\.\d+)?)px\]/)[1]);

      const color = triagnleMatchesObj[triagnleMatch].match(/border-b-\[(#[a-fA-F0-9]{6})\]/)[1];

      const font = triagnleMatchesObj[triagnleMatch].match(/font-\[([^\]]+)\]/)[1];
      const text = triagnleMatchesObj[triagnleMatch].match(/>([^<]*)<\/div>/)[1].trim();
      const textColor = triagnleMatchesObj[triagnleMatch].match(/text-\[([^\]]+)\]/)[1];

      let left = parseFloat(triagnleMatchesObj[triagnleMatch].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(triagnleMatchesObj[triagnleMatch].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

      left -= 400;
      top -= 400;

      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        loc,
        color,
        figure: "Triangle",
        height,
        width,
        textColor,
        font,
        text,
    });
    }
  }if(arrowMatchesObj){
    for(let arrowMatch in arrowMatchesObj){
      key++
      
      const shaftWidth = parseFloat(arrowMatchesObj[arrowMatch].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const shaftHeight = parseFloat(arrowMatchesObj[arrowMatch].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);

      const borderColor = arrowMatchesObj[arrowMatch].match(/border-\[(#[a-fA-F0-9]{6})\]/)[1];
      const borderWidth = parseFloat(arrowMatchesObj[arrowMatch].match(/border-\[(\d+(\.\d+)?)px\]/)[1]);
      const angle = parseFloat(arrowMatchesObj[arrowMatch].match(/rotate-\[(\d+(\.\d+)?)deg\]/)[1]);
      const color = arrowMatchesObj[arrowMatch].match(/bg-\[([^\]]+)]/)[1];
      
      const headHeight = parseFloat(arrowMatchesObj[arrowMatch].match(/border-b-\[(\d+(\.\d+)?)px\]/)[1]);
      const halfHeadWidth = parseFloat(arrowMatchesObj[arrowMatch].match(/border-l-\[(\d+(\.\d+)?)px\]/)[1]);
      const headWidth = halfHeadWidth * 2;
      const headColor = arrowMatchesObj[arrowMatch].match(/(?:border-b-\[[^\]]+\].*?){1}border-b-\[([^\]]+)\]/)[1];
      
      let left = parseFloat(arrowMatchesObj[arrowMatch].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(arrowMatchesObj[arrowMatch].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

      left -= 400;
      top -= 400;

      if (angle >= 0 && angle <= 90) {
        left += headHeight;
        left -= headHeight / 3;
      }
      if (angle >= 180 && angle <= 269) {
          top += headHeight;
          top -= headHeight / 3;
          if (angle == 235) {
              left -= headHeight / 3;
              top -= headHeight / 3;
          }
      }
      if (angle >= 270 && angle <= 359) {
          left -= headHeight / 3;
      }
    
      left += shaftWidth / 2;
      top += shaftHeight / 2;
      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        loc,
        category: "Arrow",
        color,
        shaftHeight,
        shaftWidth,
        angle,
        border: borderColor,
        borderWidth,
        headWidth,
        headHeight,
        headColor
    });
    }
  }if (textMatchesObj) {
    for (let textMatch in textMatchesObj) {
      key++;
      
      const color = textMatchesObj[textMatch].match(/text-\[([^\]]+)\]/)[1];
      
      const font = textMatchesObj[textMatch].match(/font-\[([^\]]+)\]/)[1];
      const text = textMatchesObj[textMatch].match(/>([^<]*)<\/p>/)[1].trim();
      let left = parseFloat(textMatchesObj[textMatch].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(textMatchesObj[textMatch].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);
      
      left -= 400; 
      top -= 400; 
      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        category: "Text",
        loc,
        text,
        color,
        font,
      });
    }
  }if(ellipseMatchesObj){
    for(let ellipse in ellipseMatchesObj){
      key++

      const width = parseFloat(ellipseMatchesObj[ellipse].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const height = parseFloat(ellipseMatchesObj[ellipse].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
      const color = ellipseMatchesObj[ellipse].match(/bg-\[([^\]]+)]/)[1];
      const borderWidth = parseFloat(ellipseMatchesObj[ellipse].match(/border-\[(\d+(\.\d+)?)px\]/)[1]);
      const borderColor = ellipseMatchesObj[ellipse].match(/border-\[#([a-fA-F0-9]{6})]/)[1];

      const font = ellipseMatchesObj[ellipse].match(/font-\[([^\]]+)\]/)[1];
      const text = ellipseMatchesObj[ellipse].match(/>([^<]*)<\/div>/)[1].trim();
      const textColor = ellipseMatchesObj[ellipse].match(/text-\[([^\]]+)\]/)[1];

      let left = parseFloat(ellipseMatchesObj[ellipse].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(ellipseMatchesObj[ellipse].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

      left -= 400;
      top -= 400;

      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        figure: "Ellipse",
        loc,
        color,
        height,
        width,
        borderWidth,
        border: `#${borderColor}`,
        textColor,
        font,
        text,
    });
    }
  }if(roundedRectangleObj){
    for(let roundedRectangle in roundedRectangleObj){
      key++

      const width = parseFloat(roundedRectangleObj[roundedRectangle].match(/w-\[(\d+(\.\d+)?)px\]/)[1]);
      const height = parseFloat(roundedRectangleObj[roundedRectangle].match(/h-\[(\d+(\.\d+)?)px\]/)[1]);
      const color = roundedRectangleObj[roundedRectangle].match(/bg-\[([^\]]+)]/)[1];
      const borderWidth = parseFloat(roundedRectangleObj[roundedRectangle].match(/border-\[(\d+(\.\d+)?)px\]/)[1]);
      const borderColor = roundedRectangleObj[roundedRectangle].match(/border-\[#([a-fA-F0-9]{6})]/)[1];

      const font = roundedRectangleObj[roundedRectangle].match(/font-\[([^\]]+)\]/)[1];
      const text = roundedRectangleObj[roundedRectangle].match(/>([^<]*)<\/div>/)[1].trim();
      const textColor = roundedRectangleObj[roundedRectangle].match(/text-\[([^\]]+)\]/)[1];

      let left = parseFloat(roundedRectangleObj[roundedRectangle].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(roundedRectangleObj[roundedRectangle].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

      left -= 400;
      top -= 400;

      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        figure: "RoundedRectangle",
        loc,
        color,
        height,
        width,
        borderWidth,
        border: `#${borderColor}`,
        textColor,
        font,
        text,
    });
    }
  }if(diamondObj){
    for(let diamond in diamondObj){

      const halfWidth = parseFloat(diamondObj[diamond].match(/border-l-\[(\d+(\.\d+)?)px\]/)[1]);
      const width = halfWidth * 2;
      const height = parseFloat(diamondObj[diamond].match(/border-t-\[(\d+(\.\d+)?)px\]/)[1]);

      const color = diamondObj[diamond].match(/border-t-\[(#[a-fA-F0-9]{6})\]/)[1];

      const font = diamondObj[diamond].match(/font-\[([^\]]+)\]/)[1];
      const text = diamondObj[diamond].match(/>([^<]*)<\/div>/)[1].trim();
      const textColor = diamondObj[diamond].match(/text-\[([^\]]+)\]/)[1];

      let left = parseFloat(diamondObj[diamond].match(/left-\[(-?\d+(\.\d+)?)px\]/)[1]);
      let top = parseFloat(diamondObj[diamond].match(/top-\[(-?\d+(\.\d+)?)px\]/)[1]);

      left -= 400;
      top -= 400;

      const loc = `${left} ${top}`;

      nodeDataArray.push({
        key,
        figure: "Diamond",
        loc,
        color,
        height,
        width,
        textColor,
        font,
        text,
    });
    }
  }

  return nodeDataArray;
}

export default ParseJsxToNodeData;