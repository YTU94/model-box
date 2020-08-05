'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function removeSmall(str) {
  return str.slice(1, str.length - 1);
}
function isDef(val) {
  return val !== undefined && val !== null;
}

function dealWithString(key, targetKey, obj) {
  try {
    if (targetKey.match(/^`.*`/)) {
      if (/\{([^\}]+)\}/.test(targetKey)) {
        var v = obj[RegExp.$1];
        obj[key] = v ? targetKey.replace(/\$.*\}/, v) : "";
      }

      obj[key] = removeSmall(obj[key]);
    } else {
      obj[targetKey] = obj[key];
      key !== targetKey && delete obj[key];
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}

function dealWithFunc(key, target, obj) {
  var res = typeof target === "function" && target();

  if (isDef(res)) {
    obj[key] = res;
  } else {
    throw new Error("function must have return value");
  }
}

function dealWithObj(key, target, obj) {
  if (_typeof(obj[key]) === "object") {
    this.generate(target, obj[key]);
  } else {
    var defaultVal = target["default"],
        type = target.type;

    if (!isDef(defaultVal)) {
      throw new Error("obj must has default value");
    }

    obj[key] = obj[key] || defaultVal;

    if (_typeof(type) && !(obj[key] instanceof type)) {
      // FIXME: 欠缺后续处理方式
      throw new Error("obj type  not right");
    }
  }
}

var Modelbox = /*#__PURE__*/function () {
  function Modelbox(obj) {
    _classCallCheck(this, Modelbox);

    this.obj = _objectSpread2({}, obj);
  }
  /*
   * keyMap {key: targetKey}
   * key: 原始对象的属性
   * targetKey: 映射新对象的新属性, 如果是对象
   */


  _createClass(Modelbox, [{
    key: "generate",
    value: function generate(keyMap, sourceObj) {
      var obj = _objectSpread2({}, sourceObj || this.obj);

      if (!Object.keys(keyMap) || !Object.keys(obj)) {
        throw new Error("keyMap and obj must be a Object with value");
      } // eslint-disable-next-line


      for (var key in keyMap) {
        var target = keyMap[key]; // 只支持打单层

        switch (_typeof(target)) {
          case "string":
            dealWithString(key, target, obj);
            break;

          case "function":
            dealWithFunc(key, target, obj);
            break;

          case "object":
            dealWithObj(key, target, obj);
            break;
        }
      }

      return obj;
    }
  }]);

  return Modelbox;
}();

module.exports = Modelbox;
