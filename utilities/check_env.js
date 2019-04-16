const { includes } = require('lodash')
const chalk = require('chalk')

const allowENV = ['development', 'test', 'production']

function checkEnv (scriptName) {
  const ENV = process.env.NODE_ENV

  if (!ENV) {
    console.log(`
    ------------执行脚本请加上环境变量----------------
    使用示例：

    NODE_ENV=production node scripts/${scriptName}
    可选环境变量如下：
      ${allowENV}
    `)
    process.exit(0)
  }

  if (!includes(allowENV, ENV)) {
    console.log(`
    选择的环境变量不是一个有效的环境变量
    可选环境变量如下：
      ${allowENV}
    `)
    process.exit(0)
  } else {
    console.log(chalk.blue(`Current NODE_ENV: ${ENV}`))
  }
}

module.exports = checkEnv
