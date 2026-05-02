<template>
  <div class="cascader-box">
    <q-dialog :model-value="modelValue" transition-show="slide-down" transition-hide="slide-up" @hide="handelHide">
      <div class="cascader-con">
        <div class="layou1">
          <div class="list-box">
            <div v-for="item in meunList" class="item" :class="activeMenu[0] == item.id ? 'active' : ''"
              @click="handleClick(item, 1)">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="layou2" v-if="menu2.length > 0">
          <div class="list-box">
            <div v-for="item in menu2" class="item" :class="activeMenu[1] == item.id ? 'active' : ''"
              @click="handleClick(item, 2)">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="layou3" v-if="menu3.length > 0">
          <div class="list-box">
            <div v-for="item in menu3" class="item" :class="activeMenu[2] == item.id ? 'active' : ''"
              @click="handleClick(item, 3)">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <el-cascader v-model="value" :show-all-levels="false" :options="options" :props="props" @change="handleChange" /> -->
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';

const seamless = ref(true)

const props = defineProps({
  meunList: {
    type: Array as PropType<{ title: string, id: string, children: { title: string, id: string, children: { title: string, id: string }[] }[] }[]>,
    default: []
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const activeMenu = ref(['1', '', ''])

const menu2 = computed(() => {
  const menu = props.meunList.find(item => item.id === activeMenu.value[0])
  return menu?.children || []
})

const menu3 = computed(() => {
  const menu = menu2.value.find(item => item.id === activeMenu.value[1])
  return menu?.children || []
})


const $emit = defineEmits(['changeCascader', 'update:modelValue'])

function handelHide() {
  $emit('update:modelValue', false)
  activeMenu.value = ['1', '', '']
}

function handleClick(item: { title: string, id: string, children?: { title: string, id: string }[] }, level: number) {
  if (level === 1) {
    activeMenu.value[0] = item.id
    activeMenu.value[1] = ''
    activeMenu.value[2] = ''
  } else if (level === 2) {
    activeMenu.value[1] = item.id
    activeMenu.value[2] = ''
  } else if (level === 3) {
    activeMenu.value[2] = item.id
  }

  if (item.id == '1') return; //说明点击的是首页 就不执行事件
  if (item.children?.length == 0) {
    //说明是最后一级菜单 可以执行跳转操作
    console.log('执行跳转操作', item);
    $emit('changeCascader', item)
  }
}


</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1400px !important;
  overflow: none !important;
  min-height: 656px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.cascader-con {
  max-width: 1400px;
  height: 656px;
  // background: pink;
  background-size: 100% 100%;
  position: fixed;
  left: 140px;
  top: 300px;
  box-sizing: border-box;
  display: flex;
}

.item {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  // line-height: 115px;
  text-align: center;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: #000;
}

.list-box {
  overflow: scroll;
  height: 100%;
}

.layou1 {
  width: 445px;
  height: 656px;
  background: url('assets/image/cascader/bg1.png') no-repeat;
  background-size: 100% 100%;
  padding: 45px 42px;
  // overflow: hidden;


  & .item {
    width: 365px;
    height: 115px;
    // line-height: 115px;
  }

  .active {
    background: url('assets/image/cascader/item_bg1.png') no-repeat;
    background-size: 100% 100%;

    &>span {
      background: linear-gradient(180deg, #FFAE57 0%, #FFF0E4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }
  }
}

.layou2 {
  width: 454px;
  height: 380px;
  background: url('assets/image/cascader/bg2.png') no-repeat;
  background-size: 100% 100%;

  padding: 45px 40px;

  & .item {
    width: 383px;
    height: 96px;
    // line-height: 96px;
  }

  .active {
    background: url('assets/image/cascader/item_bg2.png') no-repeat;
    background-size: 100% 100%;

    &>span {
      background: linear-gradient(180deg, #FFAE57 0%, #FFF0E4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }
  }
}

.layou3 {
  width: 481px;
  height: 656px;
  background: url('assets/image/cascader/bg3.png') no-repeat;
  background-size: 100% 100%;

  padding: 45px 40px;

  & .item {
    width: 401px;
    height: 81px;
    // line-height: 81px;
  }

  .active {
    background: url('assets/image/cascader/item_bg3.png') no-repeat;
    background-size: 100% 100%;

    &>span {
      background: linear-gradient(180deg, #FFAE57 0%, #FFF0E4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }
  }
}
</style>
