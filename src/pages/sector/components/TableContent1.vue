<!-- 高速公路 -->
<template>
  <div class="tab-content-1">
    <div class="table-box w-full h-full p-[30px] box-border">
      <div class="demo-table">
        <div class="table-wrapper">
          <table class="rural-road-table">
            <thead>
              <tr>
                <th>标号</th>
                <th>线路编号</th>
                <th>线路名称</th>
                <th>线路里程</th>
                <th>所属区县</th>
              </tr>
            </thead>
          </table>
          <div class="table-body-container">
            <table class="rural-road-table">
              <tbody>
                <tr v-for="(item, index) in ruralRoadData" :key="index">
                  <td>{{ item.label }}</td>
                  <td>{{ item.code }}</td>
                  <td>{{ item.name }}</td>
                  <td class="highlight distance-cell">
                    <span class="distance-number">{{ item.distanceNum }}</span>
                    <span class="distance-unit">{{ item.distanceUnit }}</span>
                  </td>
                  <td>{{ item.county }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const slide = ref('style')
const carouselKey = ref(0)

// 美丽农村精品示范路数据
const ruralRoadData = ref([
  { label: '康原富路1', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '丰宁县' },
  { label: '康原富路2', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '双桥区' },
  { label: '康原富路3', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '双桥区' },
  { label: '康原富路4', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '双桥区' },
  { label: '康原富路5', code: 'X503', name: '县道宁石线', distanceNum: '22.3', distanceUnit: 'km', county: '围场县' },
  { label: '康原富路6', code: 'X504', name: '县道宁石线', distanceNum: '15.8', distanceUnit: 'km', county: '隆化县' },
  { label: '康原富路7', code: 'X505', name: '县道宁石线', distanceNum: '28.7', distanceUnit: 'km', county: '平泉市' },
  { label: '康原富路8', code: 'X506', name: '县道宁石线', distanceNum: '19.2', distanceUnit: 'km', county: '滦平县' },
  { label: '康原富路9', code: 'X507', name: '县道宁石线', distanceNum: '25.6', distanceUnit: 'km', county: '承德县' },
  { label: '康原富路', code: 'X508', name: '县道宁石线', distanceNum: '21.4', distanceUnit: 'km', county: '宽城县' }
])

// 组件挂载后重置轮播状态
onMounted(() => {
  nextTick(() => {
    // 确保轮播组件正确初始化
    slide.value = 'style'
    // 强制重新渲染
    carouselKey.value++
  })
})

// 监听slide变化，确保轮播正常工作
watch(slide, () => {
  nextTick(() => {
    // 触发窗口resize事件，让图表重新计算尺寸
    window.dispatchEvent(new Event('resize'))
  })
})

// 组件卸载时清理
onUnmounted(() => {
  // 清理可能的定时器或事件监听
})

const topInfo = [
  {
    label: '总投资：',
    total: '75亿元'
  },
  {
    label: '路段：',
    total: '1条'
  },
  {
    label: '里程：',
    total: '123公里'
  },
  {
    label: '互通：',
    total: '1座'
  },

]
</script>

<style scoped lang="scss">
.tab-content-1 {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  // align-items: center;

  // 表格样式
    .table-box {
      .demo-table {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .table-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .table-body-container {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: calc(100% - 50px); // 减去表头高度

        // 自定义滚动条样式
        &::-webkit-scrollbar {
          width: 8px;
        }

        &::-webkit-scrollbar-track {
          // background: rgba(8, 40, 37, 0.5);
          border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
          // background: linear-gradient(180deg, #52AEA0 0%, #208760 100%);
          border-radius: 4px;
          transition: all 0.3s ease;

          &:hover {
            // background: linear-gradient(180deg, #7CBEB4 0%, #2A9A7A 100%);
          }
        }

        &::-webkit-scrollbar-corner {
          background: rgba(8, 40, 37, 0.5);
        }

        // 确保表格宽度计算正确
        .rural-road-table {
          width: 100%;
        }
      }

      .rural-road-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        background: transparent;
        table-layout: fixed;

        th,
        td {
          &:nth-child(1) {
            width: 18%;
          }

          // 标号
          &:nth-child(2) {
            width: 18%;
          }

          // 线路编号
          &:nth-child(3) {
            width: 24%;
          }

          // 线路名称
          &:nth-child(4) {
            width: 18%;
          }

          // 线路里程
          &:nth-child(5) {
            width: 22%;
          }

          // 所属区县

          // 确保列宽一致性
          box-sizing: border-box;
        }

        thead {
          tr {
            // background: rgba(1, 62, 60, 0.9);
            height: 50px;

            th {
              padding: 12px 20px;
              font-family: 'Alibaba PuHuiTi 2.0', sans-serif;
              font-weight: 600;
              font-size: 26px;
              color: #FFFFFF;
              text-align: center;
              border: none;
              // background: rgba(1, 62, 60, 0.9);
              position: sticky;
              top: 0;
              z-index: 10;

              &:first-child {
                border-left: none;
              }

              &:last-child {
                border-right: none;
              }
            }
          }
        }

        tbody {
          tr {
            // background: rgba(4, 65, 40, 0.3);
            border-radius: 0px 0px 0px 0px;
            transition: all 0.3s ease;
            height: 50px;

            &:hover {
              // background: rgba(82, 174, 160, 0.3);
              transform: scale(1.01);
            }

            // 奇数行样式（tbody中的第2、4、6行等，实际是表格的第3、5、7行）
            &:nth-child(even) {
              // background: rgba(1, 62, 60, 0.9);

              &:hover {
                // background: rgba(82, 174, 160, 0.2);
              }
            }

            td {
              padding: 12px 20px;
              font-family: 'Alibaba PuHuiTi 2.0', sans-serif;
              font-weight: 400;
              font-size: 24px;
              color: #E3FFF5;
              text-align: center;
              border: none;

              &.highlight {
                color: #FFE600;
                font-weight: 500;
              }

              &.distance-cell {
                text-align: center;

                .distance-number {
                  font-weight: 500;
                  font-size: 22px;
                  color: #51C205;
                  line-height: 32px;
                  text-align: left;
                  font-style: normal;
                  text-transform: none;
                }

                .distance-unit {
                  font-weight: 400;
                  font-size: 22px;
                  color: #D3D3D3;
                  line-height: 32px;
                  text-align: left;
                  font-style: normal;
                  text-transform: none;
                  margin-left: 4px;
                }
              }

              &:first-child {
                border-left: none;
              }

              &:last-child {
                border-right: none;
              }
            }
          }

          tr:last-child {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
}
</style>
