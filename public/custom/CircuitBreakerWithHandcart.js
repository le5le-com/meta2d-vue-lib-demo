// 带手车的断路器 CircuitBreakerWithHandcart

// js原代码
window.CircuitBreakerWithHandcart = function (pen, ctx) {
  console.log("CircuitBreakerWithHandcart");
  const path = !ctx ? new Path2D() : ctx;
  const { properties } = pen;
  const { x, y, width, height } = pen.calculative.worldRect;
  let value = 0; // 此处应是defaultValue
  if (Array.isArray(properties.extend)) {
    properties.extend.forEach((el) => {
      if (el.attr === 'CircuitBreakerWithHandcartSwitchStatus') {
        value = el.value ? 1 : 0;
      }
    });
  }
  path.moveTo(x + width / 2, y);
  path.lineTo(x + width / 2, y + (1 / 4) * height);
  path.lineTo(x + width / 2 - 8, y + (1 / 4) * height + 8);
  path.lineTo(x + width / 2, y + (1 / 4) * height);
  path.lineTo(x + width / 2 + 8, y + (1 / 4) * height + 8);
  path.lineTo(x + width / 2, y + (1 / 4) * height);
  path.closePath();

  path.moveTo(x + width / 2 - 8, y + (1 / 4) * height + 12);
  path.lineTo(x + width / 2, y + (1 / 4) * height + 4);
  path.lineTo(x + width / 2 + 8, y + (1 / 4) * height + 12);
  path.lineTo(x + width / 2, y + (1 / 4) * height + 4);
  path.closePath();

  path.moveTo(x + width / 2, y + (1 / 4) * height + 4);
  path.lineTo(x + width / 2, y + (1 / 4) * height + 14);
  path.lineTo(x + width / 2 - 3, y + (1 / 4) * height + 17);
  path.lineTo(x + width / 2, y + (1 / 4) * height + 14);
  path.lineTo(x + width / 2 - 3, y + (1 / 4) * height + 11);
  path.lineTo(x + width / 2, y + (1 / 4) * height + 14);
  path.lineTo(x + width / 2 + 3, y + (1 / 4) * height + 17);
  path.lineTo(x + width / 2, y + (1 / 4) * height + 14);
  path.lineTo(x + width / 2 + 3, y + (1 / 4) * height + 11);
  path.lineTo(x + width / 2, y + (1 / 4) * height + 14);
  path.closePath();

  path.moveTo(x + width / 2, y + height);
  path.lineTo(x + width / 2, y + (3 / 4) * height);
  path.lineTo(x + width / 2 - 8, y + (3 / 4) * height - 8);
  path.lineTo(x + width / 2, y + (3 / 4) * height);
  path.lineTo(x + width / 2 + 8, y + (3 / 4) * height - 8);
  path.lineTo(x + width / 2, y + (3 / 4) * height);
  path.closePath();

  path.moveTo(x + width / 2 - 8, y + (3 / 4) * height - 12);
  path.lineTo(x + width / 2, y + (3 / 4) * height - 4);
  path.lineTo(x + width / 2 + 8, y + (3 / 4) * height - 12);
  path.lineTo(x + width / 2, y + (3 / 4) * height - 4);
  path.closePath();
  console.log(value,'value');
  if (value === 0) {
    path.moveTo(x + width / 2, y + (3 / 4) * height - 4);
    path.lineTo(x + width / 2, y + (3 / 4) * height - 18);
    path.lineTo(x + width / 2 - 10, y + (3 / 4) * height - 28);
    path.lineTo(x + width / 2, y + (3 / 4) * height - 18);
    path.closePath();
  } else {
    path.moveTo(x + width / 2, y + (3 / 4) * height - 4);
    path.lineTo(x + width / 2, y + (3 / 4) * height - 18);
    path.lineTo(x + width / 2, y + (1 / 4) * height + 14);
    path.closePath();
  }

  if (path instanceof Path2D) return path;
};
