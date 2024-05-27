const axios = require('axios')

const proxyReq = async (req, res) => {
    try {
        console.log("proxy hit", req.originalUrl)
        const response = await axios({
            method: req.method,
            url: `http://localhost:80${req.originalUrl}`,
            data: req.body,
            headers: {
                ...req.headers,
                host: 'localhost'
            }
        })
        console.log("proxy done")
        res.status(response.status).json(response.data)
    } catch (error) {
        if (error.response)
            res.status(error.response.status).json(error.response.data)
        else
        res.status(500).json({ error: "Error proxying request" })
    }
}

module.exports = proxyReq