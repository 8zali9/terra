const createProvinceQuery = `
    INSERT INTO Province (
        province_id, province_name
    ) VALUES (
        ?, ?
    )
`;

const getProvinceByIdQuery = `
    SELECT *
    FROM Province
    WHERE province_id = ?
`;

const getAllProvincesQuery = `
    SELECT *
    FROM Province
`;

const updateProvinceQuery = `
    UPDATE Province
    SET province_name = ?
    WHERE province_id = ?
`;

const deleteProvinceQuery = `
    DELETE FROM Province
    WHERE province_id = ?
`;

module.exports = {
    createProvinceQuery,
    getProvinceByIdQuery,
    getAllProvincesQuery,
    updateProvinceQuery,
    deleteProvinceQuery
}