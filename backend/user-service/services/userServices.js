const {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    updateUserWithoutPassword,
    deleteUser
} = require('../dal/dataAccessLogic')
const matchPassword = require('../utils/matchPassword')
const hashPassword = require('../utils/hashPassword')
const { v4: uuidv4 } = require('uuid')

const getUserService = async (user_id) => { 
    try {
        const response = await getUser(user_id)

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 }
        } else if (response.dbStatus === 404) {
            return { error: "User not found", errorStatus: 404 }
        }
        return {message: "User fetched.", response: response.response}
    } catch (error) {
        return { error: `server/service error while getting user: ${error}` }
    }
}

const createUserService = async (
    first_name, last_name, email, password, phone_number
) => {
    try {
        const hashedPassword = await hashPassword(password)
        const user_id = uuidv4();
        const response = await createUser(
            user_id, first_name, last_name, email, hashedPassword, phone_number
        )

        if (response.dbStatus === 500) {
            return { error: "DB error." }
        } else if (response.dbStatus === 404) {
            return { error: "Cannot signup" }
        }

        return {message: "User Created.", response: email }
    } catch (error) {
        return { error: `server/service error while creating user: ${error}` }
    }
}

const updateUserService = async (
    first_name, last_name, email, password, phone_number, user_profile_image, user_id
) => {
    try {
        // console.log(user_profile_image)
        let response;
        if (password) {
            let hashedPassword;
            if (password)
                hashedPassword = await hashPassword(password)
            else {
                const previousPass = await getUser(user_id)
                hashedPassword = previousPass.response.password
            }
            response = await updateUser(
                first_name, last_name, email, hashedPassword, phone_number, user_profile_image, user_id
            )
        } else {
            response = await updateUserWithoutPassword(
                first_name, last_name, email, phone_number, user_profile_image, user_id
            )
        }

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 }
        } else if (response.dbStatus === 404) {
            return { error: "User not found", errorStatus: 404 }
        }
        return { message: "User updated.", response: email, okStatus: 200 }
    } catch (error) {
        return { error: `server/service error while updating user: ${error}` }
    }
}

const deleteUserService = async (user_id) => {
    try {
        const response = await deleteUser(user_id)

        if (response.dbStatus === 500) {
            return { error: "DB error.", errorStatus: 500 }
        } else if (response.dbStatus === 404) {
            return { error: "User not found", errorStatus: 404 }
        }
        return {message: "User deleted.", response: response.response}
    } catch (error) {
        return { error: `server/service error while deleting user: ${error}` }
    }
}

module.exports = {
    getUserService, 
    createUserService,
    updateUserService,
    deleteUserService,
}