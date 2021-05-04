<template>
    <v-chart ref="chart" class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "Chart",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  props: {
      title: String,
      labels: Array,
      data: Array
  },
  data() {
    return {
      option: {
        title: {
          text: this.title,
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "left",
          data: this.labels
        },
        series: [
          {
            name: this.title,
            type: "pie",
            radius: ['40%', '70%'],
            // center: ["50%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#100c2a',
                borderWidth: 5
            },
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            }
          }
        ]
      }
    };
  },
  mounted () {
    console.log(this.$refs.chart.chart)
  }
};
</script>

<style scoped>
    .chart {
        height: 100%;
        width: 100%;
    }
</style>