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

router.get('/', (req, res) => {
    res.status(200).json({ api_check: "all ok" })
})

// endpoint:    /get.user/:user_id
router.get('/get.user/:user_id', async (req, res) => {
    const user_id = req.params.user_id

    try {
        const response = await getUserService(user_id)

        if (response.dbStatus === 500) {
            res.status(500).json({ error: "DB error." })
        } else if (response.dbStatus === 404) {
            res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({message: "User fetched.", response: response.response})
    } catch (error) {
        res.status(500).json({ error: `server error while getting user: ${error}` })
    }
})

// endpoint:    /create.user
router.post('/create.user', async(req, res) => {
    const { 
        user_id, first_name, last_name, email, password, phone_number 
    } = req.body

    try {
        const response = await createUserService(
            user_id, first_name, last_name, email, password, phone_number
        )

        if (response.dbStatus === 500) {
            res.status(500).json({ error: "DB error." })
        } else if (response.dbStatus === 404) {
            res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({message: "User created."})
    } catch (error) {
        res.status(500).json({ error: `server error while creating user: ${error}` })
    }
})

// endpoint:    /update.user/:user_id
router.put('/update.user/:user_id', async(req, res) => {
    const user_id = req.params.user_id
    const {
        first_name, last_name, email, password, phone_number
    } = req.body

    try {
        const response = await updateUserService(
            first_name, last_name, email, password, phone_number, user_id
        )

        if (response.dbStatus === 500) {
            res.status(500).json({ error: "DB error." })
        } else if (response.dbStatus === 404) {
            res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({message: "User updated."})
    } catch (error) {
        res.status(500).json({ error: `server error while updating user: ${error}` })
    }
})

// endpoint:    /delete.user/:user_id
router.delete('/delete.user/:user_id', async(req, res) => {
    const user_id = req.params.user_id

    try {
        const response = await deleteUserService(user_id)
        if (response.dbStatus === 500) {
            res.status(500).json({ error: "DB error." })
        } else if (response.dbStatus === 404) {
            res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({message: "User deleted."})
    } catch (error) {
        res.status(500).json({ error: `server error while deleting user: ${error}` })
    }
})

module.exports = router