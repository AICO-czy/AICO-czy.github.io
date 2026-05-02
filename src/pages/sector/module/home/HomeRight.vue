<template>
  <div class="right-container">
    <div class="right-container-eays" @click="handleEays"></div>
    <div class="right-container-content">
      <div class="right-container-content-item" v-for="item in list" :key="item.id">
        <input type="checkbox" :id="`toggle-${item.id}`" class="toggle-checkbox" />
        <label :for="`toggle-${item.id}`" class="item-wrapper">
          <div class="right-container-content-img">
            <img :src="item.img" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="right-container-content-text">
            <span>{{ item.text }}</span>
            <div @click.stop="(event) => clickTextIcon(event, item)" class="text-icon"></div>
          </div>
        </label>
      </div>
    </div>
  </div>

  <q-dialog class="searchDialog" v-model="showlistVisible" seamless position="standard" transition-show="none"
    transition-hide="none">
    <div class="dialog-content">
      <div class="search-container">
        <div class="search-header">
          <div class="search-wrapper">
            <input
              type="text"
              class="search-input"
              placeholder="请输入"
              v-model="searchText"
              @input="handleSearch"
              @keyup.enter="onSearchClick"
            />
            <q-btn
              flat
              round
              dense
              class="search-btn"
              @click="onSearchClick"
            />
          </div>
        </div>
        <div class="tree-container">
          <div v-if="filteredTreeData.length === 0 && searchText" class="no-data">
            无数据
          </div>
          <q-tree
            v-else
            :nodes="filteredTreeData"
            node-key="id"
            label-key="label"
            children-key="children"
            :filter="searchText"
            :filter-method="customFilterMethod"
            default-expand-all
            class="custom-tree"
            v-model:selected="selectedNode"
            v-model:expanded="expandedNodes"
            selection="single"
            @update:selected="onNodeSelected"
          >
            <template v-slot:default-header="prop">
              <div
                class="tree-node-header"
                @click.stop="onNodeLabelClick(prop.node)"
              >
                <div
                  v-if="prop.node.children && prop.node.children.length > 0"
                  class="tree-node-expand-icon"
                  :class="{ 'expanded': expandedNodes.includes(prop.node.id) }"
                  @click.stop="toggleExpand(prop.node.id)"
                ></div>
                <div
                  v-else-if="prop.node.icon"
                  class="tree-node-icon"
                  :class="{
                    'icon-root': prop.node.icon === 'custom-root',
                    'icon-parent': prop.node.icon === 'custom-parent',
                    'icon-child': prop.node.icon === 'custom-child'
                  }"
                ></div>
                <span
                  class="tree-node-label"
                  @click.stop="handleLabelClick(prop.node)"
                >{{ prop.node.label }}</span>
              </div>
            </template>
          </q-tree>
        </div>
      </div>
    </div>
  </q-dialog>

  <!-- 视频弹窗组件 -->
  <VideoDialog />
</template>

<script setup lang="ts">
import view1 from 'assets/component/home_right_img/view1.jpg'
import view2 from 'assets/component/home_right_img/view2.jpg'
import view3 from 'assets/component/home_right_img/view3.jpg'
import { ref, computed } from 'vue';
import VideoDialog from '../../components/videoDialog.vue'
import { useVideoStore } from '../../store/video'

// 定义 props
interface Props {
  isRightDialogOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isRightDialogOpen: true
});

// 定义 emits
const emit = defineEmits<{
  hideRightDialog: [];
}>();

// 初始化 video store
const videoStore = useVideoStore()

// 双击相关状态
const clickTimer = ref<number | null>(null)
const clickCount = ref(0)

const hideRightDialog = () => {
  // console.log("Hiding right dialog");
  emit('hideRightDialog');
};

/**
 * @value type:['十四五','十五五']
 * @description 十四五/十五五 切换按钮组数据
*/
function handleTopTip(type: string) {
  // 这里应该处理具体的业务逻辑，而不是再发射事件
  // console.log('HomeRight handleTopTip:', type);
  // 在这里添加具体的处理逻辑
}

/**
 * @description 卡片组点击
 * card => ['十四五','十五五'] ; type => [1,2]
*/
function handleCardChang(card: any, type: any) {
  // 这里应该处理具体的业务逻辑，而不是再发射事件
  // console.log('HomeRight handleCardChang:', card, type);
  // 在这里添加具体的处理逻辑
}

// 暴露方法给父组件调用
defineExpose({
  handleTopTip,
  handleCardChang
});

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: string;
  expandable?: boolean;
}

const list = ref([
  { id: 1, text: '承克高速 施工现场监控5', img: view1 },
  { id: 2, text: '承克高速 施工现场监控5', img: view2 },
  { id: 3, text: '承克高速 施工现场监控5', img: view3 },
])

// 搜索相关
const searchText = ref('');
const showlistVisible = ref(false);
const selectedNode = ref<string>('');
const expandedNodes = ref<string[]>(['1', '2', '3', '1-1', '1-2', '3-1']); // 默认展开的节点

const treeData = ref<TreeNode[]>([
  {
    id: '1',
    label: '视频监控系统',
    icon: 'custom-root',
    children: [
      {
        id: '1-1',
        label: '高速公路监控',
        icon: 'custom-parent',
        children: [
          { id: '1-1-1', label: '承克高速 施工现场监控1', icon: 'custom-child' },
          { id: '1-1-2', label: '承克高速 施工现场监控2', icon: 'custom-child' },
          { id: '1-1-3', label: '承克高速 施工现场监控3', icon: 'custom-child' }
        ]
      },
      {
        id: '1-2',
        label: '国道监控',
        icon: 'custom-parent',
        children: [
          { id: '1-2-1', label: '国道101监控点1', icon: 'custom-child' },
          { id: '1-2-2', label: '国道101监控点2', icon: 'custom-child' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '交通流量统计',
    icon: 'custom-root',
    children: [
      { id: '2-1', label: '实时流量监测', icon: 'custom-child' },
      { id: '2-2', label: '历史流量分析', icon: 'custom-child' },
      { id: '2-3', label: '拥堵预警', icon: 'custom-child' }
    ]
  },
  {
    id: '3',
    label: '道路维护管理',
    icon: 'custom-root',
    children: [
      {
        id: '3-1',
        label: '维修计划',
        icon: 'custom-parent',
        children: [
          { id: '3-1-1', label: '年度维修计划', icon: 'custom-child' },
          { id: '3-1-2', label: '应急维修', icon: 'custom-child' }
        ]
      },
      { id: '3-2', label: '设备检查', icon: 'custom-child' }
    ]
  }
]);

const filteredTreeData = computed(() => {
  if (!searchText.value) {
    return treeData.value;
  }

  const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter(node => {
      const matchesSearch = node.label.toLowerCase().includes(searchText.value.toLowerCase());
      const hasMatchingChildren = node.children ? filterNodes(node.children).length > 0 : false;

      if (matchesSearch || hasMatchingChildren) {
        return {
          ...node,
          children: node.children ? filterNodes(node.children) : undefined
        };
      }
      return false;
    }).filter(Boolean) as TreeNode[];
  };

  return filterNodes(treeData.value);
});

const clickTextIcon = (event: Event, item: any) => {
  // 阻止事件冒泡
  event.stopPropagation()
  // 打开视频弹窗，传入对应的标题
  videoStore.openVideo(undefined, item.text)
}

const handleEays = () => {
  showlistVisible.value = !showlistVisible.value;
}

const handleSearch = () => {
}

const onSearchClick = () => {
  // 搜索功能
}

// 自定义过滤方法
const customFilterMethod = (node: TreeNode, filter: string) => {
  return node.label.toLowerCase().includes(filter.toLowerCase());
}

const onNodeSelected = (nodeId: string) => {
  // 节点选择处理
}

const toggleExpand = (nodeId: string) => {
  const index = expandedNodes.value.indexOf(nodeId);
  if (index > -1) {
    expandedNodes.value.splice(index, 1);
  } else {
    expandedNodes.value.push(nodeId);
  }
}

const onNodeLabelClick = (node: TreeNode) => {
  selectedNode.value = node.id;
  onNodeSelected(node.id);
}

// 处理标签点击（模拟双击效果）
const handleLabelClick = (node: TreeNode) => {
  clickCount.value++

  if (clickCount.value === 1) {
    // 第一次点击
    onNodeLabelClick(node)
    clickTimer.value = window.setTimeout(() => {
      clickCount.value = 0
    }, 300) // 300ms内的点击算作双击
  } else if (clickCount.value === 2) {
    // 双击
    if (clickTimer.value) {
      clearTimeout(clickTimer.value)
      clickTimer.value = null
    }
    clickCount.value = 0
    onNodeDoubleClick(node)
  }
}

const onNodeDoubleClick = (node: TreeNode) => {
  // 只有子节点（没有children的节点）才能双击打开视频弹窗
  if (!node.children || node.children.length === 0) {
    videoStore.openVideo(undefined, node.label)
  }
}

</script>



<style scoped lang="scss">
.searchDialog .q-dialog__inner--minimized>div {
  min-width: 776px !important;
  min-height: 971px !important;
  max-height: 971px !important;
  right: 220px;
  top: 345px;
  position: fixed;
  background-image: url("assets/component/home_right_img/切图 88.png");
  background-size: 100% 100%;
}

.searchDialog .q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.search-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-header {
  margin-bottom: 20px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  margin-top: 34px;
  margin-left: 28px;
  width: 663px;
  height: 80px;
  padding: 0 50px 0 15px;
  border: 2px solid #3a5998;
  border-radius: 8px;
  background: rgba(38, 71, 106, 0.8);
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 38px;
  line-height: 64px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #FFFFFF;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input::placeholder {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 38px;
  line-height: 64px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: rgba(200, 215, 228, 0.7);
}

.search-input:focus {
  border-color: #5a7bc8;
  background: rgba(38, 71, 106, 0.9);
}

.search-btn {
  position: absolute;
  right: 55px;
  top: 65%;
  transform: translateY(-50%);
  width: 29px;
  height: 29px;
  background-image: url("assets/component/home_right_img/切图 25.png");
  background-size: 29px 29px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.search-btn:hover {
  opacity: 1;
  background: rgba(90, 123, 200, 0.2);
  border-radius: 4px;
}

.search-btn .q-btn__content {
  display: none;
}

.tree-container {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #3a5998;
  border-radius: 8px;
  background: rgba(38, 71, 106, 0.6);
  padding: 10px;
  position: relative;
}

.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 38px;
  line-height: 64px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  color: #FFFFFF;
  user-select: none;
}

.custom-tree {
  color: #c8d7e4;
}

.custom-tree .q-tree__node {
  padding: 8px 0;
}

.custom-tree .q-tree__node-header {
  padding: 12px 16px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.custom-tree .q-tree__node-header:hover {
  background: rgba(200, 215, 228, 0.1);
}

.custom-tree .q-tree__node-header-content {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 38px;
  line-height: 64px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #C8D7E4 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.custom-tree .q-tree__arrow {
  display: none; /* 隐藏默认的展开箭头 */
}

.tree-node-header {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
}

.tree-node-expand-icon {
  margin-right: 8px;
  width: 36px;
  height: 36px;
  background-image: url("assets/component/home_right_img/切图 26.png");
  background-size: 36px 36px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.tree-node-expand-icon.expanded {
  background-image: url("assets/component/home_right_img/切图 27.png");
}

.tree-node-expand-icon:hover {
  opacity: 1;
  filter: brightness(1.2);
}

.tree-node-icon {
  margin-right: 8px;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}

.tree-node-icon.icon-root {
  width: 36px;
  height: 36px;
  background-image: url("assets/component/home_right_img/切图 26.png");
  background-size: 36px 36px;
}

.tree-node-icon.icon-parent {
  width: 36px;
  height: 36px;
  background-image: url("assets/component/home_right_img/切图 26.png");
  background-size: 36px 36px;
}

.tree-node-icon.icon-child {
  width: 46px;
  height: 46px;
  background-image: url("assets/component/home_right_img/切图 28.png");
  background-size: 46px 46px;
}

.tree-node-label {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 38px;
  line-height: 64px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #C8D7E4 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  cursor: pointer;
}

.custom-tree .q-tree__node--selected .tree-node-label {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 38px;
  line-height: 64px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #FFFFFF 0%, #C8D7E4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.custom-tree .q-tree__node--selected .tree-node-icon {
  opacity: 1;
  filter: brightness(1.2);
}

/* 自定义滚动条 */
.tree-container::-webkit-scrollbar {
  width: 8px;
}

.tree-container::-webkit-scrollbar-track {
  background: rgba(38, 71, 106, 0.3);
  border-radius: 4px;
}

.tree-container::-webkit-scrollbar-thumb {
  background: rgba(200, 215, 228, 0.5);
  border-radius: 4px;
}

.tree-container::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 215, 228, 0.7);
}

.right-container {
  width: 1024px;
  height: 1816px;
  background-image: url("assets/component/home_right_img/切图 87.png");
  background-size: 100% 100%;
  position: relative;
  padding: 90px 126px 90px 156px;
  box-sizing: border-box;
}

.right-container-eays {
  width: 93px;
  height: 108px;
  background-image: url("assets/component/home_right_img/切图 30.png");
  background-size: 100% 100%;
  position: absolute;
  top: 36px;
  right: 36px;
  cursor: pointer;
  z-index: 1000;
}

.right-container-content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 35px;
}

.right-container-content-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  pointer-events: visible;
}

/* 隐藏复选框 */
.toggle-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* 包装器样式 */
.item-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

/* PC端hover效果 */
@media (hover: hover) and (pointer: fine) {
  .item-wrapper:hover .text-icon {
    opacity: 1;
  }
}

/* 移动端点击切换效果 */
@media (hover: none) and (pointer: coarse) {
  .toggle-checkbox:checked + .item-wrapper .text-icon {
    opacity: 1;
  }
}

.right-container-content-img {
  width: 100%;
  height: 423px;
}

.right-container-content-text {
  width: 100%;
  height: calc(100% - 423px);
  background: rgba(38, 71, 106, 0.75);
  position: relative;
}

.right-container-content-text span {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 46px;
  line-height: 94px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #C8D7E4 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 70px;
}

.text-icon {
  position: absolute;
  width: 55px;
  height: 53px;
  background-image: url("assets/component/home_right_img/切图 29.png");
  background-size: 100% 100%;
  right: 25px;
  bottom: 18px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
