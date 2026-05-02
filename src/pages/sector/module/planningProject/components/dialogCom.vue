<template>
    <q-dialog v-model="alert" seamless>
        <div class="bg">
            <!-- 关闭按钮 -->
            <div class="close" @click="close"></div>
            <!-- 切换弹窗按钮 -->
            <div class="switch-a" @click="switchBtn" :style="{ right: (!showLink ?'160px': '250px')}"></div>
            <div class="switch-b" @click="switchLink" v-if="showLink"></div>
            <!-- 标题 -->
            <div class="chat-title">{{ props.title }}</div>
            <div style="display: flex; flex-direction: column; height: 100%;padding:160px 70px 50px;">
                <slot></slot>
            </div>
        </div>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    showLink:{
        type:Boolean,
        default:true
    }
})

const $emit = defineEmits(['switchBtn', 'switchLink'])

const alert = ref(false)

function switchBtn() {
    $emit('switchBtn')
}

function switchLink() {
    $emit('switchLink')
}


function show() {
    alert.value = true
}

function close() {
    alert.value = false
}

defineExpose({
    show,
    close
})
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized>div {
    max-width: 2095px !important;
    min-height: 1190px !important;
}

.q-dialog__inner>div {
    overflow: visible !important;
}

.bg {
    background: url('assets/component/home_right_img/切图 89.png') no-repeat 100%/100%;
    width: 2095px !important;
    height: 1190px !important;
    position: absolute;
    top: 410px;
    left: 1793px;

    .close {
        width: 42px;
        height: 42px;
        background: url('assets/image/lefty/close-btn.png') no-repeat 100%/100%;
        position: absolute;
        right: 75px;
        top: 80px;
    }

    .switch-a {
        width: 66px;
        height: 64px;
        background: url('assets/image/lefty/diachange.png') no-repeat 100% / 100%;
        position: absolute;
        right: 250px;
        top: 75px;
    }

    .switch-b {
        width: 66px;
        height: 64px;
        background: url('assets/image/lefty/切图 45.png') no-repeat 100% / 100%;
        position: absolute;
        right: 160px;
        top: 75px;
    }

    .chat-title {
        font-family: AlibabaPuHuiTiRegular;
        font-weight: 700;
        font-size: 50px;
        line-height: 60px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        position: absolute;
        letter-spacing: 10px;
        left: 145px;
        top: 30px;
        color: #fff;
        // 文字倾斜
        transform: skewX(-10deg);
    }
}
</style>
