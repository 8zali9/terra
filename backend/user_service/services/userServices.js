const {
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../dal/dataAccessLogic')

const getUserService = (user_id) => { 
    return getUser(user_id)
}

const createUserService = (
    user_id, first_name, last_name, email, password, phone_number, user_profile_image
) => {
    return createUser(
        user_id, first_name, last_name, email, password, phone_number, user_profile_image
    )
}

const updateUserService = (
    first_name, last_name, email, password, phone_number, user_profile_image, user_id
) => {
    return updateUser(
        first_name, last_name, email, password, phone_number, user_profile_image, user_id
    )
}

const deleteUserService = (user_id) => {
    return deleteUser(user_id)
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