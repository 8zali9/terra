const {
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../dal/dataAccessLogic')

const getUserService = async (user_id) => { 
    return await getUser(user_id)
}

const createUserService = async (
    user_id, first_name, last_name, email, password, phone_number
) => {
    return await createUser(
        user_id, first_name, last_name, email, password, phone_number
    )
}

const updateUserService = async (
    first_name, last_name, email, password, phone_number, user_id
) => {
    return await updateUser(
        first_name, last_name, email, password, phone_number, user_id
    )
}

const deleteUserService = async (user_id) => {
    return await deleteUser(user_id)
}

const signinUserService = () => {}

const signoutUserService = () => {}

module.exports = {
    getUserService, 
    createUserService,
    updateUserService,
    deleteUserService,
    signinUserService,
    signoutUserService
}