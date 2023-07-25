<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from './components/Header.vue';
import Icons from './components/Icons.vue';
import Meta2d from './components/Meta2d.vue';
import IconsLeft from './components/IconsLeft.vue'
// import testttt from './components/Icons.vue';

// const z = testttt().x.value
// console.log(z);

</script>

<template>
  <Header />
  <IconsLeft/>
  <Icons />
  <Meta2d />
</template>

<style>

* {
  padding: 0;
  margin: 0;
  outline: none;
  box-sizing: border-box;
  word-break: break-all;
  word-break: break-word;
}

html, body, #app {
  width: 100%;
  height: 100%;
}

ul{
            list-style: none;
            width: 237.2px;
            /* margin: auto; */
            padding:0;
            display: flex;
            flex-wrap: wrap;

        }
        li{
            text-align: center;
            /* width: 133px; */
            height: 60px;
            
        }

input[type=file], /* FF, IE7+, chrome (except button) */
input[type=file]::-webkit-file-upload-button { /* chromes and blink button */
  cursor: pointer; 
}

i.iconfont {
  font-size: 30px;
  color: rgba(0,0,0,.65);
}

.header {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  /* flex-direction:row; */
  /* justify-content: space-between; */
  align-items:center;
  float: top;
  z-index: 9999;
  /* box-shadow: 0px 10px 0px 0px #eede15;  */
  box-shadow: 0px 1px 5px 0px #DDE1E4; 
}


.logo {
  height: 50px;
  width: 258px;
  padding: 10px;
  float: left;
  text-align: center;
  background: linear-gradient(90deg, #2543FF 0%, #3DA7FF 100%);
}

.logo img {
  width: 50px;
  height: 50px;
}

#button-group {
  height: 35px;
  width: 1662px;
  /* width: 100%; */
  /* text-align: center; */
  /* padding: 14px; */
  /* padding-left: 100px; */
  display: flex;
  padding-right: 16px;
  justify-content:space-between;
 
 
  /* flex-direction:row-reverse; */
}

#open {
  position: relative;
}

#open-input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.aside {
  width: 258px;
  height: 896px;
  float: left;
  border-right: 1px solid #ccc;
  background-color: #fff;
}

/* .aside .icon-list {
  border-bottom: 1px solid #ccc;
} */

/* .aside .icon-list > div,
.aside .link {
  height: 51px;
  line-height: 50px;

}

.aside .icon-list > div i {
  cursor: pointer;
  user-select: none;
} */

.main {
  height: calc(100% - 51px);
  padding-left: 258px;
  padding-right:259px;
  /* padding-top: 5px; */
}

#meta2d {
  height: 100%;
  background-color: #F1F5F8;
  margin-top: 1px;
}
.beyond{
  width: 259px;
  height: calc(100% - 51px);
  float: right;
  border-left: 1px solid #ccc;
  z-index: 98;
  overflow-y: auto;
}

.demo-tabs  {
  margin-left: 15px;
  /* color: rgb(229, 6, 6); */
  /* font-size: 20px;
  font-weight: 500; */
 width: 226px;
height: 32px;
border-radius: 0px 0px 0px 0px;
opacity: 1;
/* border-bottom: 1px solid #E3E3E4; */
}
.el-tabs__item {
  padding: 0 0 0px !important;

}
.el-tabs__header{
  margin: 0 0 0px;
}
/* .el-tabs--card {
  height: calc(100vh - 110px);
  overflow-y: auto;
} */
/* .el-tab-pane {
  height: 896px;
  overflow-y: auto;
} */

.buttonone{
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  width: 134px;
  padding-left: 40px;
}
.buttonone span{
  display: flex;
  flex-direction:column;
  align-items:center;
  font-size: 12px;
  /* margin-right: 36px; */
}
.buttontwo{
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  width: 444px;
}
.buttontwo span{
  display: flex;
  flex-direction:column;
  align-items:center;
  font-size: 12px;
}
.buttonthree{
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  width: 394px;
}
.buttonthree span{
  display: flex;
  flex-direction:column;
  align-items:center;
  font-size: 12px;
}
.element.style{
  width: 1404px;
}
.el-row{
  margin-bottom: 12px !important;
  margin-top: 12px !important;
}
</style>
