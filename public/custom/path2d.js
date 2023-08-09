const X_ATTR = "offsetX";
window.cloud1 =function(pen, ctx) {
  const path = !ctx ? new Path2D() : ctx;
  const { x, y, width, height } = pen.calculative.worldRect;

  path.moveTo(x + width / 5, y + (height * 13) / 16);
  let offset = 0;
  if (pen.properties && Array.isArray(pen.properties.extend)) {
    const index = pen.properties.extend.findIndex(
      (el) => el.attr === X_ATTR
    );
    if (index !== -1) {
      offset = pen.properties.extend[index].value;
    }
  }
  path.bezierCurveTo(
    x +offset- width / 15,
    y + (height * 13) / 16,
    x +offset- width / 15,
    y + (height * 7) / 16,
    x +offset+ width / 5,
    y + (height * 7) / 16
  );
  path.bezierCurveTo(
    x +offset+ width / 5,
    y,
    x +offset+ (width * 4) / 5,
    y,
    x +offset+ (width * 4) / 5,
    y + (height * 7) / 16
  );
  path.bezierCurveTo(
    x +offset+ (width * 16) / 15,
    y + (height * 7) / 16,
    x +offset+ (width * 16) / 15,
    y + (height * 13) / 16,
    x +offset+ (width * 4) / 5,
    y + (height * 13) / 16
  );
  path.closePath();
  if (path instanceof Path2D) return path;
};
// 注意: 记得每个函数和语句的结束加上分号
// 3.注册绘制函数，请确保此js加载的时机meta2d实例对象已经存在，否则报错
// window.meta2d.register({
//   cloud1
// });