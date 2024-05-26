const bcrypt = require('bcrypt')

const matchPassword = async (enteredPassword, hashedSavedPassword) => {
    if (enteredPassword !== null && enteredPassword !== undefined)
        return await bcrypt.compare(enteredPassword, hashedSavedPassword)
    return false
}

module.exports = matchPassword