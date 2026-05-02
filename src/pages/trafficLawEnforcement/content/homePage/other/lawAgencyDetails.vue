<!-- 执法机构详情 -->
<template>
  <div class="law-agency-details column gap-[30px]">
    <div class="row ">
      <div class="title">
        机构名称：
      </div>
      <div class="content">
        {{ infoText.institutionName }}
      </div>
    </div>
    <div class="row">
      <div class="title">
        机构规格：
      </div>
      <div class="content">
        {{ infoText.institutionalSpecifications }}
      </div>
    </div>
    <div class="column">
      <div class="title">
        主要职责
      </div>
      <div class="content  t-top">
        {{ infoText.responsibilities }}
      </div>
    </div>
    <div class="column">
      <div class="title">
        内设机构
      </div>
      <div class="content column  t-top">
        <div class="content-item" v-for="item in infoText.internalInstitutions" :key="item.text">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="column">
      <div class="title">
        人员编制和领导职数
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
  institutionName: "承德市交通运输综合行政执法支队",
  institutionalSpecifications: "副处级",
  responsibilities: "（一)负责监督交通运输行政法律、法规、规章和国务院、省、市人民政府交通运输主管部门有关政策、制度及其他规范性文件执行工作。",
  internalInstitutions: [
    {
      text: "综合指挥中心：负责本单位党务、政务运转、案件预审、后勤保障工作;组织、协调、指导治超工作;",
    },
    {
      text: "执法一队:负责法律法规明确由市级承担的交通运输领域行政执法具体工作；",
    },
    {
      text: "执法二队：负责交通运输非现场执法和信息化执法工作；",
    },
    {
      text: "执法三队：负责管辖内高速公路路政执法，保护路产路权、实施路政巡查；",
    },
  ],
  Staffing: "财政性资金零补助事业编制205名，支队长1名（副处级）、副支队长3名（正科级）;内设机构8个，内设机构领导职数28名（正科8名、副科20名）"
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
