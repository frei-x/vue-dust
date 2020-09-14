export { useToggle } from '@lib/useToggle';
export { useWatchDom } from '@lib/useWatchDom';
export { useState } from '@lib/useState';

const obj = {
  test: null,
  color: 'red'
};

console.log(obj.color?.a?.cc ?? '默认值');
console.log(obj.test ?? 1);
