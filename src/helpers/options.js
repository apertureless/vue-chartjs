export function mergeOptions (obj, src) {
  let mutableObj = Object.assign({}, obj)
  return Object.assign(mutableObj, src)
}
