const error = (errorMessage, errorCode) => {
    const err = {}
    err.errorMessage = errorMessage
    if (errorCode)
        err.errorCode = errorCode
    throw err
}

module.exports = { error }