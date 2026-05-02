<template>
  <div class="bg">
    <ItemCard :titleSrc="png1" :iconSrc="png2" @moreFn="handelClick(1)">
      <rd-com1 />
    </ItemCard>
    <ItemCard :titleSrc="png3" :iconSrc="png4" @moreFn="handelClick(2)">
      <rd-com2 />
    </ItemCard>

    <HighseedDialog></HighseedDialog>
  </div>
</template>

<script setup>
import RdCom1 from './components/RdCom1.vue'
import RdCom2 from './components/RdCom2.vue'
import ItemCard from './components/ItemCard.vue'
import HighseedDialog from '../home/highwayOperation/highseed/highseedDialog.vue';
import { useBaiseInfoDialogStore, useHighseedStore, useTrunkLineStore } from '../home/highwayOperation/highseed/store/index.ts'
import png1 from "assets/component/公路运营系统-承德市公路网_slices/切图 249.png";
import png2 from "assets/component/公路运营系统-承德市公路网_slices/切图 73.png";
import png3 from "assets/component/公路运营系统-承德市公路网_slices/切图 251.png";
import png4 from "assets/component/公路运营系统-承德市公路网_slices/切图 73(1).png";

const highseedStore = useHighseedStore()
const trunkLineStore = useTrunkLineStore()

function handelClick(params) {
  switch (params) {
    case 1:
      highseedStore.openDialog()
      break;
    case 2:
      trunkLineStore.openDialog()
      break;

    default:
      break;
  }
}

</script>

<style lang="scss" scoped>
.bg {
  padding-top: 30px;
  height: 100%;

  // .item {
  //   margin: 0 auto;
  //   width: 1436px;
  //   height: 370px;
  //   background: url('assets/component/公路运营系统-承德市公路网_slices/切图 255.png') no-repeat center/cover;
  //   // background: pink;
  // }
}
</style>
