import merge from 'lodash/fp/merge'

export function mergeOptions (obj, src) {
  return merge(obj, src)
}
