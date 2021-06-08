import { getElPosition, getType } from '@utils';
const toolTip = {
  beforeMount (el, binding, vnode, prevVnode) {


  },
  mounted (el, binding, vnode, prevVnode) {
    console.log('binding:', binding);
    console.log('prevVnode:', prevVnode);
    console.info('vnode:', vnode);
    const oElPosition = getElPosition(el);
    console.log(el);
    const options = initOptions(binding.value);
    const oElTip = createTipDom();
    setElValue(oElTip, options.value);
    console.log(oElPosition);
    // oElTip.style.position = 'absolute';cssText覆盖之前的style ,需要写个工具函数 el.style.cssText + current cssText
    oElTip.style.cssText = `position:absolute;top:${oElPosition.absolute.top}px;left:${oElPosition.absolute.left}px`;
    console.log(oElTip.style.cssText);
  },
  beforeUpdate () { },
  updated () { },
  beforeUnmount () { }, // new
  unmounted () { },
};

/**
 * @description 创建 tip dom
 * @author 衣沾不足惜 javascript.h@qq.com
 * @date 2020-09-17
 * @returns HTMLDivElement
 */
function createTipDom () {
  var oDiv = document.createElement('div');
  oDiv.className = 'dust-tip';
  oDiv.setAttribute('data-show', 'true');
  document.body.insertAdjacentElement('beforeend', oDiv);
  return oDiv;
}

function initOptions (bindingValue) {
  const defaultOptions = {
    value: '',
  };
  let options = {};
  let strBindingValueType = getType(bindingValue);
  const isStringOrNumber = strBindingValueType === 'String' ? 'String' : strBindingValueType == 'Number' ? 'Number' : null;
  console.log(strBindingValueType);
  switch (strBindingValueType) {
    case isStringOrNumber:
      options.value = bindingValue ?? defaultOptions.value;
      break;
    case 'Object':
      options = Object.assign(defaultOptions, bindingValue);
      options.value = bindingValue.html ?? bindingValue.text ?? bindingValue.value;
      break;
    default:
      throw new Error('toolTip: Can only be a String or Object, but got an ' + getType(bindingValue));
  }
  return options;
}

function setElValue (el, value) {
  el.innerHTML = value;
}
export { toolTip };
