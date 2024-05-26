const { db } = require('../conn_db/connect')
const dbStatusObject = require('./dbStatus')
require('dotenv').config()
const util = require('util')
const {
    getUserQuery,
    getUserByEmailQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery
} = require('../queries/userQueries')

const accessData = async (query, [...queryParams]) => {
    try {
        const dbResponse = await db.promise().query(query, [...queryParams]);
        if (dbResponse[0].length == 0) {
            return { result: "user doesn't exist", dbStatus: dbStatusObject.notFound };
        }
        return { response: dbResponse[0][0], dbStatus: dbStatusObject.ok };
    } catch (err) {
        return { err };
    }
};

const getUser = async (user_id) => {
    return await accessData(getUserQuery, [user_id])
}

const getUserByEmail = async (userEmail) => {
    return await accessData(getUserByEmailQuery, [userEmail])
}

const createUser = async(user_id, first_name, last_name, email, password, phone_number) => {
    return await accessData(createUserQuery, [user_id, first_name, last_name, email, password, phone_number])
}

const updateUser = async(first_name, last_name, email, password, phone_number, user_id) => {
    return await accessData(updateUserQuery, [first_name, last_name, email, password, phone_number, user_id])
}

const deleteUser = async(user_id) => {
    return await accessData(deleteUserQuery, [user_id])
}

module.exports = {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}