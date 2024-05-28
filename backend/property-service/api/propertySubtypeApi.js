const express = require('express');
const router = express.Router();
const {
    getPropertySubtypeByIdService,
    getAllPropertySubtypesService,
    createPropertySubtypeService,
    updatePropertySubtypeService,
    deletePropertySubtypeService
} = require('../services/propertySubtypeServices');

// endpoint:    /get.propertySubtype/:property_subtype_id
router.get('/get.propertySubtype/:property_subtype_id', async (req, res) => {
    const property_subtype_id = req.params.property_subtype_id;

    try {
        const response = await getPropertySubtypeByIdService(property_subtype_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Property Subtype fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting property subtype: ${error}` });
    }
});

// endpoint:    /get.allPropertySubtypes
router.get('/get.allPropertySubtypes', async (req, res) => {
    try {
        const response = await getAllPropertySubtypesService();
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Property Subtypes fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting property subtypes: ${error}` });
    }
});

// endpoint:    /create.propertySubtype
router.post('/create.propertySubtype', async (req, res) => {
    const { property_subtype_name, property_type_id } = req.body;

    try {
        const response = await createPropertySubtypeService(property_subtype_name, property_type_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(201).json({ message: "Property Subtype created.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while creating property subtype: ${error}` });
    }
});

// endpoint:    /update.propertySubtype/:property_subtype_id
router.put('/update.propertySubtype/:property_subtype_id', async (req, res) => {
    const property_subtype_id = req.params.property_subtype_id;
    const { property_subtype_name, property_type_id } = req.body;

    try {
        const response = await updatePropertySubtypeService(property_subtype_name, property_type_id, property_subtype_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "Property Subtype updated.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while updating property subtype: ${error}` });
    }
});

// endpoint:    /delete.propertySubtype/:property_subtype_id
router.delete('/delete.propertySubtype/:property_subtype_id', async (req, res) => {
    const property_subtype_id = req.params.property_subtype_id;

    try {
        const response = await deletePropertySubtypeService(property_subtype_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(204).json({ message: "Property Subtype deleted.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while deleting property subtype: ${error}` });
    }
});

module.exports = router;
