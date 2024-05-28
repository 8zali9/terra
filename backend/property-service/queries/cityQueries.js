const createCityQuery = `
    INSERT INTO City (
        city_id, city_name, province_id
    ) VALUES (
        ?, ?, ?
    )
`;

const getCityByIdQuery = `
    SELECT *
    FROM City
    WHERE city_id = ?
`;

const getAllCitiesQuery = `
    SELECT *
    FROM City
`;

const updateCityQuery = `
    UPDATE City
    SET city_name = ?, province_id = ?
    WHERE city_id = ?
`;

const deleteCityQuery = `
    DELETE FROM City
    WHERE city_id = ?
`;

module.exports = {
    createCityQuery,
    getCityByIdQuery,
    getAllCitiesQuery,
    updateCityQuery,
    deleteCityQuery
}