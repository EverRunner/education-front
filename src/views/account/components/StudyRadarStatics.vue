<style lang="scss" scope>
.chart {
  height: calc(100% - 80px);
  position: relative;
  padding-bottom: 80px;
}
</style>

<template>
  <div class="chart">
    <div class="account-dear-chart" ref="accountDearChart"></div>
    <ul class="account-dear-chart__legend">
      <li>您的学习</li>
      <li class="kaoguo">考过生平均</li>
    </ul>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "StudyRadarStatics",

  props: {
    userRadarData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {};
  },

  computed: {},

  created() {},

  mounted() {
    this.handleInit();
  },

  methods: {
    /**
     * 跳转
     */
    handleInit(name) {
      const option = {
        legend: {
          // data: ["您的学习", "考过生平均"],
          show: false,
        },
        tooltip: {
          // trigger: "axis",
          formatter: function(param) {
            return (
              "视频课程：" +
              Math.floor((param.value[0] / 60 / 60) * 100) / 100 +
              "小时<br/>" +
              "英文关键词学习：" +
              Math.floor((param.value[1] / 60 / 60) * 100) / 100 +
              "小时<br/>" +
              "英文关键词测试：" +
              Math.floor((param.value[2] / 60 / 60) * 100) / 100 +
              "小时<br/>" +
              "章节测试：" +
              Math.floor((param.value[3] / 60 / 60) * 100) / 100 +
              "小时<br/>" +
              "中英关键词学习：" +
              Math.floor((param.value[4] / 60 / 60) * 100) / 100 +
              "小时<br/>" +
              "中英关键词测试：" +
              Math.floor((param.value[5] / 60 / 60) * 100) / 100 +
              "小时"
            );
          },
        },

        radar: {
          // shape: 'circle',
          indicator: [
            { name: "视频课程" },
            { name: "英文关键词学习" },
            { name: "英文关键词测试" },
            { name: "章节测试" },
            { name: "中英关键词学习" },
            { name: "中英关键词测试" },
          ],
          radius: "60%",
          splitNumber: 4, // 雷达图圈数
          axisName: {
            formatter: function(value, indicator) {
              switch (value) {
                case "英文关键词学习":
                  return "英文\n关键词学习";

                case "英文关键词测试":
                  return "英文\n关键词测试";

                case "中英关键词学习":
                  return "中英\n关键词学习";

                case "中英关键词测试":
                  return "中英\n关键测试";

                default:
                  return value;
              }
            },
            lineHeight: 18,
          },
          //雷达图背景的颜色
          splitArea: {
            // 图表背景的颜色
            areaStyle: {
              shadowColor: "#fff",
              shadowBlur: 10,
              color: "#fff",
            },
          }, // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: "#e7e8ec",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#e7e8ec",
            },
          },
        },
        textStyle: {
          color: "#303133", //标题颜色
          fontSize: 12,
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",

            data: [
              {
                value: [
                  this.userRadarData.vedio_mine_duration,
                  this.userRadarData.enstudy_mine_duration,
                  this.userRadarData.entest_mine_duration,
                  this.userRadarData.chaptertest_mine_duration,
                  this.userRadarData.chenstudy_mine_duration,
                  this.userRadarData.chentest_mine_duration,
                ],
                name: "您的学习",
                itemStyle: {
                  normal: {
                    color: "#67C23A",
                  },
                },
                areaStyle: {
                  color: "rgba(225, 243, 216, 0.4)",
                },
              },
              {
                value: [
                  this.userRadarData.vedio_allavg_duration,
                  this.userRadarData.enstudy_allavg_duration,
                  this.userRadarData.entest_allavg_duration,
                  this.userRadarData.chaptertest_allavg_duration,
                  this.userRadarData.chenstudy_allavg_duration,
                  this.userRadarData.chentest_allavg_duration,
                ],
                name: "考过生平均",
                itemStyle: {
                  normal: {
                    color: "#F56C6C",
                  },
                },
              },
            ],
          },
        ],
      };

      // 图表
      const accountDearChart = this.$refs.accountDearChart;
      if (!accountDearChart) return;

      const myChart = echarts.init(accountDearChart);
      myChart.setOption(option);
    },
  },
};
</script>
