<!--
 * @Description: 
 * @Author: G
 * @Date: 2021-10-13 11:10:11
 * @LastEditTime: 2023-07-24 17:27:02
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
// 测试本地使用
// import { Meta2d } from "../../../../packages/core";
import { register as registerEcharts } from "@meta2d/chart-diagram";
import { Pen, Meta2d ,Options } from "@meta2d/core";
import {triangle,triangleAnchors} from "../diagram/triangleOne"
// import {testttt} from "./testx";

const options : Options = {};
onMounted(() => {
  const meta2d = new Meta2d("meta2d",options);
  meta2d.register({  triangleOne:triangle });
  meta2d.registerAnchors({ triangleOne: triangleAnchors });
  registerEcharts();

const { color, activeColor, grid, gridColor, gridSize, rule, ruleColor ,fromArrow } = meta2d.getOptions();
// let obj = {fromArrow : "triangleSolid"}
// meta2d.getOptions(obj);
  // 监听消息
  meta2d.on("showDialog", ({ pen }: { pen: Pen }) => {
    currentPen.value = pen;

    // vue 打开弹窗
    visible.value = true;
  });
  (window as any).mainMeta2d = (window as any).meta2d;
});

const visible = ref(false);
const currentPen = ref<Pen>({});




</script>

<template>
  <div class="main">
    <div class="meta2d" id="meta2d"></div>
  </div>

  <a-modal v-model:visible="visible" :title="currentPen.text">
    <p>{{ currentPen.name }}</p>
    <p>{{ currentPen.text }}</p>
  </a-modal>
</template>

<style scoped></style>