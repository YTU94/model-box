// import Modelbox from "../core/index";
const Modelbox = require("../core/index")

const testObj = {
    a: 1,
    b: 2
}

const model = new Modelbox(testObj)
const newObj = model.generate({
    a: "`${a}元`",
    b: (val) => {
        return val * 2
    }
})

console.log("------", newObj)
