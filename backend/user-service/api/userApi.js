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

router.get('/', (req, res) => {
    res.status(200).json({ api_check: "all ok" })
})

// endpoint:    /get.user/:user_id
router.get('/get.user/:user_id', async (req, res) => {
    const user_id = req.params.user_id

    try {
        const response = await getUserService(user_id)
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error })
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error })
        } else {
            res.status(200).json({ message: "User fetched.", response: response.response })
        }
    } catch (error) {
        res.status(500).json({ error: `server error while getting user: ${error}` })
    }
})

// endpoint:    /create.user
router.post('/create.user', async(req, res) => {
    const { 
        first_name, last_name, email, password, phone_number 
    } = req.body

    try {
        const response = await createUserService(
            first_name, last_name, email, password, phone_number
        )

        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error })
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error })
        } else {
            const userEmail = response.response
            amq_init("pub", userEmail, "user-account-created")
            res.status(201).json({ message: "User created.", response: response.response })
        }
    } catch (error) {
        res.status(500).json({ error: `server error while creating user: ${error}` })
    }
})

// endpoint:    /update.user/:user_id
router.put('/update.user/:user_id', async(req, res) => {
    const user_id = req.params.user_id
    const {
        first_name, last_name, email, password, phone_number, user_profile_image
    } = req.body

    try {        
        const response = await updateUserService(
            first_name, last_name, email, password, phone_number, user_profile_image, user_id
        )

        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error })
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error })
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "User updated." })
        }
    } catch (error) {
        res.status(500).json({ error: `server error while updating user: ${error}` })
    }
})

// endpoint:    /delete.user/:user_id
router.delete('/delete.user/:user_id', async(req, res) => {
    const user_id = req.params.user_id

    try {
        const response = await deleteUserService(user_id)
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error })
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error })
        } else {
            res.status(204).json({ message: "User deleted.", response: response.response })
        }
    } catch (error) {
        res.status(500).json({ error: `server error while deleted user: ${error}` })
    }
})

module.exports = router