const createBuilderQuery = `
    INSERT INTO Builder (
        builder_id, builder_name, builder_website
    ) VALUES (
        ?, ?, ?
    )
`;

const getBuilderByNameQuery = `
    SELECT *
    FROM Builder
    WHERE builder_name = ?
`;

const getAllBuildersQuery = `
    SELECT *
    FROM Builder
`;

const updateBuilderQuery = `
    UPDATE Builder
    SET builder_name = ?, builder_website = ?
    WHERE builder_name = ?
`;

const deleteBuilderQuery = `
    DELETE FROM Builder
    WHERE builder_name = ?
`;

module.exports = {
    createBuilderQuery,
    getBuilderByNameQuery,
    getAllBuildersQuery,
    updateBuilderQuery,
    deleteBuilderQuery
}