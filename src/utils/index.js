export function removeSmall(str) {
    return str.slice(1, str.length - 1)
}
export function isDef(val) {
    return val !== undefined && val !== null
}

export function isPromise(val) {
    return isDef(val) && typeof val.then === "function" && typeof val.catch === "function"
}
