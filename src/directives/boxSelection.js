import { getElPosition, getType } from '@utils';
function funBoxSelection (scopedElement = document.body, targetAttrName = 'target', oEvent = {}) {
  let startPageX = 0;
  let startPageY = 0;
  let currentPageX = 0;
  let currentPageY = 0;
  let oViewingArea = null;
  let scopedElementInfo = {};
  function initoViewingArea () {
    startPageX = 0;
    startPageY = 0;
    currentPageX = 0;
    currentPageY = 0;
    oViewingArea = document.createElement('div');
    oViewingArea.className = 'viewingArea';
    oViewingArea.style.cssText = 'position:absolute;background:rgba(0, 0, 255, 0.1);pointer-events: none;border:1px solid rgba(0, 0, 255, 0.5)';
    document.body.appendChild(oViewingArea);
  }
  function move (e) {
    currentPageX = e.pageX;
    currentPageY = e.pageY;
    let disX = currentPageX - startPageX;
    let disY = currentPageY - startPageY;
    let x = 0;
    let y = 0;
    // 蒙层  和 scopedElement 的间距
    let rectDisX = 0;
    let rectDisY = 0;
    let dir = {
      x: disX >= 0 ? 'left' : 'right',
      y: disY >= 0 ? 'top' : 'bottom'
    };

    // 设置宽高 并限定范围

    let w = Math.abs(disX);
    let h = Math.abs(disY);

    // 换算 绝对定位 left 为 right(因为需要修正宽度延伸方向)
    // left 即为 鼠标按下的坐标 , right 为 文档宽度 - 鼠标按下的坐标
    if (dir.x === 'right') {
      x = document.documentElement.scrollWidth - startPageX;
      // scopedElement 右边X坐标 - 蒙层 x
      // 统一从left计算 不使用 x了
      rectDisX = startPageX - scopedElementInfo.left;
      if (w > rectDisX) {
        w = rectDisX - 2;
      }
    } else {
      x = startPageX;
      // 蒙层的 left - scopedElement 的left 
      rectDisX = x - scopedElementInfo.left;

      if (rectDisX + w > scopedElementInfo.width) {
        w = scopedElementInfo.width - rectDisX - 2;  //去掉边框 2px
      }

    }
    if (dir.y === 'bottom') {
      // 下面两条注释理解错误:
      // 应该使用 document.body.scrollHeight 而不是document.documentElement.scrollHeight
      // 插入的蒙层是在body下, 如果body下有个元素#app高度比body还高, 蒙层的绝对定位还是只相对于body(bottom:0 ,只到body的bottom下限 ,而不是#app的bottom)

      // 新解释: body下绝对定位 bottom 参照点是浏览器底部可视区域边缘 , 用innerHeight
      y = innerHeight - startPageY;
      // bottom - 开始y
      if (scopedElementInfo.height + scopedElementInfo.top - startPageY + h > scopedElementInfo.height) {
        h = startPageY - scopedElementInfo.top - 2;
      }
    } else {
      y = startPageY;
      if (y + h > scopedElementInfo.height + scopedElementInfo.top) {
        h = scopedElementInfo.height + scopedElementInfo.top - y - 2;
      }
    }
    // 限定选择蒙层宽高 , 开始坐标 + 宽度 不能超越 scopedElement的宽度 ,超过后 ,只给开始坐标到边界的距离为宽度
    // x y 已经处理过 right 和 left的情况
    // 蒙层和scopedElement的间距 + 蒙层的宽度 需要小于  scopedElement的宽度

    setViewingArea({ w, h, x: x, y: y }, dir);
    let targets = scopedElement.querySelectorAll(`[${targetAttrName}]`);
    targets.forEach((item) => {
      if (isIntersect(oViewingArea, item)) {
        oEvent.onSelected && oEvent.onSelected({ el: item, selected: true });
      } else {
        oEvent.onSelected && oEvent.onSelected({ el: item, selected: false });
      }

    });
    oEvent.onMove && oEvent.onMove(e);
  }
  function mouseUp (e) {
    if (oViewingArea) {
      // 立即调用 删除选择区 / 解除事件, 避免删除蒙层dom过慢鼠标再次点中选中蒙层
      //oViewingArea.style.display = 'none';
      // document.body.removeChild(oViewingArea);
    }
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', mouseUp);
    oViewingArea = null;
    oEvent.onCancel && oEvent.onCancel(e);
  }
  function setViewingArea (params = { w: 0, h: 0, x: 0, y: 0 }, dir = { x: 'left', y: 'top' }) {
    if (dir.x === 'right') {
      oViewingArea.style.left = 'initial';
    } else {
      oViewingArea.style.right = 'initial';

    }
    if (dir.y === 'bottom') {
      oViewingArea.style.top = 'initial';
    } else {
      oViewingArea.style.bottom = 'initial';
    }
    oViewingArea.style[dir.x] = params.x + 'px';
    console.log(params.y);
    oViewingArea.style[dir.y] = params.y + 'px';
    !isNaN(params.w) ? oViewingArea.style.width = params.w + 'px' : null;
    !isNaN(params.h) ? oViewingArea.style.height = params.h + 'px' : null;
  }
  function isIntersect (elA, elB) {
    let A = elA.getBoundingClientRect();
    let B = elB.getBoundingClientRect();
    // 判断不相交  在右边 , 右比左还小 ,b在左
    if (A.left > B.right || A.right < B.left || A.bottom < B.top || A.top > B.bottom) {
      return false;
    }
    return true;
  }
  scopedElement.addEventListener('mousedown', (e) => {
    mouseUp();
    initoViewingArea();
    startPageX = e.pageX;
    startPageY = e.pageY;
    scopedElementInfo = scopedElement.getBoundingClientRect();
    setViewingArea({ w: 0, h: 0, x: startPageX, y: startPageY });
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', mouseUp);
    e.stopPropagation();
  });

}
const boxSelection = {
  beforeMount (el, binding, vnode, prevVnode) {

  },
  mounted (el, binding, vnode, prevVnode) {
    console.log('框选', el);
    funBoxSelection(el, 'target', {
      onMove: function (e) {

      },
      onSelected: function (item) {
        if (item.selected) {
          item.el.style.border = '1px solid red';
          item.el.style.color = 'red';
        } else {
          item.el.style.border = '1px solid black';
          item.el.style.color = 'black';
        }
      },
      onCancel: function () {

      }
    });
  },
  beforeUpdate () { },
  updated () { },
  beforeUnmount () { }, // new
  unmounted () { },
};


export { boxSelection };
