<template>
  <!-- <div class="box" @click="toggle">点我: {{ state }}</div>
  <div class="use-watch-dom" ref="refWatchDom">显示状态: {{ state }}</div>
  <input type="text" v-model="text" />
  <button @click="pre">上一个</button>
  <!-- <button @click="next">下一个</button> -->
  <div>
    <button @click="clear">清空</button>
  </div>
</template>

<script>
// import { useToggle } from '@/composition-lib/index';
console.log(999);
import { useToggle, useWatchDom, useState } from '../../../src/composition-lib/index.js';
import { ref, watch, watchEffect, onMounted, customRef } from '@vue/composition-api';
console.log(ref);
export default {
  name: 'Test',
  components: {},
  props: {},
  setup() {
    const [state, toggle] = useToggle(false);
    const refWatchDom = ref();
    useWatchDom(refWatchDom, function ({ isVisible }, options) {
      console.log(isVisible);
      console.log(options);
      if (isVisible) {
        refWatchDom.value.style.top = '-999px';
      }
    });

    const [useStateValue, { pre, next, clear }] = useState();
    onMounted(() => {
      watchEffect(() => {
        console.log(useStateValue);
      });
    });

    return {
      clear,
      text: useStateValue,
      refWatchDom,
      state,
      toggle,
      pre,
      next,
    };
  },
};
</script>


