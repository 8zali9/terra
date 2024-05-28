const createBuilderQuery = `
    INSERT INTO Builder (
        builder_id, builder_name, builder_website
    ) VALUES (
        ?, ?, ?
    )
`;

const getBuilderByIdQuery = `
    SELECT *
    FROM Builder
    WHERE builder_id = ?
`;

const getAllBuildersQuery = `
    SELECT *
    FROM Builder
`;

const updateBuilderQuery = `
    UPDATE Builder
    SET builder_name = ?, builder_website = ?
    WHERE builder_id = ?
`;

const deleteBuilderQuery = `
    DELETE FROM Builder
    WHERE builder_id = ?
`;

module.exports = {
    createBuilderQuery,
    getBuilderByIdQuery,
    getAllBuildersQuery,
    updateBuilderQuery,
    deleteBuilderQuery
}