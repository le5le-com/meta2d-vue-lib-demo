<template>
  <div class="project flex flex-col">
    <div
      class="top py-4 flex flex-col items-center overflow-auto mb-1 bg-[#fafafd]"
    >
      <div class="mb-2">
        <div class="font-bold">页面管理</div>
        <div class="cursor-pointer flex flex-col">
          <div class="mr-4" @click="handlePage">测试页面1</div>
        </div>
      </div>
      <div class="mb-2">
        <div class="font-bold">页面内图元管理</div>
        <div class="cursor-pointer" @click="handleDetail">测试页面1结构</div>
        <div class="h-[30vh] overflow-auto" v-if="showDetail">
          <!-- <Tree :items="items" :active-pens="activeArray" /> -->
        </div>
      </div>
      <div class="mb-2">
        <div class="font-bold">图片管理</div>
        <div class="thumb" :key="index" v-for="(menu, index) in list">
          <div
            class="center hover"
            :title="menu.name"
            :draggable="true"
            @dragstart="onDrag($event, menu, !!menu.svg)"
            @drag="drag($event)"
            @dragend="dragEnd()"
            @click.stop="onTouchstart($event, menu, !!menu.svg)"
            @touchstart.passive="onTouchstart($event, menu, !!menu.svg)"
          >
            <div class="flex items-center">
              <span>{{ menu.title }}</span>
              <img
                class="ml-4 w-10 h-10"
                v-if="menu.name === 'image'"
                :src="menu.data.image"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="font-bold">组件库管理</div>
        <div class="ml-2 font-semibold">1.基本图元</div>
        <div>
          <div class="thumb" :key="index" v-for="(menu, index) in baseList">
            <div
              class="center hover"
              :title="menu.name"
              :draggable="true"
              @dragstart="onDrag($event, menu, !!menu.svg)"
              @drag="drag($event)"
              @dragend="dragEnd()"
              @click.stop="onTouchstart($event, menu, !!menu.svg)"
              @touchstart.passive="onTouchstart($event, menu, !!menu.svg)"
            >
              <i v-if="menu.icon" class="icon-size" :class="menu.icon"></i>
            </div>
          </div>
        </div>
        <div class="ml-2 font-semibold">2.自定义图元</div>
        <div class="thumb" :key="index" v-for="(menu, index) in customList">
          <div
            class="center hover"
            :title="menu.name"
            :draggable="true"
            @dragstart="onDrag($event, menu, !!menu.svg)"
            @drag="drag($event)"
            @dragend="dragEnd()"
            @click.stop="onTouchstart($event, menu, !!menu.svg)"
            @touchstart.passive="onTouchstart($event, menu, !!menu.svg)"
          >
            <div>
              <span class="mr-4">{{ menu.name }}</span>
              <img class="ml-4 w-10 h-10" :src="menu.image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom bg-[#fafafd]"></div>
  </div>
</template>
<script lang="js" setup>
import {
  ref,
  onMounted,
  onUnmounted,
} from 'vue';
// import { deepClone, LockState, Pen, Meta2d } from '@meta2d/core';
// import Tree from './common/Tree.vue';
import {
  isGif,
  format,
} from './utils';
import axios from 'axios';



// 自定义图元的枚举类型
const CustomType ={
  CANVAS: 'canvas',
  DOM: 'dom',
  PATH2D: 'path2d',
}

const showDetail = ref(false);
const activeArray = ref([]);
const customList = ref([]);
const baseList = ref([
  {
    name: 'square',
    icon: 't-icon t-rect',
    id: 1,
    data: {
      text: '正方形',
      width: 100,
      height: 100,
      name: 'square',
      form: [
        {
          key: 'text',
          type: 'text',
          name: '文本',
        },
      ],
    },
  },
  {
    name: 'rectangle',
    icon: 't-icon t-rectangle',
    id: 2,
    data: {
      text: '圆角矩形',
      width: 200,
      height: 50,
      borderRadius: 0.1,
      name: 'rectangle',
    },
  },
  {
    name: 'circle',
    icon: 't-icon t-circle',
    id: 3,
    data: {
      text: '圆',
      width: 100,
      height: 100,
      name: 'circle',
    },
  },
  {
    name: 'triangle',
    icon: 't-icon t-triangle',
    id: 4,
    data: {
      text: '三角形',
      width: 100,
      height: 100,
      name: 'triangle',
    },
  },
  {
    name: 'diamond',
    icon: 't-icon t-diamond',
    id: 5,
    data: {
      text: '菱形',
      width: 100,
      height: 100,
      name: 'diamond',
    },
  },
]);
const list = ref([
  {
    name: 'image',
    icon: 't-icon t-image',
    id: 17,
    title: 'png',
    data: {
      text: '',
      width: 100,
      height: 100,
      name: 'image',
      image: '/img/logo.png',
    },
  },
  {
    name: 'image',
    icon: 't-icon t-image',
    id: 18,
    title: 'svg',
    data: {
      text: '',
      width: 100,
      height: 100,
      name: 'image',
      image: '/png/turbine.svg',
    },
  },
  {
    name: 'image',
    icon: 't-icon t-image',
    id: 18,
    title: 'jpg',
    data: {
      text: '',
      width: 100,
      height: 100,
      name: 'image',
      image: '/png/light.jpg',
    },
  },
  {
    name: 'image',
    icon: 't-icon t-image',
    id: 18,
    title: 'gif',
    data: {
      text: '',
      width: 100,
      height: 100,
      name: 'gif',
      image: '/png/tyndcb.gif',
    },
  },
]);
const items = ref([]);

onMounted(async () => {
  const res = await Promise.all(
    ["canvas","dom","path2d"].map((el) => {
      return axios.get(`/custom/${el}.json`);
    })
  );
  const datas = res.map(el=>el.data);
  const list = [];
  for (let i = 0; i < datas.length; i++) {
    const el = datas[i];
    console.log(el,11);
    // 将自定义图元的json数据的properties数组转换成extend数组
    const extend = getExtendByProperties(el.properties);
    let obj = {
      name: el.name,
      image: el.image,
      data: {
        name: el.name,
        width: el.width,
        height: el.height,
        properties: {
          extend,
        },
        databindings: [],
        interactions: [],
        animations: [],
      },
    };
    list.push(obj);
    try {
      // 注册自定义图形，传入自定义图元名称，绘制函数字符串，绘制类型
      registerCustomShape({ jsStr: el.js, name: el.name, type: el.type });
    } catch (error) {
      // 注册失败，捕捉异常出错信息
      console.log('err', error);
    }
  }
  customList.value = list;

  //拖拽开始
  document.addEventListener('dragstart', dragstart, false);
  //拖拽结束
  document.addEventListener('dragend', dragend, false);
});

onUnmounted(() => {
  document.removeEventListener('dragstart', dragstart);
  document.removeEventListener('dragend', dragend);
});
/**
 * desc: 根据自定义图元的properties数组生成extend数组
 * param: CustomProperties Array
 * return: PropertiesExtend Array
 */
const getExtendByProperties = (properties) => {
  const extendList = [];
  for (let i = 0; i < properties.length; i++) {
    const el = properties[i];
    const obj = Object.assign(el, { desc: '', value: el.defaultValue });
    delete obj.defaultValue;
    extendList.push(obj);
  }
  return extendList;
};

/**
 * desc: 注册自定义图形
 * param: el[object]-参数对象
 * param: el.jsStr[string]-绘制js字符串(请通过在线网站手动压缩或者通过npm包将js代码块压缩成一行)
 * param: el.name[string]-自定义图元的名称(请确保唯一性，且名称要与绘制函数的名称相同)
 * param: el.type[string]-绘制的图元类型(3种方式，canvas,dom,path2d)
 * return: 无返回值
 */
const registerCustomShape = (el) => {
  try {
    const fn = new Function(el.jsStr);
    fn();
    if (el.type === CustomType.CANVAS) {
      meta2d.registerCanvasDraw({
        [el.name]: window[el.name],
      });
    } else if (el.type === CustomType.PATH2D) {
      meta2d.register({
        [el.name]: window[el.name],
      });
    } else if (el.type === CustomType.DOM) {
      meta2d.register({
        [el.name]: window[el.name],
      });
    }
  } catch (err) {
    throw err;
  }
};
const handlePage = async () => {
  const data = await axios.get('/mock/test-3.json');
  console.log('data',data);
  // 打开页面，调用openWithCache函数
  meta2d.openWithCache(data.data, true, true);
};
const handleDetail = () => {
  // 获取当前页面的所有图元数据
  const lis = getPensInPage();
  items.value = lis;
  showDetail.value = true;
};
/**
 * desc: 获取当前在画布渲染的页面内的图元数据
 * param: 无
 * return: 节点树(对象数组)-页面内的所有图元的数组数据
 * 返回的数组的对象说明:
 * {
      id: pen.id,--节点id
      type: pen.type,--节点类型
      name: pen.name,--节点名称
      description: (pen as any).description, --节点描述，业务字段
      locked: pen.locked, --节点是否锁定，true-锁定节点，false-解锁节点
      visible: pen.visible,--节点是否显示，true-显示节点，false-因此节点
      children, -- 节点树的children，children的数据结构跟当前对象相同
      opened: false, --节点是否展开的属性，业务属性 
    }
 */
const getPensInPage = () => {
  const outerPens = meta2d.store.data.pens.filter((pen) => !pen.parentId);
  const pens = format(outerPens);
  return pens.reverse();
};
const onDrag = async (
  event,
  node,
  fn,
  folderId
) => {
  if (!node || !event.dataTransfer) {
    return;
  }
  meta2d.canvas.addCaches = undefined;
  // if (node.id && !node.componentDatas) {
  //   let ret: any = await axios.post(`/data/le5le2d-components/get`, {
  //     id: node.id,
  //   });
  //   node.componentDatas = ret.componentDatas;
  //   node.componentData = ret.componentData;
  //   node.fullname = ret.fullname;
  //   node.data = ret.data;
  //   node.component = true;
  //   if (ret.paths) {
  //     Object.assign(meta2d.store.data.paths, ret.paths);
  //   }
  // }
  if (fn) {
    event.dataTransfer.setData(
      'Meta2d',
      JSON.stringify({
        name: node.fullname,
        width: 100,
        height: (100 * node.data.rect.height) / node.data.rect.width,
      })
    );
  } else if (node.component) {
    if (node.componentDatas) {
      // 新版本组件存在 componentDatas 里了
      // event.dataTransfer.setData(
      //   'Meta2d',
      //   JSON.stringify(node.componentDatas)
      // );
      meta2d.canvas.addCaches = SON.parse(JSON.stringify(node.componentDatas));
    } else if (node.componentData) {
      // 老版本组件
      // const pens = convertPen([node.componentData]);
      // // event.dataTransfer.setData('Meta2d', JSON.stringify(pens));
      // meta2d.canvas.addCaches = deepClone(pens);
    }
  } else if (!node.data && !node.componentData && node.image) {
    let target = event.target;
    target.children[0] && (target = target.children[0]);
    // firefox naturalWidth svg 图片 可能是 0
    const normalWidth = target.naturalWidth || target.width;
    const normalHeight = target.naturalHeight || target.height;
    const [name, lockedOnCombine] = isGif(node.image)
      ? ['gif', 0]
      : ['image', undefined];
    event.dataTransfer.setData(
      'Meta2d',
      JSON.stringify({
        name,
        width: 100,
        height: 100 * (normalHeight / normalWidth),
        image: node.image,
        imageRatio: true,
        lockedOnCombine,
      })
    );
  } else {
    event.dataTransfer.setData(
      'Meta2d',
      JSON.stringify(node.componentData || node.data)
    );
  }
  const pen = {
    name: 'text', // name 为上面表格中name
    text: '',
    x: -999999,
    y: -999999,
    width: 20,
    height: 20,
    tags: ['drag'],
  };
  meta2d.addPen(pen, false, false);
  meta2d.active([pen]);
  meta2d.canvas.initMovingPens(); //.movingPens = deepClone(meta2d.store.active, true);  //initMovingPens();
  meta2d.canvas.mouseDown = {
    x: -999999,
    y: -999999,
  };
  meta2d.canvas.initActiveRect = {
    x: -999999,
    y: -999999,
    ex: 0,
    ey: 0,
    height: 20,
    rotate: 0,
    width: 20,
  };
  if (!meta2d.canvas.dock) {
    meta2d.canvas.dock = { xDock: 0, yDock: 0 };
    return;
  }
};
const drag = (e) => {
  if (!meta2d.canvas.movingPens) {
    return;
  }
  if (!meta2d.canvas.dock) {
    meta2d.canvas.dock = { xDock: 0, yDock: 0 };
    return;
  }
  setTimeout(() => {
    if (
      meta2d.canvas.movingPens &&
      meta2d.canvas.movingPens[0].tags &&
      meta2d.canvas.movingPens[0].tags[0] === 'drag'
    ) {
      let newE = {
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        x: e.clientX - 210,
        y: e.clientY - 60,
      };
      meta2d.canvas.movePens(newE);
    }
  }, 1);
};
const dragEnd = () => {
  meta2d.delete(meta2d.find('drag'), true, false);
  meta2d.canvas.movingPens = undefined;
  let newPen = meta2d.store.data.pens.filter((pen) => !pen.parentId).slice(-1);
  meta2d.active(newPen);
};
const onTouchstart = async (
  event,
  node,
  fn,
  folderId
) => {
  if (!node) {
    return;
  }
  if (fn) {
    meta2d.canvas.addCaches = SON.parse(JSON.stringify([
      {
        name: node.fullname,
        width: 100,
        height: (100 * node.data.rect.height) / node.data.rect.width,
      },
    ]));
  } else if (node.component) {
    if (node.componentDatas) {
      // 新版本组件存在 componentDatas 里了
      meta2d.canvas.addCaches = SON.parse(JSON.stringify(node.componentDatas));
    } else {
      // 老版本组件
      // const pens = convertPen([node.componentData]);
      // meta2d.canvas.addCaches = deepClone(pens);
    }
  } else if (!node.data && !node.componentData && node.image) {
    let target = event.target;
    target.children[0] && (target = target.children[0]);
    const normalWidth = target.naturalWidth || target.width;
    const normalHeight = target.naturalHeight || target.height;
    const [name, lockedOnCombine] = isGif(node.image)
      ? ['gif', 0]
      : ['image', undefined];
    meta2d.canvas.addCaches = SON.parse(JSON.stringify([
      {
        name,
        width: 100,
        height: 100 * (normalHeight / normalWidth),
        image: node.image,
        imageRatio: true,
        lockedOnCombine,
      },
    ]));
  } else {
    meta2d.canvas.addCaches = JSON.parse(JSON.stringify([node.componentData || node.data]));
  }
};

const dragstart = (event) => {
  (event.target).style.opacity = 0.5;
};

const dragend = (event) => {
  (event.target).style.opacity = 1;
};
</script>

<style>
.project {
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
}

.project .top,
.project .bottom{
  flex: 1;
  border: 1px solid #ddd;
}
</style>