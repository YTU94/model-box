import { isDef, removeSmall } from "../utils/index"

//TODO: 是否要支持 要支持深拷贝

function dealWithString(key, targetKey, obj = {}) {
    try {
        if (targetKey.match(/^`.*`/)) {
            if (/\{([^\}]+)\}/.test(targetKey)) {
                const v = obj[RegExp.$1]
                obj[key] = v ? targetKey.replace(/\$.*\}/, v) : ""
            }
            obj[key] = removeSmall(obj[key])
        } else {
            obj[targetKey] = this.obj[key]
            key !== targetKey && delete this.obj[key]
        }
    } catch (error) {
        // eslint-disable-next-line
        console.log(error)
    }
}

class Modelbox {
    constructor(obj) {
        this.obj = { ...obj }
    }

    /*
     * keyMap {key: targetKey}
     * key: 原始对象的属性
     * targetKey: 映射新对象的新属性, 如果是对象
     */
    generate(keyMap, sourceObj) {
        let obj = { ...sourceObj || this.obj}
        // eslint-disable-next-line
        for (const key in keyMap) {
            let keyType = undefined
            let targetKey = null

            let target = keyMap[key]
            // 只支持打单层
            switch (typeof target) {
                case "string":
                    dealWithString(key, target, obj)
                    break
                case "function":
                    obj[key] = target()
                    break
                case "object":
                    if (typeof obj[key] === "object") {
                        this.generate(keyMap[key], obj[key])
                    } else {
                        this.dealNullValue(obj, key, keyType)
                        let { default: d, type } = target
                        targetKey = d
                        keyType = type
                    }

                    break
                default:
                    break
            }
        }
        return obj
    }

    dealNullValue(obj, key, type = "String") {
        const typeValueMap = {
            String: "",
            Number: 0,
            Array: [],
            Object: {},
            Function: () => {}
        }
        if (!obj.hasOwnProperty(key)) {
            let s = new type()
            let t = Object.prototype.toString.call(s).slice(8, -1)
            obj[key] = typeValueMap[t]
        } else {
            let v = obj[key]
            if (!isDef(v)) {
                obj[key] = typeValueMap[type]
            }
        }
    }
}

export default Modelbox
