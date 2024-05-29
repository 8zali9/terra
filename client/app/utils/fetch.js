const prefixUrl = "http://localhost"

const options = {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
}

const apiReq = async (port, url, userOrPropertyID, method, body) => {
    options.method = method
    if (method !== 'GET' && method !== 'DELETE') {
        options.body = JSON.stringify({ ...body });
    }

    try {
        if (userOrPropertyID)
            return await fetch(`${prefixUrl}:${port}/${url}/${userOrPropertyID}`, options);
        else
            return await fetch(`${prefixUrl}:${port}/${url}`, options);   
    } catch (error) {
        return error
    }
}

const apiReqByUserAndProperty = async (port, url, userId, propertyId, method, body) => {
    options.method = method
    if (method !== 'GET' && method !== 'DELETE') {
        options.body = JSON.stringify({ ...body });
    }

    try {
        return await fetch(`${prefixUrl}:${port}/${url}/${userId}/${propertyId}`, options);
    } catch (error) {
        return error
    }
}

module.exports = { apiReq, apiReqByUserAndProperty }