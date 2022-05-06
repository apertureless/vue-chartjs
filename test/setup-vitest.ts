import { vi } from 'vitest'
;(global as any).jest = vi

// Workaround to use `jest-canvas-mock` with Vitest

// @ts-ignore
// eslint-disable-next-line
import getCanvasWindow from 'jest-canvas-mock/lib/window'

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap'
] as const

const canvasWindow = getCanvasWindow({ document: window.document })

apis.forEach(api => {
  global[api] = canvasWindow[api]
  global.window[api] = canvasWindow[api]
  document.head.innerHTML = '<div id="konva-container"></div>'
})
