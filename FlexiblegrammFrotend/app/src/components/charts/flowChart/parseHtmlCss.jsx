function ParseHTMLCssToData(jsxCode) {
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
       
        const width = parseFloat(capsuleMatchesObj[capsuleMatch].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
        const height = parseFloat(capsuleMatchesObj[capsuleMatch].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
        const color = capsuleMatchesObj[capsuleMatch].match(/background-color:\s*([^;]+)/)[1];
        const borderWidth = parseFloat(capsuleMatchesObj[capsuleMatch].match(/border:\s*(\d+(\.\d+)?)px/)[1]);
        const borderColor = capsuleMatchesObj[capsuleMatch].match(/border(?:-[a-zA-Z]+)*:\s*[^;]*\s*#([a-fA-F0-9]{6})/)[1];
  
        const font = capsuleMatchesObj[capsuleMatch].match(/font:\s*([^;]+)/)[1];
        const text = capsuleMatchesObj[capsuleMatch].match(/>([^<]*)<\/div>/)[1].trim();
  
        const textColor = capsuleMatchesObj[capsuleMatch].match(/<div[^>]*style="[^"]*color:\s*([^;]+);/)[1].trim();
      
        let left = parseFloat(capsuleMatchesObj[capsuleMatch].match(/left:\s*([^;]+)/)[1]);
        let top = parseFloat(capsuleMatchesObj[capsuleMatch].match(/top:\s*([^;]+)/)[1]);
  
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

        const width = parseFloat(rectangleMatchesObj[rectangleMatch].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
        const height = parseFloat(rectangleMatchesObj[rectangleMatch].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
        const color = rectangleMatchesObj[rectangleMatch].match(/background-color:\s*([^;]+)/)[1];
        const borderWidth = parseFloat(rectangleMatchesObj[rectangleMatch].match(/border:\s*(\d+(\.\d+)?)px/)[1]);
        const borderColor = rectangleMatchesObj[rectangleMatch].match(/border(?:-[a-zA-Z]+)*:\s*[^;]*\s*#([a-fA-F0-9]{6})/)[1];
  
        const font = rectangleMatchesObj[rectangleMatch].match(/font:\s*([^;]+)/)[1];
        const text = rectangleMatchesObj[rectangleMatch].match(/>([^<]*)<\/div>/)[1].trim();
        const textColor = rectangleMatchesObj[rectangleMatch].match(/<div[^>]*style="[^"]*color:\s*([^;]+);/)[1];
      
        let left = parseFloat(rectangleMatchesObj[rectangleMatch].match(/left:\s*([^;]+)/)[1]);
        let top = parseFloat(rectangleMatchesObj[rectangleMatch].match(/top:\s*([^;]+)/)[1]);
  
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
       
        const halfWidth = parseFloat(triagnleMatchesObj[triagnleMatch].match(/border-left:\s*(\d+(\.\d+)?)px/)[1]);
        const width = halfWidth * 2;
        const height = parseFloat(triagnleMatchesObj[triagnleMatch].match(/border-bottom:\s*(\d+(\.\d+)?)px/)[1]);
  
        const color = triagnleMatchesObj[triagnleMatch].match(/border-bottom:\s*\d+px\s+solid\s+(#[a-fA-F0-9]{6})/)[1];
  
        const font = triagnleMatchesObj[triagnleMatch].match(/font:\s*([^;]+)/)[1];
        const text = triagnleMatchesObj[triagnleMatch].match(/>([^<]*)<\/div>/)[1].trim();
        const textColor = triagnleMatchesObj[triagnleMatch].match(/color:\s*([^;]+)/)[1];

        let left = parseFloat(triagnleMatchesObj[triagnleMatch].match(/left:\s*([^;]+)/)[1]);
        let top = parseFloat(triagnleMatchesObj[triagnleMatch].match(/top:\s*([^;]+)/)[1]);
  
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

        const shaftWidth = parseFloat(arrowMatchesObj[arrowMatch].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
        const shaftHeight = parseFloat(arrowMatchesObj[arrowMatch].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
  
        const borderColor = arrowMatchesObj[arrowMatch].match(/border(?:-[a-zA-Z]+)*:\s*[^;]*\s*#([a-fA-F0-9]{6})/)[1];
        const borderWidth = parseFloat(arrowMatchesObj[arrowMatch].match(/border:\s*(\d+(\.\d+)?)px/)[1]);

        const angle = parseFloat(arrowMatchesObj[arrowMatch].match(/transform:\s*rotate\((\d+(\.\d+)?)deg\)/)[1]);
        const color = arrowMatchesObj[arrowMatch].match(/background-color:\s*([^;]+)/)[1];
        
        const headHeight = parseFloat(arrowMatchesObj[arrowMatch].match(/border-bottom:\s*(\d+(\.\d+)?)px/)[1]);
        const halfHeadWidth = parseFloat(arrowMatchesObj[arrowMatch].match(/border-left:\s*(\d+(\.\d+)?)px/)[1]);
        const headWidth = halfHeadWidth * 2;
        const headColor = arrowMatchesObj[arrowMatch].match(/border-bottom:\s*\d+px\s+solid\s+(#[a-fA-F0-9]{6})/)[1];
        
        let left = parseFloat(arrowMatchesObj[arrowMatch].match(/left:\s*(-?\d+(\.\d+)?)px/)[1]);
        let top = parseFloat(arrowMatchesObj[arrowMatch].match(/top:\s*(-?\d+(\.\d+)?)px/)[1]);
  
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
    }
    if (textMatchesObj) {
      for (let textMatch in textMatchesObj) {
        key++;
        
        const color = textMatchesObj[textMatch].match(/color:\s*([^;]+)/)[1];
        
        const font = textMatchesObj[textMatch].match(/font:\s*([^;]+)/)[1];
        const text = textMatchesObj[textMatch].match(/>([^<]*)<\/p>/)[1].trim();
        let left = parseFloat(textMatchesObj[textMatch].match(/left:\s*([^;]+)/)[1]);
        let top = parseFloat(textMatchesObj[textMatch].match(/top:\s*([^;]+)/)[1]);
        
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
  
        const width = parseFloat(ellipseMatchesObj[ellipse].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
        const height = parseFloat(ellipseMatchesObj[ellipse].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
        const color = ellipseMatchesObj[ellipse].match(/background-color:\s*([^;]+)/)[1];
        const borderWidth = parseFloat(ellipseMatchesObj[ellipse].match(/border:\s*(\d+(\.\d+)?)px/)[1]);
        const borderColor = ellipseMatchesObj[ellipse].match(/border(?:-[a-zA-Z]+)*:\s*[^;]*\s*#([a-fA-F0-9]{6})/)[1];
  
        const font = ellipseMatchesObj[ellipse].match(/font:\s*([^;]+)/)[1];
        const text = ellipseMatchesObj[ellipse].match(/>([^<]*)<\/div>/)[1].trim();
        const textColor = ellipseMatchesObj[ellipse].match(/<div[^>]*style="[^"]*color:\s*([^;]+);/)[1];
  
        let left = parseFloat(ellipseMatchesObj[ellipse].match(/left:\s*([^;]+)/)[1]);
        let top = parseFloat(ellipseMatchesObj[ellipse].match(/top:\s*([^;]+)/)[1]);
  
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
  
        const width = parseFloat(roundedRectangleObj[roundedRectangle].match(/width:\s*(\d+(\.\d+)?)px/)[1]);
        const height = parseFloat(roundedRectangleObj[roundedRectangle].match(/height:\s*(\d+(\.\d+)?)px/)[1]);
        const color = roundedRectangleObj[roundedRectangle].match(/background-color:\s*([^;]+)/)[1];
        const borderWidth = parseFloat(roundedRectangleObj[roundedRectangle].match(/border:\s*(\d+(\.\d+)?)px/)[1]);
        const borderColor = roundedRectangleObj[roundedRectangle].match(/border(?:-[a-zA-Z]+)*:\s*[^;]*\s*#([a-fA-F0-9]{6})/)[1];
  
        const font = roundedRectangleObj[roundedRectangle].match(/font:\s*([^;]+)/)[1];
        const text = roundedRectangleObj[roundedRectangle].match(/>([^<]*)<\/div>/)[1].trim();
        const textColor = roundedRectangleObj[roundedRectangle].match(/<div[^>]*style="[^"]*color:\s*([^;]+);/)[1];
  
        let left = parseFloat(roundedRectangleObj[roundedRectangle].match(/left:\s*([^;]+)/)[1]);
        let top = parseFloat(roundedRectangleObj[roundedRectangle].match(/top:\s*([^;]+)/)[1]);
  
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
    }
    if(diamondObj){
      for(let diamond in diamondObj){
        
        const halfWidth = parseFloat(diamondObj[diamond].match(/border-left:\s*(\d+(\.\d+)?)px/)[1]);
        const width = halfWidth * 2;
        const height = parseFloat(diamondObj[diamond].match(/border-top:\s*(\d+(\.\d+)?)px/)[1]);
  
        const color = diamondObj[diamond].match(/border-top:\s*\d+px\s+solid\s+(#[a-fA-F0-9]{6})/)[1];
  
        const font = diamondObj[diamond].match(/font:\s*([^;]+)/)[1];
        const text = diamondObj[diamond].match(/>([^<]*)<\/div>/)[1].trim();
        const textColor = diamondObj[diamond].match(/border-top:\s*\d+px\s+solid\s+(#[a-fA-F0-9]{6})/)[1];
  
        let left = parseFloat(diamondObj[diamond].match(/left:\s*(-?\d+(\.\d+)?)px/)[1]);
        let top = parseFloat(diamondObj[diamond].match(/top:\s*(-?\d+(\.\d+)?)px/)[1]);
  
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
  
  export default ParseHTMLCssToData;