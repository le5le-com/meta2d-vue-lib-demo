/**
 * 判断是否是 gif 图片
 */
export function isGif(url) {
  return url.endsWith('.gif');
}


export function format(pens) {
  const result = [];
  pens.forEach((pen) => {
    let children = null;
    if (pen.children && pen.children.length > 0) {
      // 找到所有的孩子 pens
      children = [];
      for (const child of pen.children) {
        children.push(...format(meta2d.find(child)));
      }

      if (children && !children.length) {
        children = null;
      }
    }

    result.push({
      id: pen.id,
      type: pen.type,
      name: pen.name,
      description: pen.description, // 业务字段
      locked: pen.locked,
      visible: pen.visible,
      children,
      opened: false,
    });
  });

  return result;
}


// localForage 存储为保存的图纸 key
export const localMeta2dDataName = 'meta2dData';

/**
 * 正常的 assign 操作，是存在弊端的，
 * 若源对象存在该属性，但目标对象不存在该属性（不存在并非 undefined），则会导致无法覆盖
 * 该方法会把源对象的属性全部清空，然后再把目标对象的属性覆盖到源对象上
 * source 可能是个监听的对象，所有最后一步再更改它的属性值
 * @param source 原对象
 * @param target 目标对象
 */
export function strictAssign(
  source,
  target
) {
  // source 的全部属性都是 undefined 的对象，而非没有这个属性
  const undefinedSource = {};
  Object.keys(source).forEach((key) => {
    undefinedSource[key] = undefined;
  });
  Object.assign(undefinedSource, target);
  Object.assign(source, undefinedSource);
}
