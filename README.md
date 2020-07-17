### model-box

### use
```javascript
import ModelBox from '@souche-f2e/modex-box'

const model = new ModelBox({a: 1, b: 2})

consr o = model.generate({
    a: "c",
    b: `${b}元`
})

console.log(o)
// 预期
{
    c: 1,
    b: "2元"
}
```