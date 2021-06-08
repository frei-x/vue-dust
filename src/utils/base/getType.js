const getType = function (variable) {
  let type = Object.prototype.toString.call(variable).slice(8, -1);
  const regIsElement = /^HTML\S{0,}?Element$/;
  if (regIsElement.test(type)) type = 'Element';
  return type;
};
export { getType };
