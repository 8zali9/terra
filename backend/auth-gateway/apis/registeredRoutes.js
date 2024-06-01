const express = require('express')
const authenticate = require('../middleware/auth')
const proxyReq = require('../utils/proxyRequest')

const router = express.Router()

const userBaseUrl = "/terra.user-service"
const propertyBaseUrl = "/terra.property-service"

router.get('/', (req, res) => {
  res.status(200).json({ testMsg: "All ok" })
})

// user-service protected routes
router.get(`${userBaseUrl}/get.user/:user_id`, authenticate, proxyReq)
router.post(`${userBaseUrl}/create.user/`, authenticate, proxyReq)
router.put(`${userBaseUrl}/update.user/:user_id`, authenticate, proxyReq)
router.delete(`${userBaseUrl}/delete.user/:user_id`, authenticate, proxyReq)

// property-service protected routes
router.get(`${propertyBaseUrl}/get.property/:property_id`, authenticate, proxyReq)
router.post(`${propertyBaseUrl}/create.property/`, authenticate, proxyReq)
router.put(`${propertyBaseUrl}/update.property/:property_id`, authenticate, proxyReq)
router.delete(`${propertyBaseUrl}/delete.property/:property_id`, authenticate, proxyReq)

module.exports = router