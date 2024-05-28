const express = require('express');
const router = express.Router();
const {
    getCityByIdService,
    getAllCitiesService,
    createCityService,
    updateCityService,
    deleteCityService
} = require('../services/cityServices');

// endpoint:    /get.city/:city_id
router.get('/get.city/:city_id', async (req, res) => {
    const city_id = req.params.city_id;

    try {
        const response = await getCityByIdService(city_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "City fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting city: ${error}` });
    }
});

// endpoint:    /get.allCities
router.get('/get.allCities', async (req, res) => {
    try {
        const response = await getAllCitiesService();
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Cities fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting cities: ${error}` });
    }
});

// endpoint:    /create.city
router.post('/create.city', async (req, res) => {
    const { city_name, province_id } = req.body;

    try {
        const response = await createCityService(city_name, province_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(201).json({ message: "City created.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while creating city: ${error}` });
    }
});

// endpoint:    /update.city/:city_id
router.put('/update.city/:city_id', async (req, res) => {
    const city_id = req.params.city_id;
    const { city_name, province_id } = req.body;

    try {
        const response = await updateCityService(city_name, province_id, city_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "City updated.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while updating city: ${error}` });
    }
});

// endpoint:    /delete.city/:city_id
router.delete('/delete.city/:city_id', async (req, res) => {
    const city_id = req.params.city_id;

    try {
        const response = await deleteCityService(city_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(204).json({ message: "City deleted.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while deleting city: ${error}` });
    }
});

module.exports = router;
