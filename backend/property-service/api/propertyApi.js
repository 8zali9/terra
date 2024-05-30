const express = require('express');
const router = express.Router();
const {
    getPropertyService,
    getAllPropertiesService,
    getUserPropertiesService,
    createPropertyService,
    updatePropertyService,
    deletePropertyService
} = require('../services/propertyServices');

router.get('/', (req, res) => {
    res.status(200).json({ api_check: "all ok" });
});

// endpoint:    /get.property/:property_id
router.get('/get.property/:property_id', async (req, res) => {
    const property_id = req.params.property_id;

    try {
        const response = await getPropertyService(property_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ error: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ error: response.error });
        } else {
            res.status(200).json({ message: "Property fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting property: ${error}` });
    }
});

// endpoint:    /get.allProperties
router.get('/get.allProperties', async (req, res) => {
    try {
        const response = await getAllPropertiesService();
        if (response.errorStatus === 500) {
            res.status(500).json({ error: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ error: response.error });
        } else {
            res.status(200).json({ message: "Properties fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting properties: ${error}` });
    }
});

// endpoint:    /get.property/:user_id
router.get('/get.property.user/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const response = await getUserPropertiesService(user_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ error: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ error: response.error });
        } else {
            res.status(200).json({ message: "Properties fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting property: ${error}` });
    }
});

// endpoint:    /create.property
router.post('/create.property', async (req, res) => {
    const {
        purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
        property_title, date_listed, property_description, property_history, 
        property_images, longitude, latitude, user_id, builder_name, location_name, property_subtype_id
    } = req.body;

    try {
        const response = await createPropertyService(
            purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
            property_title, date_listed, property_description, property_history, 
            property_images, longitude, latitude, user_id, builder_name, location_name, property_subtype_id
        );

        if (response.errorStatus === 500) {
            res.status(500).json({ error: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ error: response.error });
        } else {
            res.status(201).json({ message: "Property created.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while creating property: ${error}` });
    }
});

// endpoint:    /update.property/:property_id
router.put('/update.property/:property_id', async (req, res) => {
    const property_id = req.params.property_id;
    const { 
        purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
        property_title, date_listed, property_description, property_history, 
        property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
    } = req.body;

    try {
        const response = await updatePropertyService(
            purpose, price, on_installment, installment_rate, bedrooms, bathrooms, area, 
            property_id, property_title, date_listed, property_description, property_history, 
            property_images, longitude, latitude, user_id, builder_id, location_id, property_subtype_id
        );

        if (response.errorStatus === 500) {
            res.status(500).json({ error: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ error: response.error });
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "Property updated.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while updating property: ${error}` });
    }
});

// endpoint:    /delete.property/:property_id
router.delete('/delete.property/:property_id', async (req, res) => {
    const property_id = req.params.property_id;

    try {
        const response = await deletePropertyService(property_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ error: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ error: response.error });
        } else {
            res.status(204).json({ message: "Property deleted.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while deleting property: ${error}` });
    }
});

module.exports = router;
