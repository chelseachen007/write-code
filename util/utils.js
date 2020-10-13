
export function isObject (obj) {
  return obj != null && typeof obj === 'object'
}

export function isType (params) {
  return Object.prototype.toString.call(params).slice(8, -1)
}
