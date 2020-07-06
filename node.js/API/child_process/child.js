const fs = require('fs')

console.log('in child process.')

console.log(`child process NODE_ENV is: ${process.env.NODE_ENV}`)

fs.writeFileSync('child_product.js', `
  console.log(\`I'm a product by the child process.\`)
`)
