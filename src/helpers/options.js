import merge from 'lodash.merge'

export function mergeOptions (obj, src) {
  return merge(obj, src)
}
