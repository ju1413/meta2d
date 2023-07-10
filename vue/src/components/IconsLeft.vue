<template>
  <div class="aside">
    <div class="icon-list">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="系统组件" name="first">
          <ul>
            <li
              v-for="icon in rIcons"
              draggable="true"
              @dragstart="onDragStart($event, icon.data)"
              :ondragstart="icon.title"
              style="width: 50px"
            >
              <i
                v-if="icon.key"
                class="iconfont"
                :class="`icon-${icon.key}`"
              ></i>
              <img
              v-else-if="icon.svg"
              :src="icon.svg"
              alt=""
              srcset=""
              class="img"
            />
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="我的组件" name="text">
          <span
            style="display: flex;align-items:center; padding-left: 20px;  cursor: pointer;line-height: 0px; !important"
          text @click="addfolder = true"
          >
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" style="width: 1em; height: 1em; margin-right: 8px"><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path></svg>
            新建组件
          </span>
          <div class="demo-collapse">
            <div style="margin-top: 10px;">
    <el-collapse v-model="activeNames"  v-for="(item, index) in assemblys" :key="index">
      <el-collapse-item >
        <template #title >
            <span> {{ item.name }}</span>
           <span style="margin-left: 90px;">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" style="width: 1em; height: 1em; margin-right: 8px" @click="Pictures"><path fill="currentColor" d="M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"></path></svg>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" style="width: 1em; height: 1em; margin-right: 8px"><path fill="currentColor" d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm320 512V448h64v128h128v64H544v128h-64V640H352v-64h128z"></path></svg>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" style="width: 1em; height: 1em; margin-right: 8px"><path fill="currentColor" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path></svg>
           </span>
        </template>

        </el-collapse-item>
    </el-collapse>
</div>
    <el-dialog v-model="addfolder" title="新建文件夹">
    <el-form :model="form">
      <el-form-item label="文件夹名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addfolder = false">取消</el-button>
        <el-button type="primary" @click="addfolderYse">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref } from "vue";
import { reactive } from 'vue'
import axios from "axios";
import { icons } from "../utils/data";
import { parseSvg } from "@meta2d/svg";
import type { TabsPaneContext } from "element-plus";

const rIcons = ref(icons);
const activeNames = ref(['1'])

axios.get("/T型开关A -C.svg").then((res) => {
  const data = res.data;
  const pens = parseSvg(data);
  rIcons.value.push({
    svg: "/T型开关A -C.svg",
    title: "svg",
    data: pens,
  });
});
//拖动时触发
const onDragStart = (e: any, data) => {
  e.dataTransfer.setData("Meta2d", JSON.stringify(data));
};
nextTick(() => {
  // 此处只注册，未将数据放置到工具栏
  // data.ts 中配置的最后一项即为该图形库中的内容
  (window as any).registerToolsNew();
  // (window as any).meta2dTools = undefined;
});

const activeName = ref("first");
const assemblys :any = ref([]);
const addfolder = ref(false)
const formLabelWidth = '100px'
const form = reactive({
  name: '',
})
const addfolderYse = () => {
   addfolder.value = false;
   assemblys.value.push({
    name: form.name,
   })
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const Pictures =() => {
  
}
</script>
