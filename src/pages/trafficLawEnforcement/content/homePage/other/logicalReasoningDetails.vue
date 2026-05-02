<!-- 执法机构详情 -->
<template>
  <div class="law-agency-details column gap-[30px]">
    <div class="row ">
      <div class="title">
        案件名称：
      </div>
      <div class="content">
        {{ infoText.institutionName }}
      </div>
    </div>
    <div class="column">
      <div class="title">
        一、案件基本情况
      </div>
      <div class="content  t-top">
        {{ infoText.responsibilities }}
      </div>
    </div>
    <div class="column">
      <div class="title">
        二、说理式执法开展情况
      </div>
      <div class="content  t-top">
        {{ infoText.Staffing }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { text } from "d3";
import { ref } from "vue";

/**选择的执法机构 */
const infoText = ref<any>({
  institutionName: "沈秀伟擅自超限运输行驶公路案",
  responsibilities: "2024年10月25日，围场县交通运输综合执法大队与公安交警在半截塔联合执法巡查时，发现车牌号为津AT7759货车涉嫌超限超载运输。现场执法人员出示执法证件表明身份后，将该车引导到围场县牌楼联合治超站称重检测，经称重检测该车车货总重41.吨，车辆超限16.7吨。经询问当事人沈秀伟表示，该车于2024年10月25日在河北承克高速公路有限公司装载水泥，运往围场县牌楼乡，因短途运输想多拉点，导致车辆超载。该车超限超载运输行为违反了《中华人民共和国公路法》第五十条、《公路安全保护条例》第三十三条、《超限运输车辆行驶公路管理规定》第三条等有关规定，根据《交通运输部公安部关于治理车辆超限超载联合执法常态化制度化工作的实施意见（试行）》（交公路发[2017]173文件要求，由公路管理机构责令并监督消除违法状态，由公安売城交警做出",
  Staffing: "一是讲明法理。在确认违法事实成立后，综合执法大队治超执法人员坚持“沟通+教育+普法”相结合的原则，充分与当事人沟通,稳定当事人情绪，向当事人摆事实，讲道理，阐依据、析利弊。讲清超限超载的危害性，帮助当事人了解其行为违反的具体条款，同比对拟做出的行政处罚决定的对拟做出的行政处罚决定的事实、理由、依据及违法内容进行详细解释，并告知当事人对所违反的相关法律、法规，应承担的义务和享有的陈述申辩权利。二是讲清事理。对于短途拉载超限超载货物行为，当事人表示问题不大，对路面造成不了太多影响。执法人员耐心解释认定事实证据和法律依据，从法律规定到违法案例，对处罚依据和违法后果进行耐心细致的普法解读，采用多种方式强化普法宣传使当事人明白了自己的违法行为，充分理解了学法守法的重要性。三是讲透情理。通过情理沟通，消除了当事人不理解心理，思想上发生了转变，并表示今后按规定装载运输货物。联合治超站执法人员考虑到该车装载的"
});
</script>

<style scoped lang="scss">
.law-agency-details {
  width: 100%;
  height: 100%;
  padding: 27px 25px;
}

.title {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 700;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 36px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.content {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 700;
  font-size: 32px;
  color: #d0d0d0;
  line-height: 36px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.t-top {
  padding-top: 30px;
}

.content-item {
  padding: 10px 0;
}
</style>
