const prefixUrl = "http://localhost"

const apiReq = async (port, url, userOrPropertyID, method, body) => {
    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }

    if (method !== 'GET') {
        options.body = JSON.stringify({ ...body });
    }

    try {
        return await fetch(`${prefixUrl}:${port}/${url}/${userOrPropertyID}`, { options });   
    } catch (error) {
        return error
    }
}

const apiReqByUserAndProperty = async (port, url, userId, propertyId, method, body) => {
    const response = await fetch(`${prefixUrl}:${port}/${url}/${userId}/${propertyId}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body }),
        credentials: 'include'
    });

    return response
}

module.exports = { apiReq, apiReqByUserAndProperty }