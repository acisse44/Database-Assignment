const Pool = require('pg').Pool
const pool = new Pool({
  user: 'aminatacisse',
  host: 'localhost',
  database: 'aminatacisse',
  password: 'password',
  port: 5432,
})

const getAllCountries = (request, response) => {
    pool.query('SELECT * FROM countries ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createCountry = (request, response) => {
    const { country_name, cities_id, language_id, food_id } = request.body
  
    pool.query('INSERT INTO countries (country_name, cities_id, language_id, food_id) VALUES ($1, $2, $3, $4) RETURNING *', ['Somalia', '4', '2', '5'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Country added with ID: ${results.rows[0].id} Country Name: ${results.rows[0].country_name} 
      City ${results.rows[0].cities_id} Language: ${results.rows[0].language_id} Food ${results.rows[0].food_id} 
      
      `)
    })
  }
  const createFood = (request, response) => {
    const { food_name } = request.body
  
    pool.query('INSERT INTO foods (food_name) VALUES ($1 ) RETURNING *', ['Plantain fufu'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Food added with ID: ${results.rows[0].id} Food Name: ${results.rows[0].food_name}`)
    })
  }

  module.exports = {
    getAllCountries,
    createCountry,
    createFood
};