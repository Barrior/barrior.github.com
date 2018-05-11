const cp = require('child_process')

// 执行某个命令，options 被控制，主要 标准输出和标准错误的 maxBuffer 被限制为 200*1024
cp.execSync('node ./child.js')

// 雷同于 exec 命令，只是没有 maxBuffer 等限制
// env 赋值的时候，需要浅复制 process.env
cp.spawn('node', ['child.js'], {
  env: Object.assign(process.env, {
    NODE_ENV: 'development',
  }),
})

// 基于 spawn 方法封装出来执行 node 模块的子进程
// env 赋值的时候，不需要浅复制，貌似帮我们做了
const child_fork = cp.fork('./child_fork.js', {
  env: {
    NODE_ENV: 'development',
  },
})

child_fork.on('message', (msg) => {
  console.log('Parent got child message: ', msg)
})

setTimeout(() => {
  child_fork.send({ hello: 'Child' })
  process.exit(0)
}, 1000)

console.log('done')
