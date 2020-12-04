
function add(arr) {
   return arr.reduce((pre, cur) => pre + cur, 0)
}

module.exports = { add }