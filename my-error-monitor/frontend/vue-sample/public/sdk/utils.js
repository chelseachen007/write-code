export const userAgent = () => {
    return navigator.userAgent
}
export const host = () => {
    return location.host
}
export const currentUrl = () => {
    return location.href
}
export const timestamp = () => {
    return parseInt(Number(Date.now() / 1000).toFixed(0))
}