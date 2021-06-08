import { watchEffect, onUnmounted } from 'vue';
import { getType } from '@utils';
function useWatchDom (el = { value: undefined }, callback = function () {}, optios = {}) {
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
    // delay: 100,
    // trackVisibility: true,
    ...optios
  };

  let observer = new IntersectionObserver(([intersection], options) => {
    callback(
      {
        isVisible: intersection.isIntersecting || false,
        ratio: intersection.intersectionRatio || 0,
        intersectionRect: intersection.intersectionRect || {},
        target: intersection.target || {},
        _intersection: intersection
      },
      options
    );
  }, options);
  watchEffect(() => {
    if (el.value && getType(el.value) === 'Element') {
      observer.observe(el.value);
    }
  });
  onUnmounted(() => {
    observer.disconnect();
  });
}
export { useWatchDom };
