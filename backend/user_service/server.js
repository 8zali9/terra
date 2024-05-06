const express = require('express')
require('dotenv').config()
const { connect } = require('./conn_db/connect')

const port = process.env.PORT
const env = process.env.ENV
const app = express()

app.use(express.json())

connect().then(() => {
    app.listen(port, () => {
        console.log(`user_service@${env}:${port}`)
    })
}).catch(() => {
    console.log(`error running user_service!`)
    process.exit(1)
})