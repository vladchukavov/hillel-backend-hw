

const { fn } = require("./module1")
const CONST_A = 'fn2 log2'

console.log('module2')

function fn2() {
    console.log(CONST_A)
}

fn()

module.exports = fn2
// export { fn2 }
