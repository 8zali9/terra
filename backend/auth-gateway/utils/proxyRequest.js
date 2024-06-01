const axios = require('axios')

const proxyReq = async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://127.0.0.1${req.originalUrl}`,
            data: req.body,
            headers: {
                ...req.headers,
                host: 'localhost'
            }
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        if (error.response)
            res.status(error.response.status).json(error.response.data)
        else
        res.status(500).json({ error: `Error proxying request: ${error}` })
    }
}

module.exports = proxyReq