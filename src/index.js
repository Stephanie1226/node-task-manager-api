const express = require('express')
require('./db/mongoose')
/// Our router setup
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log('Server is up on port '+ port)
})


/// Uderstand how to use bcrypt
// const bcrypt = require('bcrypt')
// const myFunctionBcrypt = async () => {
//   const password = 'Red12345'
//   const hashedpwd = await bcrypt.hash(password, 8)
//   console.log(password)
//   console.log(hashedpwd)
//   const isMatch = await bcrypt.compare('Red12345', hashedpwd)
//   console.log(isMatch)
// }
// myFunctionBcrypt()

/// Uderstand how to use jsonwebtoken
// const jwt = require('jsonwebtoken')
// const myFunctionJsonWebToken = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisisthetoken', { expiresIn: '5 hours'})
//   console.log(token)

//   const data = jwt.verify(token, 'thisisthetoken')
//   console.log(data)
// }
// myFunctionJsonWebToken()




