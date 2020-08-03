import { isDef, removeSmall } from "../utils/index"

function dealWithString(key, targetKey, obj) {
    try {
        if (targetKey.match(/^`.*`/)) {
            if (/\{([^\}]+)\}/.test(targetKey)) {
                var v = obj[RegExp.$1]
                obj[key] = v ? targetKey.replace(/\$.*\}/, v) : ""
            }
            obj[key] = removeSmall(obj[key])
        } else {
            obj[targetKey] = obj[key]
            key !== targetKey && delete obj[key]
        }
    } catch (error) {
        // eslint-disable-next-line
        console.log(error)
    }
}

function dealWithFunc(key, target, obj) {
    const res = typeof target === "function" && target()
    if (isDef(res)) {
        obj[key] = res
    } else {
        throw new Error("function must have return value")
    }
}

function dealWithObj(key, target, obj) {
    if (typeof obj[key] === "object") {
        this.generate(target, obj[key])
    } else {
        let { default: defaultVal, type } = target
        if (!isDef(defaultVal)) {
            throw new Error("obj must has default value")
        }
        obj[key] = obj[key] || defaultVal
        if (typeof type && !(obj[key] instanceof type)) {
            // FIXME: 欠缺后续处理方式
            throw new Error("obj type  not right")
        }
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
        let obj = { ...(sourceObj || this.obj) }
        if (!Object.keys(keyMap) || !Object.keys(obj)) {
            throw new Error("keyMap and obj must be a Object with value")
        }
        // eslint-disable-next-line
        for (const key in keyMap) {
            let target = keyMap[key]
            // 只支持打单层
            switch (typeof target) {
                case "string":
                    dealWithString(key, target, obj)
                    break
                case "function":
                    dealWithFunc(key, target, obj)
                    break
                case "object":
                    dealWithObj(key, target, obj)
                    break
                default:
                    break
            }
        }
        return obj
    }
}

export default Modelbox
