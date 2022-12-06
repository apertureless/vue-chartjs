import { defineComponent, shallowRef, h } from 'vue'
import type { ChartType, ChartComponentLike, DefaultDataPoint } from 'chart.js'
import {
  Chart as ChartJS,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController
} from 'chart.js'
import type { TypedChartComponent, ChartComponentRef } from './types.js'
import { CommonProps } from './props.js'
import { Chart } from './chart.js'
import { compatProps } from './utils.js'

export function createTypedChart<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  type: TType,
  registerables: ChartComponentLike
): TypedChartComponent<TType, TData, TLabel> {
  ChartJS.register(registerables)

  return defineComponent({
    props: CommonProps,
    setup(props, { expose }) {
      const ref = shallowRef<ChartJS | null>(null)
      const reforwardRef = (chartRef: ChartComponentRef) => {
        ref.value = chartRef?.chart
      }

      expose({ chart: ref })

      return () => {
        return h(
          Chart,
          compatProps(
            {
              ref: reforwardRef as any
            },
            {
              type,
              ...props
            }
          )
        )
      }
    }
  }) as any
}

export const Bar = /* #__PURE__ */ createTypedChart('bar', BarController)

export const Doughnut = /* #__PURE__ */ createTypedChart(
  'doughnut',
  DoughnutController
)

export const Line = /* #__PURE__ */ createTypedChart('line', LineController)

export const Pie = /* #__PURE__ */ createTypedChart('pie', PieController)

export const PolarArea = /* #__PURE__ */ createTypedChart(
  'polarArea',
  PolarAreaController
)

export const Radar = /* #__PURE__ */ createTypedChart('radar', RadarController)

export const Bubble = /* #__PURE__ */ createTypedChart(
  'bubble',
  BubbleController
)

export const Scatter = /* #__PURE__ */ createTypedChart(
  'scatter',
  ScatterController
)
