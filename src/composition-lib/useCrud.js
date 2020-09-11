import { ref } from 'vue';

export function useCrud (propsData) {
  let oData = ref(propsData);
  const createData = (singleData) => {
    oData.value.unshift(singleData);
  };
  const deleteData = (index, { key, value } = {}) => {
    if (index || index == 0) {
      oData.value.splice(index, 1);
      return;
    }
    const fIndex = oData.value.findIndex((item) => item[key] == value);
    oData.value.splice(fIndex, 1);
    return fIndex > -1;
  };

  /**
   * @description 传入 callback 函数  返回符合条件的值
   * @param {Function} callback(item,index)
   * @returns {Array}
   */
  const readData = (callback) => {
    if (!callback) {
      return oData.value;
    }
    return oData.value.filter((item, index) => {
      return callback(item, index);
    });
  };

  const updateData = (index, { key, value }) => {
    if (index < 0 || (!index && index != 0)) return;
    oData.value[index][key] = value;
  };

  return [oData, createData, readData, updateData, deleteData];
}
