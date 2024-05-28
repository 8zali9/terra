const express = require('express');
const router = express.Router();
const {
    getPropertyTypeByIdService,
    getAllPropertyTypesService,
    createPropertyTypeService,
    updatePropertyTypeService,
    deletePropertyTypeService
} = require('../services/propertyTypeServices');

// endpoint:    /get.propertyType/:property_type_id
router.get('/get.propertyType/:property_type_id', async (req, res) => {
    const property_type_id = req.params.property_type_id;

    try {
        const response = await getPropertyTypeByIdService(property_type_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Property Type fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting property type: ${error}` });
    }
});

// endpoint:    /get.allPropertyTypes
router.get('/get.allPropertyTypes', async (req, res) => {
    try {
        const response = await getAllPropertyTypesService();
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Property Types fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting property types: ${error}` });
    }
});

// endpoint:    /create.propertyType
router.post('/create.propertyType', async (req, res) => {
    const { property_type_name } = req.body;

    try {
        const response = await createPropertyTypeService(property_type_name);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(201).json({ message: "Property Type created.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while creating property type: ${error}` });
    }
});

// endpoint:    /update.propertyType/:property_type_id
router.put('/update.propertyType/:property_type_id', async (req, res) => {
    const property_type_id = req.params.property_type_id;
    const { property_type_name } = req.body;

    try {
        const response = await updatePropertyTypeService(property_type_name, property_type_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "Property Type updated.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while updating property type: ${error}` });
    }
});

// endpoint:    /delete.propertyType/:property_type_id
router.delete('/delete.propertyType/:property_type_id', async (req, res) => {
    const property_type_id = req.params.property_type_id;

    try {
        const response = await deletePropertyTypeService(property_type_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(204).json({ message: "Property Type deleted.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while deleting property type: ${error}` });
    }
});

module.exports = router;
