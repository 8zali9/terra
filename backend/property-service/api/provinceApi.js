const express = require('express');
const router = express.Router();
const {
    getProvinceByIdService,
    getAllProvincesService,
    createProvinceService,
    updateProvinceService,
    deleteProvinceService
} = require('../services/provinceServices');

// endpoint:    /get.province/:province_id
router.get('/get.province/:province_id', async (req, res) => {
    const province_id = req.params.province_id;

    try {
        const response = await getProvinceByIdService(province_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Province fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting province: ${error}` });
    }
});

// endpoint:    /get.allProvinces
router.get('/get.allProvinces', async (req, res) => {
    try {
        const response = await getAllProvincesService();
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Provinces fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting provinces: ${error}` });
    }
});

// endpoint:    /create.province
router.post('/create.province', async (req, res) => {
    const { province_name } = req.body;

    try {
        const response = await createProvinceService(province_name);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(201).json({ message: "Province created.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while creating province: ${error}` });
    }
});

// endpoint:    /update.province/:province_id
router.put('/update.province/:province_id', async (req, res) => {
    const province_id = req.params.province_id;
    const { province_name } = req.body;

    try {
        const response = await updateProvinceService(province_name, province_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "Province updated.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while updating province: ${error}` });
    }
});

// endpoint:    /delete.province/:province_id
router.delete('/delete.province/:province_id', async (req, res) => {
    const province_id = req.params.province_id;

    try {
        const response = await deleteProvinceService(province_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(204).json({ message: "Province deleted.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while deleting province: ${error}` });
    }
});

module.exports = router;

