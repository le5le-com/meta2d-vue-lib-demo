// // 1. 编写图形绘画函数
// // 其中，calculative.worldRect为canvas的世界坐标。更多信息，参考 “架构” - “概要” 和 Pen 相关文档
// // 形参 ctx 仅仅在 downloadSvg 时有值
// function mytriangle1(pen, ctx) {
//   const path = !ctx ? new Path2D() : ctx;
//   const { x, y, width, height } = pen.calculative.worldRect;
//   path.moveTo(x + width / 2, y);
//   path.lineTo(x + width, y + height);
//   path.lineTo(x, y + height);
//   path.lineTo(x + width / 2, y);

//   path.closePath();
//   if (path instanceof Path2D) return path;
// };
// // 2. 如果需要，编写锚点函数。通常，可以使用默认锚点，然后通过快捷键动态添加锚点
// // 注意，锚点左边为相对宽高的百分比小数（0-1之间的小数）
// function mytriangleAnchors1(pen) {
//   const anchors = [];
//   anchors.push({
//     id: '0',
//     penId: pen.id,
//     x: 0.5,
//     y: 0,
//   });

//   anchors.push({
//     id: '1',
//     penId: pen.id,
//     x: 1,
//     y: 1,
//   });

//   anchors.push({
//     id: '2',
//     penId: pen.id,
//     x: 0,
//     y: 1,
//   });
//   pen.anchors = anchors;
// };

// 3.注册绘制函数，请确保此js加载的时机meta2d实例对象已经存在，否则报错
// window.meta2d.register({
//   mytriangle1,
// });
// // 注册锚点函数
// window.meta2d.registerAnchors({
//   mytriangleAnchors1,
// });
const SWITCH_ATTR='checked';
const COLOR_ATTR='onColor';
function click(pen) {
  if (pen.disable) {
    return;
  }
  if(pen.properties && Array.isArray(pen.properties.extend)){
    const index = pen.properties.extend.findIndex(el=>el.attr === SWITCH_ATTR);
    if(index !== -1){
      pen.properties.extend[index].value = !pen.properties.extend[index].value;
    }
  }
  pen.calculative.canvas.store.emitter.emit('valueUpdate', pen);
  pen.calculative.canvas.render();
}

// 1.编写图形绘画函数
window.le5leSwitch1 = function(ctx, pen) {
  if(!pen)return;
  if (!pen.onClick) {
    pen.onClick = click;
  }
  let x = pen.calculative.worldRect.x;
  let y = pen.calculative.worldRect.y;
  let w = pen.calculative.worldRect.width;
  let h = pen.calculative.worldRect.height;
  if (w < h * 1.5) {
    w = 1.5 * h;
  }
  ctx.beginPath();
  ctx.arc(x + h / 2, y + h / 2, h / 2, Math.PI / 2, (Math.PI * 3) / 2);
  ctx.lineTo(x + w - h / 2, y);
  ctx.arc(x + w - h / 2, y + h / 2, h / 2, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(x + h / 2, y + h);
  if(pen.properties && Array.isArray(pen.properties.extend)){
    const index = pen.properties.extend.findIndex(el=>el.attr === SWITCH_ATTR);
    if(index !== -1){
      if(pen.properties.extend[index].value){
        const oIndex = pen.properties.extend.findIndex(el=>el.attr === COLOR_ATTR);
        if(oIndex !== -1){
          ctx.fillStyle = pen.properties.extend[oIndex].value;
        }
        if (pen.disable) {
          ctx.fillStyle = pen.disableOnColor;
        }
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.moveTo(x + h * 2, y + h / 2);
        ctx.arc(
          x + w - h / 2,
          y + h / 2,
          h / 2 > 2 ? h / 2 - 2 : 1,
          0,
          Math.PI * 2
        );
    
        ctx.fill();
      }else{
        ctx.fillStyle = pen.offColor;
        if (pen.disable) {
          ctx.fillStyle = pen.disableOffColor;
        }
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.moveTo(x + h, y + h / 2);
        ctx.arc(x + h / 2, y + h / 2, h / 2 > 2 ? h / 2 - 2 : 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.closePath();
}
// window.le5leSwitch1 = le5leSwitch1;
// 注意: 记得每个函数和语句的结束加上分号
// 2.注册绘制函数，请确保此js加载的时机meta2d实例对象已经存在，否则报错
// window.meta2d.registerCanvasDraw({
//   le5leSwitch1,
// });
// 3.如果有锚点函数，則注册锚点函数
// window.meta2d.registerAnchors({
//   mytriangleAnchors1,
// });
