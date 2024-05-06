const express = require('express')
const router = express.Router()
const {
    getUserService, 
    createUserService,
    updateUserService,
    deleteUserService,
    signinUserService,
    signoutUserService
} = require('../services/userServices')

// endpoint:    /getUser/:user_id
router.get(async(req, res) => {
    const user_id = req.params.user_id

    try {
        const response = await getUserService(user_id)

        if (response.dbStatus === 200) {
            res.status(200).json(response.result)
        } else if (response.dbStatus === 404) {
            res.status(404).json({ error: "not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }
})

// endpoint:    /createUser
router.post(async(req, res) => {
    const { 
        user_id, first_name, last_name, email, password, phone_number, user_profile_image 
    } = req.body

    try {
        const response = await createUserService(
            user_id, first_name, last_name, email, password, phone_number, user_profile_image
        )

        if (response.dbStatus === 200) {
            res.status(200).json(response.result)
        } else {
            res.status(300).json({ error: "unknown error (not server error)" })
        }
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }
})

module.exports = { router }