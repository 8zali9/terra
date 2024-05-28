const express = require('express');
const router = express.Router();
const {
    getLocationByIdService,
    getAllLocationsService,
    createLocationService,
    updateLocationService,
    deleteLocationService
} = require('../services/locationServices');

// endpoint:    /get.location/:location_id
router.get('/get.location/:location_id', async (req, res) => {
    const location_id = req.params.location_id;

    try {
        const response = await getLocationByIdService(location_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Location fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting location: ${error}` });
    }
});

// endpoint:    /get.allLocations
router.get('/get.allLocations', async (req, res) => {
    try {
        const response = await getAllLocationsService();
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Locations fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting locations: ${error}` });
    }
});

// endpoint:    /create.location
router.post('/create.location', async (req, res) => {
    const { location_name, city_id } = req.body;

    try {
        const response = await createLocationService(location_name, city_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(201).json({ message: "Location created.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while creating location: ${error}` });
    }
});

// endpoint:    /update.location/:location_id
router.put('/update.location/:location_id', async (req, res) => {
    const location_id = req.params.location_id;
    const { location_name, city_id } = req.body;

    try {
        const response = await updateLocationService(location_name, city_id, location_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "Location updated.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while updating location: ${error}` });
    }
});

// endpoint:    /delete.location/:location_id
router.delete('/delete.location/:location_id', async (req, res) => {
    const location_id = req.params.location_id;

    try {
        const response = await deleteLocationService(location_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(204).json({ message: "Location deleted.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while deleting location: ${error}` });
    }
});

module.exports = router;
