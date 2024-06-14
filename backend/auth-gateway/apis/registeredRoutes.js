const express = require('express')
const authenticate = require('../middleware/auth')
const proxyReq = require('../utils/proxyRequest')
const generateToken = require('../utils/generateToken')
const matchPassword = require('../utils/matchPassword')
require('dotenv').config()
const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
})
const db = conn.promise()

const getUserByEmailQuery = `
    select *
    from User
    where email = ?
`;

const getUserByEmail = async (userEmail, userPassword) => {
    try {
      const result = await db.query(getUserByEmailQuery, [userEmail, userPassword]);
      if (result[0] === 0) {
        return { error: "User doesnt exist" }
      } else {
        return result[0];
      }
    } catch (error) {
      return {error};
    }
};

const router = express.Router()

// endpoint:    /signin
router.post('/signin',  async(req, res) => {
  try {
    const { userEmail, userPassword } = req.body
    const user = await getUserByEmail(userEmail, userPassword)
    // console.log(user)
    const passMatchCheck = await matchPassword(
      userPassword,
      user[0].password
    );

    if (!passMatchCheck) {
      return res.status(401).json({ error: "Incorrect Credentials." });
    }

    await generateToken(res, user)
    res.status(200).json({ message: "User Signed in.", user })
  } catch (error) {
    return { error: `No user found: ${error}` }
  }
})

// endpoint:    /signout
router.post('/signout', async (req, res) => {
  try {
      res.cookie("jwt", "", {
          httpOnly: true,
          expires: new Date(0),
      })
  
      res.status(204).json({ message: "User Signed out" })
  } catch (error) {
      res.status(500).json({ error: `server error while signing out user: ${error}` })
  }
})

const userBaseUrl = "/terra.user-service"
const propertyBaseUrl = "/terra.property-service"

// user-service protected routes
router.get(`${userBaseUrl}/get.user/:user_id`, authenticate, proxyReq)
router.post(`${userBaseUrl}/create.user`, proxyReq)
router.put(`${userBaseUrl}/update.user/:user_id`, authenticate, proxyReq)
router.delete(`${userBaseUrl}/delete.user/:user_id`, authenticate, proxyReq)

// property-service protected routes
router.get(`${propertyBaseUrl}/get.property/:property_id`, proxyReq)
router.get(`${propertyBaseUrl}/get.allProperties`, proxyReq)
router.get(`${propertyBaseUrl}/get.allLocations`, proxyReq)
router.get(`${propertyBaseUrl}/get.property.user/:user_id`, authenticate, proxyReq)
router.post(`${propertyBaseUrl}/create.property`, authenticate, proxyReq)
router.post(`${propertyBaseUrl}/get.searchFilterProperties`, proxyReq)
router.put(`${propertyBaseUrl}/update.property/:user_id/:property_id`, authenticate, proxyReq)
router.delete(`${propertyBaseUrl}/delete.property/:user_id/:property_id`, authenticate, proxyReq)

module.exports = router