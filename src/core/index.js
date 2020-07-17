import { removeSmall } from "../utils/index"

class Modelbox {
    constructor(obj) {
        this.obj = { ...obj }
    }

    /*
     * keyMap {key: targetKey}
     * key: 原始对象的属性
     * targetKey: 映射新对象的新属性, 如果是对象
     */
    generate(keyMap) {
        // eslint-disable-next-line
        for (const key in keyMap) {
            let keyType = undefined
            let targetKey = null
            let target = keyMap[key]
            if (typeof target === "object") {
                // eslint-disable-next-line
                let { default: d, type } = target
                targetKey = d
                keyType = type
            } else {
                targetKey = target
            }
            this.dealNullValue(this.obj, key, keyType)
            // 只支持打单层
            try {
                if (targetKey.match(/^`.*`/)) {
                    // eslint-disable-next-line
                    if (/\{([^\}]+)\}/.test(targetKey)) {
                        const v = this.obj[RegExp.$1]
                        this.obj[key] = v ? targetKey.replace(/\$.*\}/, v) : ""
                    }
                    this.obj[key] = removeSmall(this.obj[key])
                } else {
                    this.obj[targetKey] = this.obj[key]
                    key !== targetKey && delete this.obj[key]
                }
            } catch (error) {
                // eslint-disable-next-line
                console.log(error)
            }
        }
        return this.obj
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
            if (this.isUndefined(v) || this.isNull(v)) {
                obj[key] = typeValueMap[type]
            }
        }
    }

    isUndefined(v) {
        return typeof v === "undefined" && v === undefined
    }

    isNull(v) {
        return typeof v === "object" && v === null
    }
}

export default Modelbox
