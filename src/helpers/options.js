import merge from 'lodash-es/merge'

export function mergeOptions (obj, src) {
  return merge(obj, src)
}
