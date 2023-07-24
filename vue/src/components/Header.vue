<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Pen, Point } from "@meta2d/core";
// import { Meta2d ,Options } from "@meta2d/core";
import { Meta2dStore } from "@meta2d/core";

const isPenActive = ref(false);
const isPencilActive = ref(false);
const isMagnifierActive = ref(false);
const isMinimapActive = ref(false);
const lockstate = ref(0);

const onCreate = () => {
  window.meta2d.open();
};
const onOpen = (e) => {
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target.result);
      window.meta2d.open(json);
    } catch (e) {
      console.log("读取文件失败，请检查数据格式");
    }
  };
  reader.readAsText(file);
};
const onSave = () => {
  const filename = "测试数据.json";
  const data = window.meta2d.data();
  const json = JSON.stringify(data, undefined, 4);
  const blob = new Blob([json], { type: "text/json" });
  const a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  a.click();
};
const onTogglePen = () => {
  if (isPenActive.value === true) {
    isPenActive.value = false;
    meta2d.drawLine();
  } else {
    isPenActive.value = true;
    meta2d.drawLine("curve");
  }
  if (isPencilActive.value === true) {
    isPencilActive.value = false;
    meta2d.stopPencil();
    isPenActive.value = true;
    meta2d.drawLine("curve");
  }
};
const onTogglePencil = () => {
  if (isPencilActive.value === true) {
    isPencilActive.value = false;
    meta2d.stopPencil();
  } else {
    isPencilActive.value = true;
    meta2d.drawingPencil();
  }
  if (isPenActive.value === true) {
    isPenActive.value = false;
    meta2d.drawLine();
    isPencilActive.value = true;
    meta2d.drawingPencil();
  }
};
const onToggleMagnifier = () => {
  if (isMagnifierActive.value === true) {
    isMagnifierActive.value = false;
    window.meta2d.hideMagnifier();
  } else {
    isMagnifierActive.value = true;
    window.meta2d.showMagnifier();
  }
};
const onToggleMinimap = () => {
  if (isMinimapActive.value === true) {
    isMinimapActive.value = false;
    window.meta2d.hideMap();
  } else {
    isMinimapActive.value = true;
    window.meta2d.showMap();
  }
};
const onHelp = () => {
  window.open("https://www.yuque.com/alsmile/meta2d/cucep0");
};

const bun = ref("编辑");

const iflock = () => {
  if (lockstate.value === 0) {
    lockstate.value = 1;
    meta2d.lock(1);
    bun.value = "预览";
  } else if (lockstate.value === 1) {
    lockstate.value = 2;
    meta2d.lock(2);
    bun.value = "锁定";
  } else if (lockstate.value === 2) {
    lockstate.value = 0;
    meta2d.lock(0);
    bun.value = "编辑";
  }
  console.log(lockstate.value);
};
const onKeyDown = (e) => {
  switch (e.key) {
    case "b":
    case "B":
      if (window.meta2d.canvas.pencil) {
        isPencilActive.value = true;
      } else {
        isPencilActive.value = false;
      }
      break;
    case "v":
    case "V":
      if (e.ctrlKey || e.metaKey) {
        return;
      } else {
        if (window.meta2d.canvas.drawingLineName) {
          isPenActive.value = true;
        } else {
          isPenActive.value = false;
        }
      }
      break;
    case "m":
    case "M":
      if (window.meta2d.canvas.magnifier) {
        isMinimapActive.value = true;
      } else {
        isMinimapActive.value = false;
      }
      break;
    case "Escape":
      isPenActive.value = false;
      isPencilActive.value = false;
      isMagnifierActive.value = false;
      break;
    default:
      break;
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
});

// const test1 = () => {
//   let obj = {fromArrow : "triangleSolid"}
//   meta2d.setOptions(obj);
// }

const starting = [
  {
    value:0,
    label:"默认",
    type:"",
  },
  {
    value:1,
    label:"三角箭头",
    type:"triangle",
  },
  {
    value:2,
    label:"菱形箭头",
    type:"diamond",
  },
  {
    value:3,
    label:"圆箭头",
    type:"circle",
  },
  {
    value:4,
    label:"箭头1",
    type:"lineDown",
  },
  {
    value:5,
    label:"箭头2",
    type:"lineUp",
  },
  {
    value:6,
    label:"实心三角箭头",
    type:"triangleSolid",
  },
  {
    value:7,
    label:"实心菱形箭头",
    type:"diamondSolid",
  },
  {
    value:8,
    label:"实心圆箭头",
    type:"circleSolid",
  }
  ,
  {
    value:9,
    label:"普通箭头",
    type:"line",
  }
]
const startingPoint = (index : number) => {
  if(index == 9){
    let e9 = {fromArrow : "line"}
    meta2d.setOptions(e9);
  }
  if(index == 1){
    let e1 = {fromArrow : "triangle"}
    console.log(e1);
    
    meta2d.setOptions(e1);
  }
  if(index == 2){
    let e2 = {fromArrow : "diamond"}
    meta2d.setOptions(e2);
  }
  if(index == 3){
    let e3 = {fromArrow : "circle"}
    meta2d.setOptions(e3);
  }
  if(index == 4){
    let e4 = {fromArrow : "lineDown"}
    meta2d.setOptions(e4);
  }
  if(index == 5){
    let e5 = {fromArrow : "lineUp"}
    meta2d.setOptions(e5);
  }
  if(index == 6){
    let e6 = {fromArrow : "triangleSolid"}
    meta2d.setOptions(e6);
  }
  if(index == 7){
    let e7 = {fromArrow : "diamondSolid"}
    meta2d.setOptions(e7);
  }
  if(index == 8){
    let e8 = {fromArrow : "circleSolid"}
    meta2d.setOptions(e8);
  }
  if(index == 0){
    let e0 = {fromArrow : ""}
    meta2d.setOptions(e0);
  }
}





const end = [
{
    value:0,
    label:"默认"
  },
  {
    value:1,
    label:"三角箭头"
  },
  {
    value:2,
    label:"菱形箭头"
  },
  {
    value:3,
    label:"圆箭头"
  },
  {
    value:4,
    label:"箭头1"
  },
  {
    value:5,
    label:"箭头2"
  },
  {
    value:6,
    label:"实心三角箭头"
  },
  {
    value:7,
    label:"实心菱形箭头"
  },
  {
    value:8,
    label:"实心圆箭头"
  },
  {
    value:9,
    label:"普通箭头"
  }
]
const endPoint = (index:number) => {
  if(index == 9){
    let e9 = {toArrow : "line"}
    meta2d.setOptions(e9);
  }
  if(index == 1){
    let e1 = {toArrow : "triangle"}
    console.log(e1);
    
    meta2d.setOptions(e1);
  }
  if(index == 2){
    let e2 = {toArrow : "diamond"}
    meta2d.setOptions(e2);
  }
  if(index == 3){
    let e3 = {toArrow : "circle"}
    meta2d.setOptions(e3);
  }
  if(index == 4){
    let e4 = {toArrow : "lineDown"}
    meta2d.setOptions(e4);
  }
  if(index == 5){
    let e5 = {toArrow : "lineUp"}
    meta2d.setOptions(e5);
  }
  if(index == 6){
    let e6 = {toArrow : "triangleSolid"}
    meta2d.setOptions(e6);
  }
  if(index == 7){
    let e7 = {toArrow : "diamondSolid"}
    meta2d.setOptions(e7);
  }
  if(index == 8){
    let e8 = {toArrow : "circleSolid"}
    meta2d.setOptions(e8);
  }
  if(index == 0){
    let e0 = {toArrow : ""}
    meta2d.setOptions(e0);
  }
}


const lineType = [
  {
    value:0,
    label:"曲线"
  },
  {
    value:0,
    label:"线段"
  },
  {
    value:0,
    label:"直线"
  },
  {
    value:0,
    label:"脑图曲线"
  },
]
const lineTypes = (index : number) => {
  if(index == 0){
    let i0 = {drawingLineName : "curve"}
    meta2d.setOptions(i0)
  }
  if(index == 1){
    let i1 = {drawingLineName : "polyline"}
    meta2d.setOptions(i1)
  }
  if(index == 2){
    let i2 = {drawingLineName : "line"}
    meta2d.setOptions(i2)
  }
  if(index == 3){
    let i3 = {drawingLineName : "mind"}
    meta2d.setOptions(i3)
  }
}

const editmenu = [
  {
    value:0,
    label:"添加/删除锚点(A)"
  },
  {
    value:1,
    label:"添加手柄(H)"
  },
  {
    value:2,
    label:"删除手柄(D)"
  }
]
const edit = (index : number) => {
  if(index == 0){
    meta2d.toggleAnchorMode();
  }
  if(index == 1){
    meta2d.addAnchorHand();
  }
  if(index == 2){
    meta2d.removeAnchorHand();
  }
}


</script>

<template>
  <div class="header">
    <div class="logo">
      <img
        src="../assets/images/logo 1.png"
        style="width: 200px; height: 20px"
        alt="乐吾乐"
      />
    </div>
    <div id="button-group">
      <div class="buttonone">
        <span id="open">
          <img
            src="../assets/images/文件.png"
            style="width: 14px; height: 14px"
          />
          文件
          <input id="open-input" type="file" @change="onOpen" />
        </span>
        <el-dropdown>
        <span>
          <img
            src="../assets/images/Vector.png"
            style="width: 14px; height: 14px"
          />
          编辑
          <arrow-down />
        </span>
        <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item,index) in editmenu " :key="index" @click="edit(index)">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
      </el-dropdown>
        <span id="save" @click="onSave">
          <img
            src="../assets/images/保存.png"
            style="width: 14px; height: 14px"
          />
          保存
        </span>
      </div>
      <div class="buttontwo">
        <span id="pen" :class="{ active: isPenActive }" @click="onTogglePen">
          <img
            src="../assets/images/钢笔.png"
            style="width: 14px; height: 14px"
          />
          钢笔
        </span>
        <span
          id="pencil"
          :class="{ active: isPencilActive }"
          @click="onTogglePencil"
        >
          <img
            src="../assets/images/铅笔.png"
            style="width: 14px; height: 14px"
          />
          铅笔
        </span>
        <span
          id="magnifier"
          :class="{ active: isMagnifierActive }"
          @click="onToggleMagnifier"
        >
          <img
            src="../assets/images/放大镜.png"
            style="width: 14px; height: 14px"
          />
          放大镜
        </span>
        <span
          id="minimap"
          :class="{ active: isMinimapActive }"
          @click="onToggleMinimap"
        >
          <img
            src="../assets/images/缩略图.png"
            style="width: 14px; height: 14px"
          />
          缩略图
        </span>
        <el-dropdown>
        <span>
          <img src="../assets/images/起点.png" style="width: 14px; height: 14px;"/>
          起点
          <arrow-down />
        </span>
        <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item,index) in starting " :key="index" @click="startingPoint(index)">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
      </el-dropdown>
      <el-dropdown>
        <span>
          <img src="../assets/images/起点.png" style="width: 14px; height: 14px"/>
          终点
          <arrow-down />
        </span>
        <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item , index) in end" :key="index" @click="endPoint(index)">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
      </el-dropdown>
      <el-dropdown>
        <span>
          <img src="../assets/images/连线.png" style="width: 14px; height: 14px"/>
          连线
          <arrow-down />
        </span>
        <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item , index) in lineType" :key="index" @click="lineTypes(index)">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
      </el-dropdown>
      </div>
      <div class="buttonthree">
        <span
        id="lock" :class="{ active: lockstate }" @click="iflock">
          <img src="../assets/images/编辑.png" style="width: 14px; height: 14px"/>
          {{ bun }}
        </span>
        <span>
          <img src="../assets/images/预览.png" style="width: 14px; height: 14px"/>
          预览
        </span>
        <span>
          <img src="../assets/images/分享.png" style="width: 14px; height: 14px"/>
          分享
        </span>
        <el-dropdown>
        <span>
          <img src="../assets/images/社区.png" style="width: 14px; height: 14px"/>
          社区
          <arrow-down />
        </span>
        <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Github</el-dropdown-item>
        <el-dropdown-item>核心库</el-dropdown-item>
        <el-dropdown-item>技术交流群</el-dropdown-item>
        <el-dropdown-item>脑图曲线</el-dropdown-item>
      </el-dropdown-menu>
    </template>
      </el-dropdown>
        <span>
          <img src="../assets/images/帮助.png" style="width: 14px; height: 14px"/>
          帮助
        </span>
        <span>
          <img src="../assets/images/中英文切换.png" style="width: 14px; height: 14px"/>
          中文
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
