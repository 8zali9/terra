const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authenticate = require('./middleware/auth')
const proxyReq = require('./utils/proxyRequest')
require('dotenv').config()
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

// let them be not relative but absolute
const userBaseUrl = "/terra.user-service"
const propertyBaseUrl = "/terra.property-service"

app.get('/', (req, res) => {
  res.status(200).json({ testMsg: "All ok" })
})

// user-service protected routes
app.get(`${userBaseUrl}/get.user/:user_id`, authenticate, proxyReq)
app.post(`${userBaseUrl}/create.user/`, authenticate, proxyReq)
app.put(`${userBaseUrl}/update.user/:user_id`, authenticate, proxyReq)
app.delete(`${userBaseUrl}/delete.user/:user_id`, authenticate, proxyReq)

// property-service protected routes
app.get(`${userBaseUrl}/get.user/:user_id`, authenticate, proxyReq)
app.post(`${propertyBaseUrl}/create.property/`, authenticate, proxyReq)
app.put(`${propertyBaseUrl}/update.property/:property_id`, authenticate, proxyReq)
app.delete(`${propertyBaseUrl}/delete.property/:property_id`, authenticate, proxyReq)

app.listen(port, () => {
    console.log(`Auth Gateway running on port:${port}`)
})