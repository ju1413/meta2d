/*
 * @Author:  
 * @Date: 2023-07-11 09:02:35
 * @Email:  
 * @LastEditors:  
 * @LastEditTime: 2023-07-11 09:02:35
 * @Description: 
 * @version:  
 */
import {Pen , Point} from '@meta2d/core';
export function triangle(pen: Pen, ctx?: CanvasRenderingContext2D): Path2D {
    const path = !ctx ? new Path2D() : ctx;
    const { x, y, width, height } = pen.calculative.worldRect;
    path.moveTo(x + width / 2, y);
    path.lineTo(x + width, y + height);
    path.lineTo(x, y + height);
    path.lineTo(x + width / 2, y);
  
    path.closePath();
    if (path instanceof Path2D) return path;
  }
  // 2. 如果需要，编写锚点函数。通常，可以使用默认锚点，然后通过快捷键动态添加锚点
  // 注意，锚点左边为相对宽高的百分比小数（0-1之间的小数）
  export function triangleAnchors(pen: Pen) {
    const anchors: Point[] = [];
    anchors.push({
      id: '0',
      penId: pen.id,
      x: 0.5,
      y: 0,
    });
  
    anchors.push({
      id: '1',
      penId: pen.id,
      x: 1,
      y: 1,
    });
  
    anchors.push({
      id: '2',
      penId: pen.id,
      x: 0,
      y: 1,
    });
    pen.anchors = anchors;
  }
  