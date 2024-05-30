const express = require('express');
const router = express.Router();
const {
    getBuilderByIdService,
    getAllBuildersService,
    createBuilderService,
    updateBuilderService,
    deleteBuilderService
} = require('../services/builderServices');

// endpoint:    /get.builder/:builder_name
router.get('/get.builder/:builder_name', async (req, res) => {
    const builder_name = req.params.builder_name;

    try {
        const response = await getBuilderByIdService(builder_name);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Builder fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting builder: ${error}` });
    }
});

// endpoint:    /get.allBuilders
router.get('/get.allBuilders', async (req, res) => {
    try {
        const response = await getAllBuildersService();
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(200).json({ message: "Builders fetched.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while getting builders: ${error}` });
    }
});

// endpoint:    /create.builder
router.post('/create.builder', async (req, res) => {
    const { builder_name, builder_website } = req.body;

    try {
        const response = await createBuilderService(builder_name, builder_website);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(201).json({ message: "Builder created.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while creating builder: ${error}` });
    }
});

// endpoint:    /update.builder/:builder_id
router.put('/update.builder/:builder_id', async (req, res) => {
    const builder_id = req.params.builder_id;
    const { builder_name, builder_website } = req.body;

    try {
        const response = await updateBuilderService(builder_name, builder_website, builder_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else if (response.okStatus === 200) {
            res.status(200).json({ message: "Builder updated.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while updating builder: ${error}` });
    }
});

// endpoint:    /delete.builder/:builder_id
router.delete('/delete.builder/:builder_id', async (req, res) => {
    const builder_id = req.params.builder_id;

    try {
        const response = await deleteBuilderService(builder_id);
        if (response.errorStatus === 500) {
            res.status(500).json({ response: response.error });
        } else if (response.errorStatus === 404) {
            res.status(404).json({ response: response.error });
        } else {
            res.status(204).json({  message: "Builder deleted.", response: response.response });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error while deleting builder: ${error}` });
    }
});

module.exports = router;

