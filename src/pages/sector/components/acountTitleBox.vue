<template>
    <div class="container-header-item">
        <div></div>
        <div><span>{{ text }}</span><span :style="style">{{ value }}{{ unit }}</span></div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    text: string,
    value: string | number,
    unit: string,
    style?: Record<string, string>
}>(), {
style: () => ({
    fontFamily: 'YouSheBiaoTiHei, PingFang SC, Microsoft YaHei, sans-serif',
    fontWeight: '400',
    fontSize: '46px',
    lineHeight: '60px',
    fontStyle: 'normal',
    textTransform: 'none',
    background: 'linear-gradient(to bottom, #FFB579 0%, #FFEFB8 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    MozBackgroundClip: 'text',
    MozTextFillColor: 'transparent',
    whiteSpace: 'nowrap'
 })
})
</script>

<style scoped lang="scss">
.container-header-item {
    display: flex;
    align-items: center;
    column-gap: 25px;
}

.container-header-item div:first-child {
    width: 23px;
    height: 22px;
    background: linear-gradient(158deg, #D0E5E5 0%, rgba(208, 229, 229, 0) 100%);
    border-radius: 50%;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: #60D9FF;
        border-radius: 50%;
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
    }
}

.container-header-item div:last-child {
    display: flex;
    align-items: center;

    span:first-child {
        font-family: "AlibabaPuHuiTiRegular", PingFang SC, Microsoft YaHei, sans-serif;
        font-weight: 400;
        font-size: 30px;
        line-height: 42px;
        font-style: normal;
        text-transform: none;
        color: #FFFFFF;
        margin-right: 20px;
        white-space: nowrap;
    }
}
</style>