
class A {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
}

const CONST_A = 'fn1 log1'

let status = true

console.log('module1')

function fn() {
    console.log(CONST_A)
}

module.exports = {
    fn, CONST_A
}

// export { fn }
// export default new A('Ann name')