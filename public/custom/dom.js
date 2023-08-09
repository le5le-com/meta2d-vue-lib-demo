const iframes = {};
const URL_ATTR = 'iframe';
function destory(pen) {
  iframes[pen.id].remove();
  iframes[pen.id] = undefined;
}

function move(pen) {
  if (!iframes[pen.id]) {
    return;
  }
  let url = '';
  if (pen.properties && Array.isArray(pen.properties.extend)) {
    const index = pen.properties.extend.findIndex((el) => el.attr === URL_ATTR);
    if (index !== -1) {
      url = pen.properties.extend[index].value;
    }
  }
  window.meta2d.setElemPosition(pen, iframes[pen.id]);
  if (iframes[pen.id].getAttribute('src') !== url) {
    iframes[pen.id].src = url;
  }
}

function changeId(pen, oldId, newId) {
  if (!iframes[oldId]) {
    return;
  }
  iframes[newId] = iframes[oldId];
  delete iframes[oldId];
}

window.iframe1 = function (pen) {
  if (!pen.onDestroy) {
    pen.onDestroy = destory;
    pen.onMove = move;
    pen.onResize = move;
    pen.onRotate = move;
    pen.onValue = move;
    pen.onChangeId = changeId;
  }
  let url = '';
  if (pen.properties && Array.isArray(pen.properties.extend)) {
    const index = pen.properties.extend.findIndex((el) => el.attr === URL_ATTR);
    if (index !== -1) {
      url = pen.properties.extend[index].value;
    }
  }
  if (!iframes[pen.id]) {
    const iframe = document.createElement(URL_ATTR);
    console.log('create',pen.id,iframes);
    iframe.scrolling = pen.scrolling || 'no';
    iframe.frameBorder = '0';
    iframe.src = url;
    iframes[pen.id] = iframe;
    pen.calculative.iframe = url;
    pen.calculative.canvas.externalElements?.parentElement.appendChild(iframe);
    window.meta2d.setElemPosition(pen, iframe);
  } else if (iframes[pen.id].getAttribute('src') !== url) {
    iframes[pen.id].src = url;
    pen.calculative.iframe = url;
  }

  if (pen.calculative.patchFlags) {
    window.meta2d.setElemPosition(pen, iframes[pen.id]);
  }
  return new Path2D();
};
// 注意: 记得每个函数和语句的结束加上分号
// 3.注册绘制函数，请确保此js加载的时机meta2d实例对象已经存在，否则报错
// window.meta2d.register({
//   iframe1
// });
