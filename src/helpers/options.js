import merge from 'deepmerge'

export function mergeOptions (obj, src) {
  return merge(obj, src)
}
