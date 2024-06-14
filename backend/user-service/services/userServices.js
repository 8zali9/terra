const {
    getUser,
    createUser,
    updateUser,
    updateUserWithoutPassword,
    deleteUser
} = require('../dal/dataAccessLogic')
const { error } = require('../utils/Error')
const hashPassword = require('../utils/hashPassword')
const { v4: uuidv4 } = require('uuid')

const getUserService = async (user_id) => { 
    try {
        const response = await getUser(user_id)

        if (response.errorCode === 500) {
            throw error(`DB error: ${response}`, 500)
        } else if (response.errorCode === 404) {
            throw error(`User not found: ${response}`, 404)
        } else {
            return { message: "User fetched.", response: response.response }
        }
    } catch (error) {
        throw error
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

        if (response.errorCode === 500) {
            throw error(`DB error: ${response}`, 500)
        } else if (response.errorCode === 404) {
            throw error(`Cannot signup: ${response}`, 404)
        } else {
            return { message: "User Created.", response: email }
        }
    } catch (error) {
        throw error
    }
}

const updateUserService = async (
    first_name, last_name, email, password, phone_number, user_profile_image, user_id
) => {
    try {
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

        if (response.errorCode === 500) {
            throw error(`DB error: ${response}`, 500)
        } else if (response.errorCode === 404) {
            throw error(`Cannot update user: ${response}`, 500)
        } else {
            return { message: "User updated.", response: email, okStatus: 200 }
        }
    } catch (error) {
        throw error
    }
}

const deleteUserService = async (user_id) => {
    try {
        const response = await deleteUser(user_id)
        
        if (response.errorCode === 500) {
            throw error(`DB error: ${response}`, 500)
        } else if (response.errorCode === 404) {
            throw error(`Cannot delete user: ${response}`, 500)
        } else {
            return { message: "User deleted.", response: response.response }
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    getUserService, 
    createUserService,
    updateUserService,
    deleteUserService,
}