<template>
  <section>
    <div class="green-circle">
      <div class="pink-circle">
        <img
          class="bottom-circle"
          src="https://gd-hbimg.huaban.com/1784343fe17d90f4de4bccf96594d0965c616f5947463-umfPH3_fw658webp"
          alt=""
        />
      </div>
    </div>
    <div class="swiper-box" id="swiperBox">
      <div
        v-for="(item, index) in list"
        :key="'img-' + index"
        class="loop-item"
        :style="{
          transform: `translate(-50%, -50%) rotate(${
            (360 / list.length) * index
          }deg) translateY(-17.5vh) rotateX(90deg)`,
        }"
      >
        <img class="alarm-img" :src="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => [
      "https://gd-hbimg.huaban.com/0c89e8d8eebbd8b3168051c9c32dda927b11041544c27-7h2Nuu_fw658webp",
      "https://gd-hbimg.huaban.com/d8ab30b96c90ef2c0428376d1df6e86df379ddc33b598-XfLbgw_fw658webp",
      "https://gd-hbimg.huaban.com/617a23ff457a8e7f403560601ee1986f0be521ce31262-yudWdl_fw658webp",
      "https://gd-hbimg.huaban.com/02381538312ca44802a7fb6140fdf79711d046d01e256-bGN4Hq_fw658webp",
      "https://gd-hbimg.huaban.com/2f625b869a53f799fdaf79c20ca7e0d96277767b39594-OQN9F9_fw658webp",
    ],
  },
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .green-circle {
    margin-top: 126px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 800px;
    height: 800px;
    transform-style: preserve-3d;
    transform: rotateX(60deg) rotate(18deg);
    background-color: #aee6b4;
    box-shadow: 19px 48px 27px #c5e3dd;
    border-radius: 50%;
    .pink-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 300px;
      background-color: rgba(255, 9, 9, 0.6);
      border-radius: 50%;
      box-shadow: 2px 2px 30px #c82d2d;
      .bottom-circle {
        width: 300px;
        object-fit: contain;
      }
    }
  }

  .swiper-box {
    position: relative;
    z-index: 200;
    width: 100%;
    transform-style: preserve-3d;
    animation: three-dimensions-circle 30s linear infinite;

    .loop-item {
      object-fit: cover;
      position: absolute;
      top: 50%;
      left: 50%;
      cursor: pointer;
      text-align: center;

      .loop-name {
        font-size: 14px;
        color: #ffffff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      img,
      .alarm-img {
        margin-top: 4px;
        width: 150px;
        height: 9.2vh;
      }
    }
  }
}

@keyframes three-dimensions-circle {
  0% {
    transform: rotateX(-108deg) rotate(0);
  }
  100% {
    transform: rotateX(-108deg) rotate(-360deg);
  }
}
</style>
