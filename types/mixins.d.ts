import Vue from 'vue';
import { ChartData } from 'chart.js';

export declare class ReactiveDataMixin extends Vue {
  chartData: ChartData;
}

export declare class ReactivePropMixin extends Vue {
  readonly chartData: ChartData;
}
