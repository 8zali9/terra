const express = require('express')
const router = express.Router()
const {
    getUserService, 
    createUserService,
    updateUserService,
    deleteUserService,
} = require('../services/userServices')
// message queue
const { amq_init } = require('../../message-queue/amq_init')
const { error } = require('../utils/Error')

router.get('/', (req, res) => {
    res.status(200).json({ api_check: "all ok" })
})

// endpoint:    /get.user/:user_id
router.get('/get.user/:user_id', async (req, res) => {
    const user_id = req.params.user_id

    try {
        if (!user_id)
            throw error("User ID missing", 404)

        const user = await getUserService(user_id)

        if ("errno" in user)
            throw error(`Error getting user: ${user}`, 500)
        
        res.status(200).json(user)
    } catch (error) {
        res.status(error.errorCode).json({ error: error.errorMessage })
    }
})

// endpoint:    /create.user
router.post('/create.user', async(req, res) => {
    const { 
        first_name, last_name, email, password, phone_number 
    } = req.body

    try {
        if (!first_name || !last_name || !email || !password || !phone_number)
            throw error("Parameters missing", 404)

        const response = await createUserService(
            first_name, last_name, email, password, phone_number
        )

        if ("errno" in response)
            throw error(`Error creating user: ${response}`, 500)

        const userEmail = response.response
        amq_init("pub", userEmail, "account-creation-notification")
        res.status(201).json({ message: "User created.", response: response.response })
    } catch (error) {
        res.status(error.errorCode).json({ error: error.errorMessage })
    }
})

// endpoint:    /update.user/:user_id
router.put('/update.user/:user_id', async(req, res) => {
    const user_id = req.params.user_id
    const {
        first_name, last_name, email, password, phone_number, user_profile_image
    } = req.body

    try {        
        if (!user_id || !first_name || !last_name || !email || !phone_number || !user_profile_image)
            throw error("Parameters missing", 404)

        const response = await updateUserService(
            first_name, last_name, email, password, phone_number, user_profile_image, user_id
        )

        if ("errno" in response)
            throw error(`Error updating user: ${response}`, 500)

        const userEmail = response.response
        amq_init("pub", userEmail, "account-updation-notification")
        res.status(200).json({ message: "User updated.", response: response.response })
    } catch (error) {
        res.status(error.errorCode).json({ error: error.errorMessage })
    }
})

// endpoint:    /delete.user/:user_id
router.delete('/delete.user/:user_id', async(req, res) => {
    const user_id = req.params.user_id

    try {
        if (!user_id)
            throw error("User ID missing", 404)
        
        const response = await deleteUserService(user_id)

        if ("errno" in response)
            throw error(`Error deleting user: ${response}`, 500)

        res.status(200).json({ message: "User deleted." })
    } catch (error) {
        res.status(error.errorCode).json({ error: error.errorMessage })
    }
})

module.exports = router