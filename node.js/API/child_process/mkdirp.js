const fs = require('fs')
const path = require('path')
const cp = require('child_process')

const filePath = path.resolve(__dirname, './a/b/c/')

console.log(fs.existsSync(filePath))

cp.execSync(`mkdir -p ${filePath}`)

console.log(fs.existsSync(filePath))

// rmdir 不能删除非空目录
// -p 递归删除目录, 当子目录删除后其父目录为空时，也一同被删除。
try {
  cp.execSync(`rmdir -p ${filePath}`)
} catch (e) {
  console.log(e)
}
