import { EventAction } from "@meta2d/core";
import { fa } from "element-plus/es/locale";
import { reactive } from "vue";

/*
 * @Description:
 * @Author: G
 * @Date: 2021-10-13 11:23:17
 * @LastEditTime: 2023-07-21 09:21:13
 */
export const icons = [
  {
    key: 'rect',
    title: '矩形',
    data: {
      name: 'rectangle',
      text: '矩形',
      width: 100,
      height: 100,
      rotate: 0,
      progress: 0,
      color:'',
      borderRadius:0,
      progressColor:'',
      verticalProgress:false,
      flipX:false,
      flipY:false,
      hoverColor:'',
      hoverBackground:'',
      background:'',
      activeColor:'',
      activeBackground:'',
      globalAlpha:"1",
      lineWidth:"1",
      lineHeight:"1.5",
      anchorColor:'',
      anchorRadius:5,

      shadowColor:'',
      shadowBlur:0,
      shadowOffsetX:0,
      shadowOffsetY:0,
      textHasShadow:false,

      fontSize:24,
      textColor:'',
      hoverTextColor:'',
      activeTextColor:'',
      textBackground:'',

      fontWeight:400,
      textWidth:0.9,
      textHeight:0.9,
      textLeft:0,
      textTop:0,
      ellipsis:false,
      hiddenText:false,
      keepDecimal:'',
      image:'',
      disableInput: false,
      disableRotate:false,
      disableSize:false,
      disableAnchor:false,
      animateCycle:'',
      nextAnimate:"",
      autoPlay: false,
      events:[],
      keepAnimateState:false,
      tags:[],
      Animate:'',
      lineDash:[],
      linevalue:'',
      lineCap:"",
      lineCapvalue:'',
      gradientFromColorssw:false,
      iconAlign: "left-top",
      datalist:[],
      // title: '# 矩形',
    },
  },
  {
    key: 'circle',
    title: '圆形',
    data: {
      name: 'circle',
      text: 'le5le',
      width: 100,
      height: 100,
      radio: false,
      events: [
        {
          name: 'click',
          action: EventAction.Emit, // 执行动作
          value: 'showDialog',
        },
      ]
    },
  },
  {
    key: 'img',
    title: '图片',
    data: {
      name: 'image',
      width: 100,
      height: 100,
      radio: false,
      image:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016ba9554b952b000001bf72fa6574.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636344024&t=f977b8ad47acf62ee3579d594f32489a',
    },
  },
  {
    key: 'video',
    title: '视频',
    data: {
      name: 'video',
      width: 100,
      radio: false,
      height: 100,
      video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      autoPlay: true,
    },
  },
  {
    key: 'audio',
    title: '音频',
    data: {
      name: 'video',
      width: 100,
      height: 100,
      radio: false,
      audio: 'https://down.ear0.com:3321/preview?soundid=37418&type=mp3',
      autoPlay: true,
    },
  },
  {
    // 该图形能拖入画布，说明注册成功
    key: 'circle',
    title: '企业图形库',
    data: {
      name: 'atlassian.away',
      width: 100,
      height: 100,
      radio: false,
    },
  },
  {
    // 该图形能拖入画布，说明注册成功
    key: 'pentagram',
    title: 'test',
    data: {
      name: 'triangleOne',
      width: 100,
      height: 100,
      radio: false,
    },
  },
  {
    key: 'pentagram',
    title: '图表',
    data: {
      name: 'echarts',
      width: 400,
      height: 300,
      externElement: true,
      disableAnchor: true,
      radio: false,
      echarts: {
        option: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
            },
          ],
        },
      },
    },
  },
];
