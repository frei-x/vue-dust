import { ref, readonly } from 'vue';

export function useToggle (value = false, negationValue) {
  let state = ref(value);
  let toggle = () => { };
  let count = 0;
  // 双参数
  if (negationValue !== undefined) {
    state = ref(value);
    toggle = () => {
      if (state.value === value) {
        state.value = negationValue;
      } else {
        state.value = value;
      }
    };
  } else {
    // 数组
    if (Array.isArray(value)) {
      if (value.length === 2) {
        state = ref(value[0]);
        toggle = () => {
          count++;
          state.value = value[count % 2];
        };
      } else {
        state = ref(value[0]);
        toggle = () => {
          count++;
          state.value = value[count % value.length];
        };
      }
    } else {
      // 布尔
      state = ref(!!value);
      toggle = () => {
        state.value = !state.value;
      };
    }
  }

  return [readonly(state), toggle];
}
