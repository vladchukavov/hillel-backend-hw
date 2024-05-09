
// import { readdirSync } from "node:fs"

// const myClass = new A('John')

// console.log(myClass.getName())

const module1 = require("./module1")
const fn2 = require("./module2")
// import { MOD_3 } from "./folder1/module3.js" //   . ..    /app/Wp/

module1.fn()
fn2()

// const myObj = new module1('Ann')

// const files = readdirSync('.')
// files.forEach(file => console.log({ file }))

// console.log(module1.getName())