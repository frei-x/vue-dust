import { getType } from '@utils';
import { unref } from 'vue';
function getElPosition (paramsEl) {
  let el = unref(paramsEl);
  if (getType(el) !== 'Element') {
    console.warn('The params of getElPosition is not an HTMlElement');
    return {};
  }
  const rect = el.getBoundingClientRect();
  const relative = {
    left: rect.left,
    top: rect.top,
  };
  const absolute = {
    left: rect.left + parseFloat(document.documentElement.scrollLeft),
    top: rect.top + parseFloat(document.documentElement.scrollTop),
  };
  return {
    relative,
    absolute,
  };
}
export { getElPosition };
