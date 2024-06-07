const cluster = require('node:cluster')
const cores = require('node:os').availableParallelism()
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connect } = require('./conn_db/connect')
const propertyApi = require('./api/propertyApi')
const locationApi = require('./api/locationApi')

const port = process.env.PORT
const env = process.env.ENV

// if (cluster.isPrimary) {
//     for (let i = 0; i < cores; i++) {
//         cluster.fork()
//     }
// } else {
//     const app = express()

//     app.use(cors({
//         origin: 'http://localhost:3000',
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         credentials: true
//     }))

//     app.use(express.json())
//     app.use(express.urlencoded({ extended: true }))
//     app.use('/terra.property-service/', propertyApi)
//     app.use('/terra.property-service/', locationApi)

//     connect().then(() => {
//         app.listen(port, () => {
//             console.log(`property-service@${env}:${port}`)
//         })
//     }).catch(() => {
//         console.log(`error running property-service!`)
//         process.exit(1)
//     })
// }

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/terra.property-service/', propertyApi)
app.use('/terra.property-service/', locationApi)

connect().then(() => {
    app.listen(port, () => {
        console.log(`property-service@${env}:${port}`)
    })
}).catch(() => {
    console.log(`error running property-service!`)
    process.exit(1)
})