/**
 * 格式化金额，针对 input 输入框
 * eg: '12.30.' => '12.30'
 * eg: '.' => ''
 * eg: '09' => '9'
 * @param value {string} 被格式化的值
 * @param digits {number} 显示位数（保留几位小数）
 * @return value {string} 格式后的值
 */
export function formatAmountInput (value, digits) {
  if (value !== '') {
    // '.' => ''
    // '2c' => '2'
    value = value.replace(/^\.|[^\d.]/g, '')
    if (value !== '') {
      if (value.charAt(0) === '0' && value.charAt(1) !== '.') {
        // '09' => '9'
        // '00' => '0'
        value = !+value ? '0' : value.substring(1)
      } else {
        const tempValue = value.split('.')
        if (tempValue.length >= 2) {
          if (typeof digits === 'number') {
            // eg(digits = 2): '12.300' => '12.30'
            if (digits) {
              let decimals = tempValue[1].substring(0, digits)
              value = tempValue[0] + '.' + decimals
            } else {
              // '12.' => '12'
              value = tempValue[0]
            }
          } else {
            // '12.30.' => '12.30'
            // '12..' => '12.'
            value = tempValue[0] + '.' + tempValue[1]
          }
        }
      }
    }
  }
  return value
}
