const { db } = require('../conn_db/connect')
const dbStatusObject = require('./dbStatus')
require('dotenv').config()
const util = require('util')
const {
    getUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery
} = require('../queries/user_queries')

const accessData = async (query, queryParams) => {
    const dbResponse = await db.promise().query(query, [queryParams], (err, result) => {
        if (err) {
            return {err}
        } else {
            if (result.length === 0) {
                return dbStatusObject.dbError
            }
            return {result: result}
        }
    })
    return {res: dbResponse}
}

const getUser = async (user_id) => {
    return await accessData(getUserQuery, [user_id])
}

const createUser = async(user_id, first_name, last_name, email, password, phone_number, user_profile_image) => {
    return await accessData(createUserQuery, [user_id, first_name, last_name, email, password, phone_number, user_profile_image])
}

const updateUser = async(first_name, last_name, email, password, phone_number, user_profile_image, user_id) => {
    return await accessData(updateUserQuery, [first_name, last_name, email, password, phone_number, user_profile_image, user_id])
}

const deleteUser = async(user_id) => {
    return await accessData(deleteUserQuery, [user_id])
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}