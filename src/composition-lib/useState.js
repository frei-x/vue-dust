import { customRef } from 'vue';
const HISTORYMAXLEENGTH = 200;
const DELY = 300;
let pointer = 0;
let timer = null;

function useState (value, options) {
  let arrHistoryState = [value || ''];

  function pickState (value, arr, { max, delay } = { max: HISTORYMAXLEENGTH, delay: DELY }) {
    return customRef((track, trigger) => {
      return {
        get () {
          track();
          return value;
        },
        set (newValue) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            addHistoryState(arr, newValue, max);
          }, delay);
          value = newValue;
          trigger();
        }
      };
    });
  }

  function addHistoryState (arr, item, max) {
    arr.push(item);
    pointer = arr.length - 1;
    if (arr.length >= max) {
      arr.shift();
    }
  }
  // 设置当前指向的值 , 不需要被记录
  function setCurrentPointerState (pointer, needRecord = false) {
    currentState.value = arrHistoryState[pointer] || '';
    if (!needRecord) clearTimeout(timer);
  }

  function clearHistory () {
    arrHistoryState.length = 0;
    arrHistoryState.push('')
    setCurrentPointerState(0, false);
  }

  function setCurrentState (value) {
    currentState.value = value || '';
  }

  let currentState = pickState(value, arrHistoryState, options);

  const pre = () => {
    pointer = pointer - 1 >= 0 ? pointer - 1 : pointer;
    setCurrentPointerState(pointer, false);
  };

  const next = () => {
    pointer = pointer + 1 < arrHistoryState.length ? pointer + 1 : pointer;
    setCurrentPointerState(pointer, false);
  };

  return [currentState, { setState: setCurrentState, pre, next, clear: clearHistory }];
}
export { useState };
