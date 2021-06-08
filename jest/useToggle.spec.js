import { mount, shallowMount } from '@vue/test-utils';

import { useToggle } from '@/index.js';

function forCallback (count, callback) {
  for (let i = 0; i < count; i++) {
    callback();
  }
}

test('init 1  equals true', () => {
  const [state, toggle] = useToggle(1);
  expect(state.value).toBe(true);
  toggle();
  expect(state.value).toBe(false);
  forCallback(100, toggle);
  expect(state.value).toBe(false);
  forCallback(101, toggle);
  expect(state.value).toBe(true);
});

test('init undefined  equals false', () => {
  const [state] = useToggle();
  expect(state.value).toBe(false);
});

test('init []  equals false', () => {
  const [state] = useToggle();
  expect(state.value).toBe(false);
});

test('init blue , red . 预期对调', () => {
  const [state, toggle] = useToggle('blue', 'red');
  expect(state.value).toBe('blue');
  toggle();
  expect(state.value).toBe('red');
  toggle();
  expect(state.value).toBe('blue');
  forCallback(100, toggle);
  expect(state.value).toBe('blue');
  forCallback(101, toggle);
  expect(state.value).toBe('red');
});

test('init [blue,red]. 预期对调', () => {
  const [state, toggle] = useToggle(['blue', 'red']);
  expect(state.value).toBe('blue');
  toggle();
  expect(state.value).toBe('red');
  toggle();
  expect(state.value).toBe('blue');
  forCallback(100, toggle);
  expect(state.value).toBe('blue');
  forCallback(101, toggle);
  expect(state.value).toBe('red');
});

test('长数组 预期顺序轮换', () => {
  let [state, toggle] = useToggle(['blue', 'red', 'green', 'error', 'warn']);
  expect(state.value).toBe('blue');
  toggle();
  expect(state.value).toBe('red');
  forCallback(3, toggle);
  expect(state.value).toBe('warn'); // loop end
  forCallback(18, toggle); // 18 % 4 == 2
  expect(state.value).toBe('green');
  forCallback(3, toggle);
  expect(state.value).toBe('blue');
});

test('useToggle 返回值 只读', () => {
  let [state] = useToggle(['blue', 'red']);
  state.value = 'yellow'; // 发出警告
  expect(state.value).toBe('blue');
});
