<!--视频监控列表-->
<template>
  <div class="surveillance-list">
    <div class="surveillance-list-content">
      <ItemTitle title="监控列表" />
      <div class="list-view">
        <div class="list-view-body">
          <div class="list-view-content">
            <div class="search-content">
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
                <div class="col-auto">
                  <el-input v-model="state.searchText" class="search-input" placeholder="请输入监控名称" prefix-icon="Search"
                    clearable />
                </div>
                <div class="col-auto">
                  <q-btn label="查询" class="search-btn" @click="searchData" />
                </div>
                <div class="col text-center">
                  <el-switch v-model="state.searchType" active-value="online" inactive-value="all" style="
                      --el-switch-on-color: #33A4CA;
                      --el-switch-off-color: #093458;
                    " class="search-switch" @change="switchChangge" />
                  <div class="switch-label">
                    {{
                      state.searchType === "online" ? "仅显示在线" : "显示全部"
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="scroll-area-list">
              <q-scroll-area class="fit" :thumb-style="state.thumbStyle" :bar-style="state.barStyle">
                <q-tree v-if="!state.loading" class="video-tree" dark accordion no-connectors
                  :nodes="state.surveillanceList" node-key="id" no-nodes-label="暂无监控" no-results-label="未查询到监控"
                  v-model:expanded="state.expanded">
                  <template v-slot:default-header="prop">
                    <div class="row items-center tree-item-header" v-if="prop.node.children"
                      @click="selectParentNode(prop.node)" :class="{
                        'tree-item-header-active': state.selectedParent === prop.node.id,
                      }">
                      <div class="col-auto" v-if="prop.node.children && prop.node.children.length > 0
                      ">
                        <q-icon :name="`img:${icon1}`" class="tree-item-icon"
                          v-if="state.expanded.indexOf(prop.node.id) !== -1"></q-icon>
                        <q-icon :name="`img:${icon2}`" class="tree-item-icon" v-else></q-icon>
                      </div>
                      <div class="col-auto">
                        <q-img v-if="prop.node.nodeType !== 'group' &&
                          prop.node.nodeType !== 'speed'
                        " :src="img1" class="tree-item-avatar"></q-img>
                        <q-img v-if="prop.node.nodeType == 'group'" :src="img2" class="tree-item-avatarGroup"></q-img>
                        <q-img v-if="prop.node.nodeType == 'speed'" :src="img3" class="tree-item-avatarSpeed"></q-img>
                      </div>
                      <div class="col">
                        <div class="row items-center">
                          <div class="col-auto">
                            <span class="tree-item-header-label">{{
                              prop.node.label
                            }}</span>
                          </div>
                          <div class="col-auto">
                            <span class="tree-item-header-brackets">[</span>
                          </div>
                          <div class="col-auto">
                            <span class="tree-item-header-online">{{
                              prop.node.online
                            }}</span>
                          </div>
                          <div class="col-auto">
                            <span class="tree-item-header-sway">/</span>
                          </div>
                          <div class="col-auto" v-if="state.searchType === 'all'">
                            <span class="tree-item-header-offline">{{
                              prop.node.offline
                            }}</span>
                          </div>
                          <div class="col-auto" v-if="state.searchType === 'all'">
                            <span class="tree-item-header-sway">/</span>
                          </div>
                          <div class="col-auto">
                            <span class="tree-item-header-total">
                              {{ prop.node.total }}
                            </span>
                          </div>
                          <div class="col-auto">
                            <span class="tree-item-header-brackets">]</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row items-center tree-item-header" v-else @click="selectNode(prop.node)">
                      <div class="col-auto">
                        <q-img :src="img4" v-if="prop.node.online" class="tree-item-avatar"></q-img>
                        <q-img :src="img5" v-else class="tree-item-avatar"></q-img>
                      </div>
                      <div class="col">
                        <span class="tree-item-header-label" :class="{
                          'tree-selected': state.selected === prop.node.id,
                        }">{{ prop.node.label }}</span>
                      </div>
                      <div class="col-auto">
                        <div class="row items-center">
                          <div class="col-auto">
                            <div class="state-online" :class="{ 'state-offline': !prop.node.online }"></div>
                          </div>
                          <div class="col">
                            <span class="state-online-label" :class="{
                              'state-offline-label': !prop.node.online,
                            }">
                              {{ prop.node.online ? "在线" : "离线" }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </q-tree>
                <q-inner-loading dark :showing="state.loading">
                  <q-spinner-ios color="primary" class="loading-icon" />
                  <div class="loading-label">数据加载中...</div>
                </q-inner-loading>
              </q-scroll-area>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="surveillanceList">
import {
  defineAsyncComponent,
  reactive,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { legendInfo } from "src/stores/legendInfo";
import icon1 from 'src/assets/image/cdsgl/videoSurveillance/开.png'
import icon2 from 'src/assets/image/cdsgl/videoSurveillance/关.png'
import img1 from 'src/assets/image/cdsgl/videoSurveillance/一级监控.png'
import img2 from 'src/assets/image/cdsgl/videoSurveillance/高速集团.png'
import img3 from 'src/assets/image/cdsgl/videoSurveillance/高速.png'
import img4 from 'src/assets/image/cdsgl/videoSurveillance/在线监控.png'
import img5 from 'src/assets/image/cdsgl/videoSurveillance/离线监控.png'
const ItemTitle = defineAsyncComponent(
  () => import("pages/videoSurveillance/models/ItemTitle.vue")
);
//小标题
const TitleSmall = defineAsyncComponent(
  () => import("pages/videoSurveillance/models/TitleSmall.vue")
);

const state = reactive({
  loading: false,
  surveillanceData: [
    {
      id: 1,
      label: "高速公路",
      children: [
        {
          id: 2,
          label: "高速集团",
          nodeType: "group",
          children: [
            {
              id: 3,
              label: "G25 长深高速",
              nodeType: "speed",
              children: [
                {
                  id: 4,
                  label: "监控名称",
                  x: 117.9645,
                  y: 40.94476,
                  online: true,
                  children: null,
                },
                {
                  id: 5,
                  label: "监控名称2",
                  x: 117.98389,
                  y: 40.98922,
                  online: true,
                  children: null,
                },
                {
                  id: 6,
                  label: "监控名称3",
                  x: 117.98681,
                  y: 41.02492,
                  online: true,
                  children: null,
                },
                {
                  id: 7,
                  label: "监控名称4",
                  x: 118.00467,
                  y: 41.06132,
                  online: true,
                  children: null,
                },
                {
                  id: 8,
                  label: "监控名称5",
                  x: 118.02904,
                  y: 41.06767,
                  online: true,
                  children: null,
                },
                {
                  id: 9,
                  label: "监控名称6",
                  x: 118.08277,
                  y: 41.06252,
                  online: true,
                  children: null,
                },
                {
                  id: 10,
                  label: "监控名称7",
                  x: 118.12225,
                  y: 41.05617,
                  online: false,
                  children: null,
                },
                {
                  id: 11,
                  label: "监控名称8",
                  x: 118.1813,
                  y: 41.04775,
                  online: false,
                  children: null,
                },
                {
                  id: 12,
                  label: "监控名称9",
                  x: 118.21718,
                  y: 41.04054,
                  online: false,
                  children: null,
                },
                {
                  id: 13,
                  label: "监控名称10",
                  x: 118.24345,
                  y: 41.00123,
                  online: false,
                  children: null,
                },
                {
                  id: 14,
                  label: "监控名称11",
                  x: 118.24808,
                  y: 40.999,
                  online: false,
                  children: null,
                },
                {
                  id: 15,
                  label: "监控名称12",
                  x: 118.31451,
                  y: 40.97239,
                  online: false,
                  children: null,
                },
              ],
            },
            {
              id: 16,
              label: "G45 大广高速",
              nodeType: "speed",
              children: [
                {
                  id: 17,
                  label: "监控名称13",
                  x: 118.04123,
                  y: 41.28284,
                  online: true,
                  children: null,
                },
                {
                  id: 18,
                  label: "监控名称14",
                  x: 118.04054,
                  y: 41.20319,
                  online: true,
                  children: null,
                },
                {
                  id: 19,
                  label: "监控名称15",
                  x: 118.05702,
                  y: 41.13659,
                  online: true,
                  children: null,
                },
                {
                  id: 20,
                  label: "监控名称16",
                  x: 118.09616,
                  y: 41.44764,
                  online: true,
                  children: null,
                },
                {
                  id: 21,
                  label: "监控名称17",
                  x: 118.09384,
                  y: 41.36228,
                  online: false,
                  children: null,
                },
                {
                  id: 22,
                  label: "监控名称18",
                  x: 118.09625,
                  y: 41.39936,
                  online: false,
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 23,
      label: "国省干道重点路段",
      children: [
        {
          id: 24,
          label: "G101 北京-沈阳",
          nodeType: "speed",

          children: [
            {
              id: 25,
              label: "监控名称19",
              x: 118.02578,
              y: 40.85936,
              online: true,
              children: null,
            },
            {
              id: 26,
              label: "监控名称20",
              x: 118.1353,
              y: 40.85558,
              online: false,
              children: null,
            },
          ],
        },
      ],
    },
    {
      id: 27,
      label: "城市重要路段",
      children: [
        {
          id: 28,
          label: "秀水大道",
          nodeType: "speed",
          children: [
            {
              id: 29,
              label: "监控名称21",
              x: 117.78026,
              y: 40.92341,
              online: true,
              children: null,
            },
            {
              id: 30,
              label: "监控名称22",
              x: 117.7897,
              y: 40.89817,
              online: false,
              children: null,
            },
          ],
        },
      ],
    },
  ] as any,
  surveillanceList: [] as any,
  searchText: "",
  searchType: "online",
  selected: null as any,
  selectedParent: null as any,
  expanded: [] as any,
  thumbStyle: {
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be3",
    width: "5px",
    opacity: 0.75,
  } as any,

  barStyle: {
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be3",
    width: "9px",
    opacity: 0.2,
  } as any,
  pickhandler: null as any,
});

const storeLegendInfo = legendInfo();

/**加载监控数据 */
const loadData = () => {
  switchChangge();
};

/**树选中事件 */
const selectParentNode = async (node: any) => {
  state.selectedParent = node.id;
};

/**树选中事件 */
const selectNode = async (node: any) => {
  state.selected = node.id;
};

/**查看全部/仅查看在线 */
const switchChangge = () => {
  state.loading = true;
  if (state.searchType === "all") {
    setTreeNumData(state.surveillanceData);
    state.surveillanceList = state.surveillanceData;
  } else {
    var res = setSwitchData(state.surveillanceData, state.searchType);
    setTreeNumData(res);
    state.surveillanceList = res;
  }
  state.loading = false;
  initLegendsData();
};

/**初始化数据 */
const initLegendsData = () => {
  var legendGroup = [] as any;
  var legendData = getAllVideoPoint(state.surveillanceList);
  if (state.searchType === "all") {
    legendGroup = [
      {
        label: "在线监控",
        code: "online-videoSurveillance",
        icon: "img:icons/cdsgl/videoSurveillance/在线监控撒点.svg",
        poiImg: "icons/cdsgl/videoSurveillance/在线监控撒点.svg",
        selected: true,
        data: [] as any,
      },
      {
        label: "离线监控",
        code: "offline-videoSurveillance",
        icon: "img:icons/cdsgl/videoSurveillance/离线监控撒点.svg",
        poiImg: "icons/cdsgl/videoSurveillance/离线监控撒点.svg",
        selected: true,
        data: [] as any,
      },
    ];
    legendData.forEach((item: any) => {
      if (item.online) {
        item["code"] = legendGroup[0].code;
        legendGroup[0].data.push(item);
      } else {
        item["code"] = legendGroup[1].code;
        legendGroup[1].data.push(item);
      }
    });
  } else {
    legendGroup = [
      {
        label: "在线监控",
        code: "online-videoSurveillance",
        icon: "img:icons/cdsgl/videoSurveillance/在线监控撒点.svg",
        poiImg: "icons/cdsgl/videoSurveillance/在线监控撒点.svg",
        selected: true,
        data: [],
      },
    ];
    legendData.forEach((item: any) => {
      if (item.online) {
        item["code"] = legendGroup[0].code;
        legendGroup[0].data.push(item);
      }
    });
  }
  //设置撒点图例
  storeLegendInfo.setPointLegend(legendGroup);
};

/**检索数据 */
const setSwitchData = (datas: any, keyword: any) => {
  return datas
    .map((node: any) => {
      const newNode = { ...node };
      if (newNode.children) {
        newNode.children = setSwitchData(newNode.children, keyword);
      }
      return newNode;
    })
    .filter(
      (node: any) =>
        (keyword === "online" && node.online === true) ||
        (node.children && node.children.length > 0)
    );
};

/**检索列表数据 */
const searchData = () => {
  if (state.searchText !== "") {
    var res = setSearchData(state.surveillanceData, state.searchText);
    setTreeNumData(res);
    state.surveillanceList = res;
  } else {
    setTreeNumData(state.surveillanceData);
    state.surveillanceList = state.surveillanceData;
  }
};

/**检索数据 */
const setSearchData = (datas: any, keyword: any) => {
  return datas
    .map((node: any) => {
      const newNode = { ...node };
      if (newNode.children) {
        newNode.children = setSearchData(newNode.children, keyword);
      }
      return newNode;
    })
    .filter(
      (node: any) =>
        node.label.includes(keyword) ||
        (node.children && node.children.length > 0)
    );
};

/**设置树列表数量数据 最后一级children不能为[]*/
const setTreeNumData = (datas: any) => {
  //判断是否为最后一级
  var count = datas.filter((x: any) => x.children).length;
  if (count > 0) {
    //不为最后一级时,循环获取子类数量
    for (var i = 0; i < datas.length; i++) {
      var item = datas[i];
      var childnum = setTreeNumData(item.children);
      if (childnum) {
        item["total"] = childnum.total;
        item["online"] = childnum.online;
        item["offline"] = childnum.offline;
      } else {
        var number = { total: 0, online: 0, offline: 0 } as any;
        for (var j = 0; j < item.children.length; j++) {
          var child = item.children[j];
          number.total += child.total;
          number.online += child.online;
          number.offline += child.offline;
        }
        item["total"] = number.total;
        item["online"] = number.online;
        item["offline"] = number.offline;
      }
    }
  } else {
    var number = { total: 0, online: 0, offline: 0 } as any;
    //最后一级直接统计数据
    number.total = datas.length;
    number.online = datas.filter((x: any) => x.online === true).length;
    number.offline = datas.filter((x: any) => x.online === false).length;
    return number;
  }
};

/**移除撒点 */
const removeAllPois = () => {
  //设置撒点图例
  storeLegendInfo.setPointLegend(null);
};

/**获取所有的监控点位 */
const getAllVideoPoint = (datas: any) => {
  var result = [] as any;
  for (var i = 0; i < datas.length; i++) {
    var item = datas[i];
    if (item.children) {
      var res = getAllVideoPoint(item.children);
      if (res.length > 0) {
        result = result.concat(res);
      }
    } else {
      if (item.x && item.y) {
        result.push(item);
      }
    }
  }
  return result;
};

/**页面关闭 */
const closePage = () => {
  removeAllPois();
};

/**监听检索框内容发生变化 */
watch(
  () => state.searchText,
  () => {
    if (!state.searchText || state.searchText === "") {
      searchData();
    }
  },
  {
    deep: true,
  }
);

onMounted(() => {
  loadData();
});

onUnmounted(() => {
  closePage();
});
</script>
<style scoped>
.surveillance-list {
  width: 100%;
  background-image: url("assets/image/cdsgl/videoSurveillance/box-new (2).png");
  /* margin-top: 50px; */
  background-size: 100% 100%;
  z-index: 1000;
  /* box-sizing: border-box; */
  overflow: hidden;
  object-fit: cover;
  height: 100%;
}

.surveillance-list-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.surveillance-list-title {
  width: 730px;
  height: 64px;
  background-image: url("assets/image/cdsgl/videoSurveillance/监控列表标题.png");
  background-size: 100% 100%;
}

.list-view {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.list-view-body {
  width: 100%;
  height: 100%;
  /* padding: 30px 30px 24px 30px; */
}

.list-view-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.search-content {
  width: 100%;
  position: absolute;
  top: 0;
  height: 154px;
  display: flex;
  align-items: center;
}

.search-input {
  width: 440px;
  height: 88px;
  font-size: 32px;
}

.search-input :deep(.el-input__icon) {
  font-size: 40px;
}

.search-input :deep(.el-input__inner) {
  color: #ffffff !important;
}

.search-input :deep(.el-input__wrapper) {
  box-shadow: none;
  background: #0E1F33;
  border-radius: 10px 10px 10px 10px;
  border: 3px solid #265076;
  opacity: 0.74;
}

.search-btn {
  margin-left: 10px;
  width: 118px;
  height: 76px;
  background: linear-gradient(360deg, rgba(59, 119, 189, 0) 0%, rgba(59, 119, 189, 0) 25%, #3999DF 100%);
  border-radius: 10px 10px 10px 10px;
  border: 2px solid rgba(84, 167, 228, 0.5);
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 28px;
  color: #F5FBFF;
  line-height: 40px;
  font-style: normal;
  text-transform: none;
}

.search-switch {
  width: 102px;
  height: 48px;
  line-height: 48px;
}

.search-switch :deep(.el-switch__core) {
  width: 102px !important;
  height: 48px;
  border-radius: 88px;
}

.search-switch :deep(.el-switch__action) {
  width: 42px;
  height: 42px;
}

.is-checked :deep(.el-switch__action) {
  left: calc(100% - 42px) !important;
}

.switch-label {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 24px;
  color: #9bd5ff;
  line-height: 48px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.scroll-area-list {
  width: 100%;
  height: 100%;
  padding-top: 154px;
}

.video-tree :deep(.material-icons) {
  display: none;
}

.video-tree :deep(.q-tree__node-header) {
  padding: 0 0 10px 0;
}

/* .video-tree :deep(.q-tree__node) {
  padding: 0;
} */

.video-tree :deep(.q-tree__children) {
  padding: 0 15px 0 15px;
}

.video-tree :deep(.q-tree__node) {
  padding: 0;
}

.tree-item-header {
  width: 100%;
  height: 81px;

  border-radius: 0px 0px 0px 0px;
}

.tree-item-header-active {
  width: 100%;
  border: 2px solid rgba(132, 195, 255, 0.5);
  border-radius: 0px 0px 0px 0px;
  background: linear-gradient(90deg, rgba(38, 107, 174, 0.35) 0%, #266BAE 67%, #34A7CB 100%);
}

.tree-item-avatar {
  /* padding: 0 20px 0 12px; */
  width: 120px;
  height: 81px;

}

.tree-item-avatarGroup {
  width: 48px;
  height: 14px;
  margin: 0 30px;
}

.tree-item-avatarSpeed {
  width: 34px;
  height: 14px;
  margin: 0 30px;
}

.tree-item-icon {
  font-size: 50px;
  display: block !important;
  color: #84ccff;
  margin-left: 20px;
}

.tree-item-header-label {
  padding-right: 20px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 36px;
  color: #fffaf9;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.tree-item-header-brackets {
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 32px;
  color: #5aafff;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.tree-item-header-sway {
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 32px;
  color: #fffaf9;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.tree-item-header-online {
  padding: 0 10px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 32px;
  color: #04e16b;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.tree-item-header-offline {
  padding: 0 10px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 32px;
  color: #f7233b;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.tree-item-header-total {
  padding: 0 10px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 32px;
  color: #fffaf9;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.state-online {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background: #04e16b;
  border-radius: 10px 10px 10px 10px;
}

.state-online-label {
  padding-right: 24px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: normal;
  font-size: 30px;
  color: #04e16b;
  line-height: 28px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.state-offline {
  background: #ff3535;
}

.state-offline-label {
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: normal;
  font-size: 24px;
  color: #ff3535;
  line-height: 28px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.loading-icon {
  font-size: 60px;
}

.loading-label {
  color: #5aafff !important;
  padding-top: 30px;
  font-size: 35px;
}

.tree-selected {
  color: #5aafff !important;
}
</style>
