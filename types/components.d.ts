import Vue from 'vue'
import { ChartData, ChartOptions } from 'chart.js';

/** vue-chartjs component common definition */
export declare class BaseChart extends Vue {
  addPlugin (plugin?: string[]): void
  renderChart (chartData: ChartData, options?: ChartOptions): void
}
