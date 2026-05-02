<template>
    <div class="bg">
        <div class="title-bg">
            <div class="title">
                {{ props.title }}
            </div>
        </div>
        <div class="body-box">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        default: '标题名称'
    }
})

</script>

<style lang="scss" scoped>
.bg {
    background: url('assets/image/lefty/切图 134.png') no-repeat center/cover;
    width: 717px;
    height: 439px;
    padding:20px;
    display: flex;
    flex-direction: column;

    .title-bg {
        background: url('assets/image/lefty/切图 48.png') no-repeat 100%/100%;
        height: 80px;
        width: 628px;

        .title {
            font-family: AlibabaPuHuiTiRegular;
            font-weight: 400;
            font-size: 40px;
            color: #F2FEFF;
            line-height: 55px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            padding-left: 55px;
        }
    }
    .body-box{
        flex:1
    }
}
</style>
