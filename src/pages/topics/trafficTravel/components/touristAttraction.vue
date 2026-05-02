<template>
  <q-dialog v-model="alert" seamless>
    <div class="bg">
      <dialog-title title=" " @close="handleClose" />
      <div class="h-full body-box">
        <v-chart :option="option" style="height: 400px; width: 100%;" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DialogTitle from './dialogTitle.vue'

const alert = ref(false)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

watch(() => props.visible, (newVal) => {
  alert.value = newVal
})

//取消
function handleClose() {
  alert.value = false
}

var data = [{
  "name": "5A级景区",
  "value": 2
}, {
  "name": "4A级景区",
  "value": 16
}, {
  "name": "3A级景区",
  "value": 26
}, {
  "name": "2A级景区",
  "value": 8
}, {
  "name": "1A级景区",
  "value": 1
}]

const option = {
  color: ['#4694fe', '#fe9d19', '#5aedd3', '#e2b366', '#24dcf8'],
  title: {
    text: '{title|A级以上}\n{subtitle|53个}', // 使用自定义格式化
    subtext: '',
    textStyle: {
      rich: {
        title: { fontSize: 52, color: '#02B1D0', fontWeight: 'bold' },
        subtitle: { fontSize: 60, color: '#fff', padding: [15, 0, 10, 0] },
        thirdline: { fontSize: 22, color: '#fff' }
      }
    },
    textAlign: "center",
    x: "29%",
    y: "35%",
  },
  grid: {
    bottom: 150,
    left: 100,
    right: '10%'
  },
  legend: {
    orient: 'vertical',
    top: "middle",
    right: "10%",
    textStyle: {
      color: '#f2f2f2',
      fontSize: 32,
    },
    formatter: function (name: any) {
      return name + '\r\r\r' + data.find(item => item.name == name)?.value + '个'
    },
    icon: 'roundRect',
    data: data,
  },
  series: [
    // 主要展示层的
    {
      radius: ['70%', '80%'],
      center: ['30%', '50%'],
      type: 'pie',
      tooltip: {
        show: true
      },
      label: {
        normal: {
          show: false,
          formatter: "{c}%",
          textStyle: {
            fontSize: 30,

          },
          position: 'outside'
        },
        emphasis: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false,
          length: 30,
          length2: 55
        },
        emphasis: {
          show: true
        }
      },

      name: "民警训练总量",
      data: data,

    },
    // 边框的设置

    {
      name: '刻度盘',
      type: 'gauge',
      min: 0,
      max: 100,
      radius: '60%', //图表尺寸
      center: ['30%', '50%'],
      startAngle: 0,
      endAngle: 360,
      splitNumber: 10,
      z: 99,
      // 线
      axisLine: {
        lineStyle: {
          width: 5,
          color: [
            [1, '#022a6e']
          ]
        }
      },

      axisTick: {
        distance: -25,
        splitNumber: 6, //刻度的段落数
        length: 12,
        lineStyle: {
          color: '#05a4f2',
          width: 5
        }
      },
      splitLine: {
        //文字和刻度的偏移量
        show: true,
        distance: -25,
        length: 20, //长度
        lineStyle: {
          color: '#05a4f2',
          width: 2,
        },
      },
      // //刻度线文字
      axisLabel: {
        show: false,
        color: '#858A93',
        fontSize: 16,
        distance: -30,
      },
      pointer: {
        show: false,
      }


    }
  ]
};
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 910px !important;
  overflow: none !important;
  min-height: 648px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.bg {
  width: 910px;
  height: 648px;
  background: url('assets/image/TransportationAndTravel/tourist_attraction_bg.png') no-repeat center/cover;
  position: fixed;
  left: 1576px;
  top: 20%;
  padding: 0 20px;
}


.body-box {
  padding: 40px;
  height: 500px;
}
</style>
