function ThousandFormat (num) {
    return `${num}`.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}

function ThousandFormat (num) {

}
let num = 1015641354.521231
ThousandFormat(num)