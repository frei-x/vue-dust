const toolTip = {
  beforeMount (el, binding, vnode, prevVnode) {
    console.log(el, binding);
    console.info('vnode', vnode);
  },
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeUnmount () {}, // new
  unmounted () {},
};
export { toolTip };
