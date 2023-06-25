<!--
 * @Description: 
 * @Author: G
 * @Date: 2021-10-13 11:10:11
 * @LastEditTime: 2023-06-14 11:59:26
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
// 测试本地使用
// import { Meta2d } from "../../../../packages/core";
import { register as registerEcharts } from "@meta2d/chart-diagram";
import { Pen, Meta2d } from "@meta2d/core";
// import {testttt} from "./testx";

onMounted(() => {
  const meta2d = new Meta2d("meta2d");
  registerEcharts();

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

// function testa(){

// const z =  testttt();

// }
</script>

<template>
  <div class="main" @click.left="testa">
    <div class="meta2d" id="meta2d"></div>
  </div>

  <a-modal v-model:visible="visible" :title="currentPen.text">
    <p>{{ currentPen.name }}</p>
    <p>{{ currentPen.text }}</p>
  </a-modal>
</template>

<style scoped></style>