const prefixUrl = "http://localhost"

const apiReq = async (port, url, userOrPropertyID, method, body) => {
    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }

    if (method !== 'GET' && method !== 'DELETE') {
        console.log("The body was attatched")
        options.body = JSON.stringify({ ...body });
    } else {
        console.log("!!!!!No body was attatched")
    }

    try {
        console.log(port, url, userOrPropertyID, method, body)
        if (userOrPropertyID)
            return await fetch(`${prefixUrl}:${port}/${url}/${userOrPropertyID}`, options);
        else
            return await fetch(`${prefixUrl}:${port}/${url}`, options);   
    } catch (error) {
        return error
    }
}

const apiReqByUserAndProperty = async (port, url, userId, propertyId, method, body) => {
    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }
    
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