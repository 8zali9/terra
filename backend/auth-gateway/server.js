const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const apis = require('./apis/registeredRoutes')
const port = process.env.PORT

const app = express()

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
  
app.use(cookieParser());
app.use(apis)

app.listen(port, () => {
    console.log(`Auth Gateway running on port:${port}`)
})