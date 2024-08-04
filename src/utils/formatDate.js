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

  /**
   * @param {Number} monthOffset 月份偏移量，正数表示未来，负数表示过去 
   */
  export function getDateForMonthOffset(monthOffset) {
    // 创建一个新的Date对象，用于存储当前的日期和时间
    var currentDate = new Date();
  
    // 设置新的月份，`setMonth()`接受的参数是0-based的，即0表示一月，11表示十二月
    // `monthOffset`可以是正数或负数，正数表示未来，负数表示过去
    currentDate.setMonth(currentDate.getMonth() - monthOffset);
  
    // 提取年、月、日、时、分、秒
    var year = currentDate.getFullYear();
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // 加1是因为月份是0-based的
    var day = ("0" + currentDate.getDate()).slice(-2);
    var hours = ("0" + currentDate.getHours()).slice(-2);
    var minutes = ("0" + currentDate.getMinutes()).slice(-2);
    var seconds = ("0" + currentDate.getSeconds()).slice(-2);
  
    // 返回格式化的日期和时间字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }