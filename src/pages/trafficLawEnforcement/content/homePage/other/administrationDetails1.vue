<!-- 执法机构详情 -->
<template>
  <div class="law-agency-details column gap-[30px]">
    <div class="row ">
      <div class="title">
        违法行为：
      </div>
      <div class="content">
        <!-- {{ infoText.institutionName }} -->
        造成公路路面损坏、污染或者影响公路畅通行为
      </div>
    </div>
    <div class="column">
      <div class="title">
        具体情形：
      </div>
      <div class="content  t-top">
        <!-- {{ infoText.institutionalSpecifications }} -->
        在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障碍、挖沟引水、利用公路边沟排放污物或者进行其他损坏、污
        染公路和影响公路畅通的
      </div>
    </div>
    <div class="column">
      <div class="title">
        法定依据
      </div>
      <div class="content  t-top">
        《中华人民共和国公路法》第四十六条 任何单位和个人不得在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置。
        障碍、挖沟引水、利用公路边沟排放污物或者进行其他损坏、污染公路和影响公路畅通的活动。
        <!-- {{ infoText.responsibilities }} -->
      </div>
    </div>
    <div class="row gap-[250px]">
      <div>
        <div class="title">
          行政命令
        </div>
        <div class="content">
          <!-- {{ infoText.responsibilities }} -->
          责令改正
        </div>
      </div>
      <div>
        <div class="title">
          执法层级
        </div>
        <div class="content">
          <!-- {{ infoText.responsibilities }} -->
          设区的市、县级交通运输主管部门
        </div>
      </div>
    </div>
    <div class="column">
      <div class="title">
        免罚情形（需同时满足）
      </div>
      <div class="content  t-top">
        {{ infoText.Staffing }}
      </div>
    </div>
    <div class="column">
      <div class="title">
        备注
      </div>
      <div class="content  t-top">
        <!-- {{ infoText.Staffing }} -->
        无
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
  Staffing: "1.首次实施违法行为。2.违法行为调查过程中，不存在拒不接受执法部门调查处理、阻碍执法、煽动抗拒执法等妨碍执行公务的行为。"
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
  font-size: 40px;
  color: #FFFFFF;
  line-height: 40px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.content {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 700;
  font-size: 40px;
  color: #d0d0d0;
  line-height: 40px;
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
