import Vue from 'vue'

/** vue-chartjs component common definition */
export declare class BaseChart extends Vue {
  addPlugin (plugin?: string[]): void
  renderChart (chartData: any, options?: any): void
}
