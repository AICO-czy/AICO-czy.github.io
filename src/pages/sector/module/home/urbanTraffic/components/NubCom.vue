    <!--
 * @Author: mat
 * @Date: 2019-12-04 14:56:07
 * @LastEditTime: 2019-12-04 16:31:52
 * @LastEditors: Please set LastEditors
 * @Description: 实现数字翻牌动态效果，css 属性 writing-mode: vertical-lr，使数字竖直排版，
                2d移动 transform: translate(-50%, -40%); y值控制移动至哪个数字，transition
                控制transform属性有动画效果
 -->

<template>
  <div class="num-box">
    <!-- <div class="left-bg"></div> -->
    <div class="chartNum">
      <div class="box-item">
        <li :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }" v-for="(item, index) in orderNum"
          :key="index">
          <span v-if="!isNaN(item)">
            <i ref="numberItem">0123456789</i>
          </span>
          <span class="comma" v-else>{{ item }}</span>
        </li>
      </div>
    </div>
    <div class="dw">{{ props.unit }}</div>
    <!-- <div class="right-bg"></div> -->
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';

const orderNum = ref(['0', '0', '0', ',', '0', '0', '0', ',', '0', '0', '0'])// 默认总数

const numberItem = ref(null)

const props=defineProps({
  num:{ //数字
    type:Number,
    default:0
  },
  need:{ //是否需要逗号切割
    type:Boolean,
    default:true
  },
  formatLength:{ //显示的数字长度
    type:Number,
    default:9
  },
  unit:{ //单位
    type:String,
    default:'辆'
  }
})

const num = ref(0)

watch(()=>props.num,()=>{
  toOrderNum(props.num)
})

watch(() => props.formatLength, () => {
  let data = []
  while (data.length<props.formatLength) {
    data.push('0')
  }
  if(props.need){
    data = data.join('')
    data = formatDH(data).split('')
  }
    orderNum.value = data
},{immediate:true})

onMounted(() => {
  setInterval(() => {
    // 这里输入数字即可调用
    if(num.value >= 99999){
      num.value = 0
      toOrderNum(num.value)
    }else{
      num.value = num.value + 11111
      toOrderNum(num.value)
    }
  }, 1000);
  // formatDH('01020304050607081')
})

//设置数字滚动
function setNumberTransform() {
  const numberItems = numberItem.value // 拿到数字的ref，计算元素数量
  const numberArr = orderNum.value.filter(item => !isNaN(item))
  // 结合CSS 对数字字符进行滚动,显示订单数量
  for (let index = 0; index < numberItems.length; index++) {
    const elem = numberItems[index]
    elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
  }
}


// 处理总订单数字
function toOrderNum(num) {
  num = num.toString()
  // 把订单数变成字符串
  if (num.length < props.formatLength) {
    num = '0' + num // 如未满八位数，添加"0"补位
    toOrderNum(num) // 递归添加"0"补位
  } else if (num.length === props.formatLength) {
    // 订单数中加入逗号
    if (props.need){
      num = formatDH(num)
      // num = num.slice(0, 3) + ',' + num.slice(3, 6) + ',' + num.slice(6, 9)
    }
    orderNum.value = num.split('') // 将其便变成数据，渲染至滚动数组
  } else {
    // 订单总量数字超过八位显示异常
    console.warn('总量数字过大');
  }
  setNumberTransform()
}

//插入逗号 默认为整数 无小数点
function formatDH(data){
  let dataLength = data.length
  let hasEnd = dataLength%3
  let DHcount = Math.floor(dataLength/3)
  let outData = []
  // console.log('逗号处理', hasEnd,DHcount);
  if (hasEnd!=0){
    outData.push(data.slice(0, hasEnd))
    // console.log('末尾切割', outData);
  }
  for (let index = 0; index < DHcount; index++) {
    outData.push(data.slice(3 * index + hasEnd, (3 * index) + 3 + hasEnd))
  }
  // console.log('切割结果', outData.join(','));
  return outData.join(',')
}

</script>
<style scoped lang='scss'>
.num-box {
  display: flex;
  align-items: center;
  height: 120px;
}

.left-bg {
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图 252.png') no-repeat center/cover;
  width: 51px;
  height: 120px;
}

.right-bg {
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图 253.png') no-repeat center/cover;
  width: 51px;
  height: 120px;
}

.dw {
  align-self: end;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 42px;
  color: #A3D9FF;
  line-height: 100px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin: 0 30px;
}

.fg {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 38px;
  color: #65B6D8;
  line-height: 70px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  position: absolute;
  top: 0;
  right: 0;
}

/*订单总量滚动数字设置*/
.box-item {
  position: relative;
  height: 100px;

  font-size: 54px;
  line-height: 41px;
  text-align: center;
  list-style: none;
  color: #2D7CFF;
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  -moz-user-select: none;
  /*火狐*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -ms-user-select: none;
  /*IE10*/
  -khtml-user-select: none;
  /*早期浏览器*/
  user-select: none;
  /* overflow: hidden; */
}

/* 默认逗号设置 */
.mark-item {
  width: 24px;
  height: 100px;
  // margin-right: 30px;
  line-height: 100px;
  font-size: 48px;
  position: relative;

  &>span {
    position: absolute;
    width: 100%;
    bottom: 20px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 38px;
    color: #65B6D8;
    line-height: 70px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

/*滚动数字设置*/
.number-item {
  width: 60px;
  height: 91px;
  /* 背景图片 */
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图 254.png') no-repeat center center;
  background-size: 100% 100%;
  // background: #ccc;
  list-style: none;
  margin-right: 25px;
  // background:rgba(250,250,250,1);
  border-radius: 4px;
  border: 1px solid rgba(221, 221, 221, 1);

  &>span {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    width: 100%;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;

    &>i {
      font-style: normal;
      position: absolute;
      top: 11px;
      left: 50%;
      transform: translate(-50%, 0);
      transition: transform 1s ease-in-out;
      letter-spacing: 10px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 700;
      font-size: 58px;
      color: #D4F3FF;
      line-height: 75px;
      font-style: normal;
      text-transform: none;
    }
  }
}

.number-item:last-child {
  margin-right: 0;
}
</style>
