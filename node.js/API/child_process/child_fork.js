console.log('child_fork @@ in child process.')

console.log(`child_fork @@ child process NODE_ENV is: ${process.env.NODE_ENV}`)

process.on('message', (msg) => {
  console.log('Child got parent message: ', msg)
})

process.send({ hello: 'Parent' })