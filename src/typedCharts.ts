import { defineComponent, shallowRef, h, watch } from 'vue'
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
import type { DistributiveArray } from 'chart.js/dist/types/utils'
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
      const chart = shallowRef<ChartJS | null>(null)
      const chartComponentRef = shallowRef<ChartComponentRef | null>(null)

      watch(
        () => chartComponentRef.value?.chart ?? null,
        nextChart => {
          chart.value = nextChart
        },
        { flush: 'sync' }
      )

      expose({ chart })

      const reforwardRef = (instance: ChartComponentRef | null) => {
        chartComponentRef.value = instance
      }

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

export interface ExtendedDataPoint {
  [key: string]: string | number | null | ExtendedDataPoint
}

export const Bar = /* #__PURE__ */ createTypedChart<
  'bar',
  DefaultDataPoint<'bar'> | DistributiveArray<ExtendedDataPoint>
>('bar', BarController)

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
