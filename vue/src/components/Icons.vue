<script setup lang="ts">
import { nextTick, ref } from "vue";
import { icons } from "../utils/data";
import axios from "axios";
import { parseSvg } from "@meta2d/svg";
// import { pointInRect } from '@meta2d/core';
import type { TabsPaneContext } from "element-plus";
import { onMounted, onUnmounted } from "vue";
import { MqttClient } from "mqtt";

//鼠标点击切换右边菜单
const lengthx = ref();
const pricex = ref();
const penX = ref();
const penXX = ref();
const penY = ref();
const penWidth = ref();
const penHeight = ref();
const contrasta = ref(false);
const penRotate = ref();
const penScheduledata = ref();

const updateMouse = (e: MouseEvent) => {
  lengthx.value = meta2d.store.active.length;
  pricex.value = meta2d.store.active;
  penXX.value = meta2d.getPenRect(pricex.value[0]);

  //设置回显
  penX.value = penXX.value.x;
  penY.value = penXX.value.y;
  penWidth.value = penXX.value.width;
  penHeight.value = penXX.value.height;
  penRotate.value = pricex.value[0].rotate;
  penScheduledata.value = pricex.value[0].progress;
  penFillet.value = pricex.value[0].borderRadius;
  lockAspectRatio.value = pricex.value[0].radio;
  VerticalProgress.value = pricex.value[0].verticalProgress;
  flipHorizontal.value = pricex.value[0].flipX;
  flipVertical.value = pricex.value[0].flipY;
  pencolordata.value = pricex.value[0].color;
  penScheduleColor.value = pricex.value[0].progressColor;
  penhoverColordata.value = pricex.value[0].hoverColor;
  penactiveColordata.value = pricex.value[0].activeColor;
  backgrounddata.value = pricex.value[0].background;
  hoverBackgrounddata.value = pricex.value[0].hoverBackground;
  activeBackgrounddata.value = pricex.value[0].activeBackground;
  anchorColordata.value = pricex.value[0].anchorColor;
  textColordata.value = pricex.value[0].textColor;
  hoverTextColordata.value = pricex.value[0].hoverTextColor;
  activeTextColordata.value = pricex.value[0].activeTextColor;
  textBackgrounddata.value = pricex.value[0].textBackground;
  const booleantextBold = pricex.value[0].fontWeight;
  if (booleantextBold === 700) {
    textBold.value = true;
  } else if (booleantextBold === 400) {
    textBold.value = false;
  }
  horizontalOffset.value = pricex.value[0].textLeft;
  verticalOffset.value = pricex.value[0].textTop;
  textareadata.value = pricex.value[0].text;
  cyclesNumber.value = pricex.value[0].animateCycle;
  autoPlaydata.value = pricex.value[0].autoPlay;
  console.log(pricex.value[0]);

  penid.value = pricex.value[0].id;
};
onMounted(() => {
  document.addEventListener("click", updateMouse);
});
onUnmounted(() => {
  document.removeEventListener("click", updateMouse);
});

//网格开关
const gridvalue = ref(false);
//标尺开关
const rulevalue = ref(false);
//自动生成Client ID开关
const generateID = ref(false);
//背景颜色
const backgroundcolor = ref();
//网格颜色
const gridcoloro = ref();
//标尺颜色
const rulecolor = ref();
//网格大小
const gridsize = ref();
//网格角度
const gridrotate = ref();
//布局大小
const layoutwidth = ref(undefined);
//布局间隔
const spacing = ref();
//tabs默认显示栏位
const activeName = ref("first");
//锁定宽高比
const lockAspectRatio = ref(false);
//垂直进度
const VerticalProgress = ref(false);
//水平翻转
const flipHorizontal = ref(false);
//垂直翻转
const flipVertical = ref(false);
//输入框
const InputBox = ref(false);
//图形X轴
// const penX = ref();
//mqtt路径
const mqtturl = ref("");
//mqttid
const mqttClientid = ref("");
//mqtt用户名
const mqttusername = ref();
//mqtt密码
const mqttpassword = ref();
const mqttTopics = ref("");
//透明度
const transparency = ref();
//画笔文本加粗
const textBold = ref(false);

const rowHeight = ref();

const horizontalOffset = ref();

const verticalOffset = ref();

const penid = ref();

const mqttconnect = () => {
  let params = {
    mqtt: mqtturl,
    mqttTopics: mqttTopics,
    mqttOptions: {
      clientId: mqttClientid,
      username: mqttusername,
      password: mqttpassword,
      customClientId: false,
    },
  };
  console.log(params);

  meta2d.connectMqtt(params);
};

const breakmqtt = () => {
  meta2d.closeMqtt();
};

//折叠面板默认打开的栏位
const activeNameone = ref(["1", "2"]);
const activeNametwo = ref(["1", "2"]);
const activeNamethere = ref(["1"]);
const activeNamefour = ref(["1", "2", "3", "4", "5", "6"]);
const activeNamefive = ref([]);
const activeNamesix = ref(["1", "2"]);
const activeNameseven = ref(["1", "2"]);
const activeNameEvent = ref(["1"]);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

//网格开关
const gridb = () => {
  if (gridvalue.value === false) {
    meta2d.setGrid({
      grid: false,
    });
    meta2d.render();
  } else {
    meta2d.setGrid({
      grid: true,
      gridColor: gridcoloro.value,
      gridSize: gridsize.value,
      gridRotate: gridrotate.value,
    });
    meta2d.render();
  }
};

//网格颜色
const gridcoloroevent = () => {
  meta2d.setGrid({
    gridColor: gridcoloro.value,
  });
  meta2d.render();
};

//背景颜色
const backgroundcolorevent = () => {
  meta2d.setBackgroundColor(backgroundcolor.value);
  meta2d.render();
};

//标尺
const ruled = () => {
  if (rulevalue.value === false) {
    meta2d.setRule({
      rule: false,
    });
    meta2d.render();
  } else {
    meta2d.setRule({
      rule: true,
    });
    meta2d.render();
  }
};

//标尺颜色
const rulecolorevent = () => {
  meta2d.setRule({
    ruleColor: rulecolor.value,
  });
  meta2d.render();
};

//布局
const startlayout = () => {
  let width: number = layoutwidth.value;
  let spac: number = spacing.value;

  meta2d.layout(undefined, width, spac);
};
//锁定宽高比
const lockAspectRatiob = () => {
  if (lockAspectRatio.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      radio: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      radio: false,
    });
  }
};
//垂直进度
const VerticalProgressswitch = () => {
  if (VerticalProgress.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      verticalProgress: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      verticalProgress: false,
    });
  }
};
//水平翻转
const flipHorizontalswitch = () => {
  if (flipHorizontal.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      flipX: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      flipX: false,
    });
  }
};
//垂直翻转
const flipVerticalswitch = () => {
  if (flipVertical.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      flipY: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      flipY: false,
    });
  }
};

const penFillet = ref();
const lineWidthdata = ref("");
const anchorRadiusdata = ref();
const shadowBlur = ref();
const shadowX = ref();
const shadowY = ref();
const characterSize = ref();
const characterWidth = ref();
const characterHeight = ref();
//输入框失去焦点触发
const updateData = () => {
  let X = penX.value;
  let Y = penY.value;
  let w = penWidth.value;
  let h = penHeight.value;
  console.log(X, Y, w, h);

  meta2d.setPenRect(pricex.value[0], { x: X, y: Y, width: w, height: h });
  meta2d.setValue({
    id: pricex.value[0].id,
    borderRadius: penFillet.value,
    globalAlpha: transparency.value,
    // lineWidth:lineWidthdata.value,
  });
  if (
    pricex.value[0].globalAlpha === "" ||
    pricex.value[0].globalAlpha === null
  ) {
    meta2d.setValue({
      id: pricex.value[0].id,
      globalAlpha: "1",
    });
  }

  // if(pricex.value[0].lineWidth === '' || pricex.value[0].lineWidth === null){
  //   meta2d.setValue({
  //   id:pricex.value[0].id,
  //   lineWidth:"1"
  // })
  // }
  console.log("penX", penX.value);

  console.log("更新数据", penX.value, penXX.value);
  meta2d.inactive();
};

// const updatepenFillet =()=>{
//   meta2d.setValue({
//         id:pricex.value[0].id,
//         borderRadius:penFillet.value,
//       })
// }

// const updatetransparency =()=>{
//   meta2d.setValue({
//         id:pricex.value[0].id,
//         globalAlpha:transparency.value,
//       })

//       if(pricex.value[0].globalAlpha === '' || pricex.value[0].globalAlpha === null){
//         meta2d.setValue({
//         id:pricex.value[0].id,
//         globalAlpha:"1"
//       })
//       }
// }

const updatelineWidthdata = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    lineWidth: lineWidthdata.value,
  });
  if (pricex.value[0].lineWidth === "" || pricex.value[0].lineWidth === null) {
    meta2d.setValue({
      id: pricex.value[0].id,
      lineWidth: "1",
    });
  }
};

const updateanchorRadiusdata = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    anchorRadius: anchorRadiusdata.value,
  });
};

const updateshadowBlur = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    shadowBlur: shadowBlur.value,
  });
};

const updateshadowX = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    shadowOffsetX: shadowX.value,
  });
};

const updateshadowY = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    shadowOffsetY: shadowY.value,
  });
};

const updatecharacterSize = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    fontSize: characterSize.value,
  });
};

const updatecharacterWidth = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    textWidth: characterWidth.value,
  });
};

const updatecharacterHeight = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    textHeight: characterHeight.value,
  });
};

const updatelineHeight = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    lineHeight: rowHeight.value,
  });
};

//进度
const scheduledata = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    progress: penScheduledata.value,
  });
};

//拖动时触发
const onDragStart = (e: any, data) => {
  e.dataTransfer.setData("Meta2d", JSON.stringify(data));
};
//拖动释放触发
const ondragend = (e: any, data) => {
  e.dataTransfer.setData("Meta2d", JSON.stringify(data));
  pricex.value = meta2d.store.active;
  penXX.value = meta2d.getPenRect(pricex.value[0]);
  penX.value = penXX.value.x;
  penY.value = penXX.value.y;
  penWidth.value = penXX.value.width;
  penHeight.value = penXX.value.height;
};

//旋转
const penRotatedata = () => {
  console.log("查看旋转属性", penRotate.value, penXX.value);
  if (penRotate.value != pricex.value[0].rotate)
    meta2d.setValue({
      id: pricex.value[0].id,
      rotate: penRotate.value,
    });
  console.log("旋转修改", pricex.value[0]);
};

nextTick(() => {
  // 此处只注册，未将数据放置到工具栏
  // data.ts 中配置的最后一项即为该图形库中的内容
  (window as any).registerToolsNew();
  // (window as any).meta2dTools = undefined;
});

//图形颜色
const pencolordata = ref();
const pencolor = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    color: pencolordata.value,
  });
};

//进度颜色
const penScheduleColor = ref();
const uppenScheduleColor = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    progressColor: penScheduleColor.value,
  });
};
//浮动颜色
const penhoverColordata = ref();
const penhoverColor = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    hoverColor: penhoverColordata.value,
  });
};

//选中颜色
const penactiveColordata = ref();
const penactiveColor = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    activeColor: penactiveColordata.value,
  });
};
//背景颜色
const backgrounddata = ref();
const backgroundco = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    background: backgrounddata.value,
  });
};

//浮动背景颜色
const hoverBackgrounddata = ref();
const hoverBackgroundco = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    hoverBackground: hoverBackgrounddata.value,
  });
};
//选中背景颜色
const activeBackgrounddata = ref();
const activeBackgroundco = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    activeBackground: activeBackgrounddata.value,
  });
};
//锚点颜色
const anchorColordata = ref();
const anchorColorpi = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    anchorColor: anchorColordata.value,
  });
};
//阴影颜色
const shadowColordata = ref();
const shadowColordatapi = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    shadowColor: shadowColordata.value,
  });
};

//文本颜色
const textColordata = ref();
const textColorpi = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    textColor: textColordata.value,
  });
};
//文本浮动颜色
const hoverTextColordata = ref();
const hoverTextColorpi = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    hoverTextColor: hoverTextColordata.value,
  });
};
//文本选中颜色
const activeTextColordata = ref();
const activeTextColorpi = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    activeTextColor: activeTextColordata.value,
  });
};
//文本背景颜色
const textBackgrounddata = ref();
const textBackgroundpi = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    textBackground: textBackgrounddata.value,
  });
};

const updatetextLeft = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    textLeft: horizontalOffset.value,
  });
};

const updatetextTop = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    textTop: verticalOffset.value,
  });
};

const textomit = ref(false);
const omit = () => {
  if (textomit.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      ellipsis: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      ellipsis: false,
    });
  }
};

const textBoldcl = () => {
  if (textBold.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      fontWeight: 700,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      fontWeight: 400,
    });
  }
};

const hiddenTextdata = ref(false);
const hiddenTextsw = () => {
  if (hiddenTextdata.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      hiddenText: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      hiddenText: false,
    });
  }
};

const textareadata = ref();
const textarea = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    text: textareadata.value,
  });
};

const retainDecimalsdata = ref();
const retainDecimals = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    keepDecimal: retainDecimalsdata.value,
  });
};

const inhibitInput = ref(false);
const inhibitInputsw = () => {
  if (inhibitInput.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableInput: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableInput: false,
    });
  }
};

const prohibitRotation = ref(false);
const prohibitRotationsw = () => {
  if (prohibitRotation.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableRotate: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableRotate: false,
    });
  }
};

const prohibitScaling = ref(false);
const prohibitScalingsw = () => {
  if (prohibitScaling.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableSize: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableSize: false,
    });
  }
};

const prohibitAnchor = ref(false);
const prohibitAnchorsw = () => {
  if (prohibitAnchor.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableAnchor: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      disableAnchor: false,
    });
  }
};
const value = ref("");
const animateOptions = [
  {
    value: 0,
    label: "上下跳动",
  },
  {
    value: 1,
    label: "左右跳动",
  },
  {
    value: 2,
    label: "左右偏移",
  },
  {
    value: 3,
    label: "心跳",
  },
  {
    value: 4,
    label: "成功",
  },
  {
    value: 5,
    label: "进度",
  },
];

const Linearplaybackvalue = ref("");
const Linearplayback = [
  {
    Linearplaybackvalue: 0,
    label: "是",
  },
  {
    Linearplaybackvalue: 1,
    label: "否",
  },
];

const animateSelect = (e) => {
  if (e == 0) {
    //上下跳动
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr = [
        ...arr,
        ...[
          {
            duration: 100,
            y: 20,
          },
          {
            duration: 100,
            y: -20,
          },
        ],
      ];
    }
    pricex.value[0].frames = arr;
  }
  if (e == 1) {
    //左右跳动
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr = [
        ...arr,
        ...[
          {
            duration: 100,
            x: 20,
          },
          {
            duration: 100,
            x: -20,
          },
        ],
      ];
    }
    pricex.value[0].frames = arr;
  }
  if (e == 2) {
    //左右跳动
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr = [
        ...arr,
        ...[
          {
            duration: 100,
            rotate: 20,
          },
          {
            duration: 200,
            rotate: -20,
          },
        ],
      ];
    }
    pricex.value[0].frames = arr;
  }
  if (e == 3) {
    //左右跳动
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr = [
        ...arr,
        ...[
          {
            duration: 500,
            scale: 0.8,
          },
          {
            duration: 1000,
            scale: 1.2,
          },
        ],
      ];
    }
    pricex.value[0].frames = arr;
  }
  if (e == 4) {
    //成功
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr = [
        ...arr,
        ...[
          {
            duration: 500,
            background: "green",
            globalAlpha: 0.1,
          },
          {
            duration: 1000,
            scale: 1.2,
          },
        ],
      ];
    }
    pricex.value[0].frames = arr;
  }
  if (e == 5) {
    //进度
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr = [
        ...arr,
        ...[
          {
            duration: 1000,
            progress: 0,
          },
          {
            duration: 2000,
            progress: 1,
          },
        ],
      ];
    }
    pricex.value[0].frames = arr;
  }
};

const PlayAnimation = () => {
  meta2d.startAnimate(pricex.value[0].id);
};

const PauseAnimation = () => {
  meta2d.pauseAnimate(pricex.value[0].id);
};

const StopAnimation = () => {
  meta2d.stopAnimate(pricex.value[0].id);
};

const cyclesNumber = ref(Infinity);
const cyclesNumberin = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    animateCycle: cyclesNumber.value,
  });
};

const nextAnimatedata = ref();
const nextAnimatein = () => {
  meta2d.setValue({
    id: pricex.value[0].id,
    nextAnimate: nextAnimatedata.value,
  });
};

const keepAnimateStatedata = ref(false);
const keepAnimateStatesw = () => {
  if (keepAnimateStatedata.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      keepAnimateState: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      keepAnimateState: false,
    });
  }
};

const autoPlaydata = ref(false);
const autoPlaydatasw = () => {
  if (autoPlaydata.value === true) {
    meta2d.setValue({
      id: pricex.value[0].id,
      autoPlay: true,
    });
  } else {
    meta2d.setValue({
      id: pricex.value[0].id,
      autoPlay: false,
    });
  }
};
let eventlist: any = [];

const addEvent = () => {
  eventlist.push({
    name: "",
    action: "",
    value: "",
    params: "",
    where: "",
  });
  pricex.value[0].events = eventlist;
  for (let i: number = 0; i < eventlist.length; i++) {
    console.log(eventlist[i]);
  }
};

const eventTypeList = [
  {
    value: "click",
    label: "单击",
  },
  {
    value: "dblclick",
    label: "双击",
  },
  {
    value: "enter",
    label: "鼠标进入",
  },
  {
    value: "leave",
    label: "鼠标离开",
  },
  {
    value: "active",
    label: "选中",
  },
  {
    value: "inactive",
    label: "取消选中",
  },
  {
    value: "mousedown",
    label: "鼠标按下",
  },
  {
    value: "mouseup",
    label: "鼠标抬起",
  },
  {
    value: "valueUpdate",
    label: "数据更新",
  },
];

const rIcons = ref(icons);
axios.get("/T型开关A -C.svg").then((res) => {
  const data = res.data;
  const pens = parseSvg(data);
  rIcons.value.push({
    svg: "/T型开关A -C.svg",
    title: "svg",
    data: pens,
  });
});
</script>

<template>
  <div class="aside">
    <div class="icon-list">
      <div
        v-for="icon in rIcons"
        draggable="true"
        @dragstart="onDragStart($event, icon.data)"
        @dragend="ondragend($event, icon.data)"
        :ondragstart="icon.title"
        style="width: 100px"
      >
        <i v-if="icon.key" class="iconfont" :class="`icon-${icon.key}`"></i>
        <img
          v-else-if="icon.svg"
          :src="icon.svg"
          alt=""
          srcset=""
          class="img"
        />
      </div>
    </div>
  </div>
  <div class="beyond" v-if="lengthx === 0">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <!-- 图纸 -->
      <el-tab-pane name="first" label="图纸" class="tab-pane">
        <el-collapse v-model="activeNameone">
          <el-collapse-item title="文件" name="1">
            <el-row>
              <el-col :span="12">文件名</el-col>
              <el-col :span="12">
                <el-input
                  v-model="input"
                  placeholder="文件名"
                  style="height: 25px"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">文件夹</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">分类</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="画布" name="2">
            <el-row>
              <el-col :span="12">背景网格</el-col>
              <el-col :span="12"
                ><el-switch v-model="gridvalue" @click="gridb"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">网格大小</el-col>
              <el-col :span="12">
                <el-input v-model="gridsize" placeholder="" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">网格角度</el-col>
              <el-col :span="12">
                <el-input v-model="gridrotate" placeholder=""
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">网格颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="gridcoloro"
                  @change="gridcoloroevent"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">默认颜色</el-col>
              <el-col :span="12"><el-color-picker v-model="color2" /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">背景颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="backgroundcolor"
                  @change="backgroundcolorevent"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">标尺</el-col>
              <el-col :span="12"
                ><el-switch v-model="rulevalue" @click="ruled"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">标尺颜色</el-col>
              <el-col :span="12"
                ><el-color-picker v-model="rulecolor" @change="rulecolorevent"
              /></el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <!-- 通信 -->
      <el-tab-pane label="通信" name="second">
        <div class="demo-collapse">
          <el-collapse v-model="activeNametwo">
            <el-collapse-item title="websocket" name="1">
              <el-input v-model="websocketurl" />
            </el-collapse-item>
            <el-collapse-item title="MQTT" name="2">
              <el-row>
                <el-col :span="12"> URL地址 </el-col>
                <el-col :span="12">
                  <el-input v-model="mqtturl" placeholder="必须以ws开头" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"> Client ID </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="mqttClientid"
                    placeholder="唯一ID,可为空"
                  />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"> 自动生成Client ID </el-col>
                <el-col :span="12">
                  <el-switch v-model="generateID" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"> 用户名 </el-col>
                <el-col :span="12">
                  <el-input v-model="mqttusername" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"> 密码 </el-col>
                <el-col :span="12">
                  <el-input v-model="mqttpassword" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"> Topics </el-col>
                <el-col :span="12">
                  <el-input v-model="mqttTopics" placeholder="多个用逗号隔开" />
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  ><el-button type="primary" @click="breakmqtt"
                    >断开</el-button
                  ></el-col
                >
                <el-col
                  ><el-button type="primary" @click="mqttconnect"
                    >连接</el-button
                  ></el-col
                >
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>

      <!-- 布局 -->
      <el-tab-pane label="布局" name="third">
        <el-collapse v-model="activeNamethere">
          <el-collapse-item title="布局" name="1">
            <el-row>
              <el-col :span="12"> 最大宽度 </el-col>
              <el-col :span="12">
                <el-input v-model="layoutwidth" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12"> 间距 </el-col>
              <el-col :span="12">
                <el-input v-model="spacing" />
              </el-col>
            </el-row>
            <el-row> </el-row>
            <el-row>
              <el-col :span="1"></el-col>
              <el-clo :span="20">
                <el-button
                  type="primary"
                  style="width: 220px"
                  @click="startlayout"
                  >开始排版</el-button
                >
              </el-clo>
              <el-col :span="2"></el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="结构" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </div>
  <div class="beyond" v-else>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <!-- 外观 -->
      <el-tab-pane name="first" label="外观" class="tab-pane">
        <el-collapse v-model="activeNamefour">
          <el-collapse-item title="位置和大小" name="1">
            <!-- X -->
            <el-row>
              <el-col :span="12">X</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="penX"
                  placeholder=""
                  @input="updateData"
              /></el-col>
            </el-row>
            <!-- Y -->
            <el-row>
              <el-col :span="12">Y</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="penY"
                  placeholder=""
                  @input="updateData"
              /></el-col>
            </el-row>
            <!-- 宽 -->
            <el-row>
              <el-col :span="12">宽</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="penWidth"
                  placeholder=""
                  @input="updateData"
              /></el-col>
            </el-row>
            <!-- 高 -->
            <el-row>
              <el-col :span="12">高</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="penHeight"
                  placeholder=""
                  @input="updateData"
              /></el-col>
            </el-row>
            <!-- 锁定宽高比 -->
            <el-row>
              <el-col :span="12">锁定宽高比</el-col>
              <el-col :span="12">
                <el-switch v-model="lockAspectRatio" @click="lockAspectRatiob"
              /></el-col>
            </el-row>
            <!-- 圆角 -->
            <el-row>
              <el-col :span="12">圆角</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="penFillet"
                  placeholder=""
                  @input="updateData"
              /></el-col>
            </el-row>
            <!-- 旋转 -->
            <el-row>
              <el-col :span="12">旋转</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="penRotate"
                  placeholder=""
                  @input="penRotatedata"
              /></el-col>
            </el-row>
            <!-- 内边距——左 -->
            <el-row>
              <el-col :span="12">内边距-左</el-col>
              <el-col :span="12"
                ><el-input v-model.number="paddingLeft" placeholder=""
              /></el-col>
            </el-row>
            <!-- 内边距——右 -->
            <el-row>
              <el-col :span="12">内边距-右</el-col>
              <el-col :span="12"
                ><el-input v-model.number="paddingRight" placeholder=""
              /></el-col>
            </el-row>
            <!-- 内边距——上 -->
            <el-row>
              <el-col :span="12">内边距-上</el-col>
              <el-col :span="12"
                ><el-input v-model.number="paddingUp" placeholder=""
              /></el-col>
            </el-row>
            <!-- 内边距——下 -->
            <el-row>
              <el-col :span="12">内边距-下</el-col>
              <el-col :span="12"
                ><el-input v-model.number="paddingBelow" placeholder=""
              /></el-col>
            </el-row>
            <!-- 进度 -->
            <el-row>
              <el-col :span="12">进度</el-col>
              <el-col :span="12"
                ><el-input
                  v-model="penScheduledata"
                  placeholder=""
                  @input="scheduledata"
              /></el-col>
            </el-row>
            <!-- 进度颜色 -->
            <el-row>
              <el-col :span="12">进度颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="penScheduleColor"
                  @change="uppenScheduleColor"
              /></el-col>
            </el-row>
            <!-- 垂直进度 -->
            <el-row>
              <el-col :span="12">垂直进度</el-col>
              <el-col :span="12"
                ><el-switch
                  v-model="VerticalProgress"
                  @click="VerticalProgressswitch"
              /></el-col>
            </el-row>
            <!-- 水平翻转 -->
            <el-row>
              <el-col :span="12">水平翻转</el-col>
              <el-col :span="12"
                ><el-switch
                  v-model="flipHorizontal"
                  @click="flipHorizontalswitch"
              /></el-col>
            </el-row>
            <!-- 垂直翻转 -->
            <el-row>
              <el-col :span="12">垂直翻转</el-col>
              <el-col :span="12"
                ><el-switch v-model="flipVertical" @click="flipVerticalswitch"
              /></el-col>
            </el-row>
            <!-- 输入框 -->
            <el-row>
              <el-col :span="12">输入框</el-col>
              <el-col :span="12"><el-switch v-model="InputBox" /></el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="样式" name="2">
            <!-- 线条样式 -->
            <el-row>
              <el-col :span="12">线条样式</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 末端样式 -->
            <el-row>
              <el-col :span="12">末端样式</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 连接样式 -->
            <el-row>
              <el-col :span="12">连接样式</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 线条渐变 -->
            <el-row>
              <el-col :span="12">线条渐变</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 颜色 -->
            <el-row>
              <el-col :span="12">颜色</el-col>
              <el-col :span="12"
                ><el-color-picker v-model="pencolordata" @change="pencolor"
              /></el-col>
            </el-row>
            <!-- 浮动颜色 -->
            <el-row>
              <el-col :span="12">浮动颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="penhoverColordata"
                  @change="penhoverColor"
              /></el-col>
            </el-row>
            <!-- 选中颜色 -->
            <el-row>
              <el-col :span="12">选中颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="penactiveColordata"
                  @change="penactiveColor"
              /></el-col>
            </el-row>
            <!-- 线条宽度 -->
            <el-row>
              <el-col :span="12">线条宽度</el-col>
              <el-col :span="12"
                ><el-input v-model="lineWidthdata" @input="updateData"
              /></el-col>
            </el-row>
            <!-- 背景 -->
            <el-row>
              <el-col :span="12">背景</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 背景颜色 -->
            <el-row>
              <el-col :span="12">背景颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="backgrounddata"
                  @change="backgroundco"
              /></el-col>
            </el-row>
            <!-- 浮动背景颜色 -->
            <el-row>
              <el-col :span="12">浮动背景颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="hoverBackgrounddata"
                  @change="hoverBackgroundco"
              /></el-col>
            </el-row>
            <!-- 选中背景颜色 -->
            <el-row>
              <el-col :span="12">选中背景颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="activeBackgrounddata"
                  @change="activeBackgroundco"
              /></el-col>
            </el-row>
            <!-- 透明度 -->
            <el-row>
              <el-col :span="12">透明度</el-col>
              <el-col :span="12"
                ><el-input v-model="transparency" @input="updateData"
              /></el-col>
            </el-row>
            <!-- 锚点颜色 -->
            <el-row>
              <el-col :span="12">锚点颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="anchorColordata"
                  @change="anchorColorpi"
              /></el-col>
            </el-row>
            <!-- 锚点半径 -->
            <el-row>
              <el-col :span="12">锚点半径</el-col>
              <el-col :span="12"
                ><el-input
                  v-model="anchorRadiusdata"
                  @input="updateanchorRadiusdata"
              /></el-col>
            </el-row>
            <!-- 阴影颜色 -->
            <el-row>
              <el-col :span="12">阴影颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="shadowColordata"
                  @change="shadowColordatapi"
              /></el-col>
            </el-row>
            <!-- 阴影模糊 -->
            <el-row>
              <el-col :span="12">阴影模糊</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="shadowBlur"
                  @input="updateshadowBlur"
              /></el-col>
            </el-row>
            <!-- 阴影 X 偏移 -->
            <el-row>
              <el-col :span="12">阴影 X 偏移</el-col>
              <el-col :span="12"
                ><el-input v-model.number="shadowX" @input="updateshadowX"
              /></el-col>
            </el-row>
            <!-- 阴影 Y 偏移 -->
            <el-row>
              <el-col :span="12">阴影 Y 偏移</el-col>
              <el-col :span="12"
                ><el-input v-model.number="shadowY" @input="updateshadowY"
              /></el-col>
            </el-row>
            <!-- 文字阴影 -->
            <el-row>
              <el-col :span="12">文字阴影</el-col>
              <el-col :span="12">
                <el-switch v-model="characterShadow"
              /></el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="文字" name="3">
            <!-- 字体名 -->
            <el-row>
              <el-col :span="12">字体名</el-col>
              <el-col :span="12"><el-input v-model="characterName" /></el-col>
            </el-row>
            <!-- 字体大小 -->
            <el-row>
              <el-col :span="12">字体大小</el-col>
              <el-col :span="12"
                ><el-input v-model="characterSize" @input="updatecharacterSize"
              /></el-col>
            </el-row>
            <!-- 文字颜色 -->
            <el-row>
              <el-col :span="12">文字颜色</el-col>
              <el-col :span="12"
                ><el-color-picker v-model="textColordata" @change="textColorpi"
              /></el-col>
            </el-row>
            <!-- 浮动文字颜色 -->
            <el-row>
              <el-col :span="12">浮动文字颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="hoverTextColordata"
                  @change="hoverTextColorpi"
              /></el-col>
            </el-row>
            <!-- 选中文字颜色 -->
            <el-row>
              <el-col :span="12">选中文字颜色</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="activeTextColordata"
                  @change="activeTextColorpi"
              /></el-col>
            </el-row>
            <!-- 文字背景 -->
            <el-row>
              <el-col :span="12">文字背景</el-col>
              <el-col :span="12"
                ><el-color-picker
                  v-model="textBackgrounddata"
                  @change="textBackgroundpi"
              /></el-col>
            </el-row>
            <!-- 倾斜 -->
            <el-row>
              <el-col :span="12">倾斜</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 加粗 -->
            <el-row>
              <el-col :span="12">加粗</el-col>
              <el-col :span="12">
                <el-switch v-model="textBold" @click="textBoldcl" />
              </el-col>
            </el-row>
            <!-- 水平对齐 -->
            <el-row>
              <el-col :span="12">水平对齐</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 垂直对齐 -->
            <el-row>
              <el-col :span="12">垂直对齐</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 行高 -->
            <el-row>
              <el-col :span="12">行高</el-col>
              <el-col :span="12"
                ><el-input v-model="rowHeight" @input="updatelineHeight"
              /></el-col>
            </el-row>
            <!-- 换行 -->
            <el-row>
              <el-col :span="12">换行</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <!-- 文字宽度 -->
            <el-row>
              <el-col :span="12">文字宽度</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="characterWidth"
                  @input="updatecharacterWidth"
              /></el-col>
            </el-row>
            <!-- 文字高度 -->
            <el-row>
              <el-col :span="12">文字高度</el-col>
              <el-col :span="12"
                ><el-input
                  v-model.number="characterHeight"
                  @input="updatecharacterHeight"
              /></el-col>
            </el-row>
            <!-- 水平偏移 -->
            <el-row>
              <el-col :span="12">水平偏移</el-col>
              <el-col :span="12"
                ><el-input v-model="horizontalOffset" @input="updatetextLeft"
              /></el-col>
            </el-row>
            <!-- 垂直偏移 -->
            <el-row>
              <el-col :span="12">垂直偏移</el-col>
              <el-col :span="12"
                ><el-input v-model="verticalOffset" @input="updatetextTop"
              /></el-col>
            </el-row>
            <!-- 超出省略 -->
            <el-row>
              <el-col :span="12">超出省略</el-col>
              <el-col :span="12">
                <el-switch v-model="textomit" @click="omit" />
              </el-col>
            </el-row>
            <!-- 隐藏文字 -->
            <el-row>
              <el-col :span="12">隐藏文字</el-col>
              <el-col :span="12"
                ><el-switch v-model="hiddenTextdata" @click="hiddenTextsw"
              /></el-col>
            </el-row>
            <!-- 保留小数 -->
            <el-row>
              <el-col :span="12">保留小数</el-col>
              <el-col :span="12"
                ><el-input v-model="retainDecimalsdata" @input="retainDecimals"
              /></el-col>
            </el-row>
            <!-- 文字内容 -->
            <el-row>
              <el-col :span="12">文字内容</el-col>
              <el-col :span="12">
                <el-input
                  v-model="textareadata"
                  :rows="2"
                  type="textarea"
                  @input="textarea"
                />
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="图片" name="4">
            <!-- 图片选择 -->
            <el-row>
              <el-col :span="12">图片选择</el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <!-- 图片地址 -->
            <el-row>
              <el-col :span="12">图片地址</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
            <!-- 背景图片 -->
            <el-row>
              <el-col :span="12">背景图片</el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <!-- 背景图片地址 -->
            <el-row>
              <el-col :span="12">背景图片地址</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
            <!-- 描绘图片 -->
            <el-row>
              <el-col :span="12">描绘图片</el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <!-- 描绘图片地址 -->
            <el-row>
              <el-col :span="12">描绘图片地址</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
            <!-- 宽度 -->
            <el-row>
              <el-col :span="12">宽度</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
            <!-- 高度 -->
            <el-row>
              <el-col :span="12">高度</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
            <!-- 保存比例 -->
            <el-row>
              <el-col :span="12">保存比例</el-col>
              <el-col :span="12"><el-switch v-model="saveScale" /></el-col>
            </el-row>
            <!-- 水平偏移 -->
            <el-row>
              <el-col :span="12">水平偏移</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
            <!-- 垂直偏移 -->
            <el-row>
              <el-col :span="12">垂直偏移</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
            <!-- 对齐方式 -->
            <el-row>
              <el-col :span="12">对齐方式</el-col>
              <el-col :span="12"><el-input v-model="pictureUrl" /></el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="字体图标" name="5">
            <!-- 字体图标 -->
            <el-row>
              <el-col :span="12">字体图标</el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <!-- 图标大小 -->
            <el-row>
              <el-col :span="12">图标大小</el-col>
              <el-col :span="12"><el-input v-model="iconSize" /></el-col>
            </el-row>
            <!-- 图标旋转 -->
            <el-row>
              <el-col :span="12">图标旋转</el-col>
              <el-col :span="12"><el-input v-model="iconRotation" /></el-col>
            </el-row>
            <!--颜色  -->
            <el-row>
              <el-col :span="12">颜色</el-col>
              <el-col :span="12"><el-color-picker v-model="color1" /></el-col>
            </el-row>
            <!--对齐方式  -->
            <el-row>
              <el-col :span="12">对齐方式</el-col>
              <el-col :span="12">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="禁止" name="6">
            <!-- 禁用输入 -->
            <el-row>
              <el-col :span="12">禁用输入</el-col>
              <el-col :span="12"
                ><el-switch v-model="inhibitInput" @click="inhibitInputsw"
              /></el-col>
            </el-row>
            <!-- 禁用旋转 -->
            <el-row>
              <el-col :span="12">禁用旋转</el-col>
              <el-col :span="12"
                ><el-switch
                  v-model="prohibitRotation"
                  @click="prohibitRotationsw"
              /></el-col>
            </el-row>
            <!-- 禁用缩放 -->
            <el-row>
              <el-col :span="12">禁用缩放</el-col>
              <el-col :span="12"
                ><el-switch
                  v-model="prohibitScaling"
                  @click="prohibitScalingsw"
              /></el-col>
            </el-row>
            <!-- 禁用锚点 -->
            <el-row>
              <el-col :span="12">禁用锚点</el-col>
              <el-col :span="12"
                ><el-switch v-model="prohibitAnchor" @click="prohibitAnchorsw"
              /></el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <!-- 事件 -->
      <el-tab-pane label="事件" name="second">
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addEvent"
            style="width: 220px; margin-left: 15px"
            >添加事件</el-button
          >
        </div>

        <template v-for="(item, index) in eventlist" :key="index">
          <el-collapse v-model="activeNameEvent">
            <el-collapse-item>
              <el-row>
                <el-col :span="12">事件类型</el-col>
                <el-col :span="12">
                  <el-select v-model="item.name" placeholder="请选择">
                    <el-option
                      v-for="item in eventTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">事件行为</el-col>
                <el-col :span="12"> </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">触发条件</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </template>
      </el-tab-pane>

      <!-- 动效 -->
      <el-tab-pane label="动效" name="third">
        <el-collapse v-model="activeNamesix">
          <el-collapse-item title="动画" name="1">
            <el-row>
              <el-col :span="12">时长</el-col>
              <el-col :span="12"><el-input v-model.number="value1" /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">动画效果</el-col>
              <el-col :span="12">
                <el-select
                  v-model="value"
                  class="m-2"
                  placeholder="请选择"
                  @change="animateSelect"
                >
                  <el-option
                    v-for="item in animateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">循环次数</el-col>
              <el-col :span="12"
                ><el-input v-model="cyclesNumber" @input="cyclesNumberin"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">下一个动画</el-col>
              <el-col :span="12"
                ><el-input v-model="nextAnimatedata" @input="nextAnimatein"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">自动播放</el-col>
              <el-col :span="12"
                ><el-switch v-model="autoPlaydata" @click="autoPlaydatasw"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">保持动画状态</el-col>
              <el-col :span="12"
                ><el-switch
                  v-model="keepAnimateStatedata"
                  @click="keepAnimateStatesw"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="12">线性播放</el-col>
              <el-col :span="12">
                <el-select
                  v-model="Linearplaybackvalue"
                  class="m-2"
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in Linearplayback"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="7"
                ><el-button type="primary" @click="PlayAnimation"
                  >播放</el-button
                ></el-col
              >
              <el-col :span="7"
                ><el-button type="primary" @click="PauseAnimation"
                  >暂停</el-button
                ></el-col
              >
              <el-col :span="7"
                ><el-button type="primary" @click="StopAnimation"
                  >停止</el-button
                ></el-col
              >
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="鼠标提示" name="2">
            <el-row>
              <el-col :spen="12">Markdown</el-col>
              <el-col :spen="12"></el-col>
            </el-row>
            <el-row>
              <el-col :spen="12">Mark 函数</el-col>
              <el-col :spen="12"></el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="数据" name="fourth">
        <el-collapse v-model="activeNameseven">
          <el-collapse-item title="Tag标签" name="1"> </el-collapse-item>
          <el-collapse-item title="数据" name="2"> </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.img {
  width: 100%;
  height: 100%;
}
</style>
