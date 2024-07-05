/**
 * 格式化日期
 * @param {Date} dateNum 时间戳
 * @param {string} format 时间格式
*/
 
 export function formatDate(timestamp, format='YYYY-MM-DD') {
    const date = new Date(timestamp); // 将时间戳转换为Date对象
    const map = {
      'YYYY': date.getFullYear(),
      'MM': date.getMonth() + 1, // 月份是从0开始的
      'DD': date.getDate(),
      'HH': date.getHours(),
      'mm': date.getMinutes(),
      'ss': date.getSeconds()
    };
    
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => {
      return map[match].toString().padStart(2, '0'); // 使用padStart补齐
    });
  }
