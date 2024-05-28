const bcrypt = require('bcrypt')

const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(plainPassword, salt)
}

module.exports = hashPassword