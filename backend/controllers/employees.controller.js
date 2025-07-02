const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getEmployees = async (req, res) => {
    try {
        const response = await pool.query('SELECT *, (EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento))) AS edad FROM empleados ORDER BY id ASC');
        res.status(200).json(response.rows);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('SELECT *, (EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento))) AS edad FROM empleados WHERE id = $1', [id]);
        if(response.rows.length === 0){
            return res.status(404).send('Employee not found');
        }
        res.status(200).json(response.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
};

const createEmployee = async (req, res) => {
    try {
        const { nombres, apellidos, genero, estado_civil, fecha_nacimiento, dpi, nit, igss, irtra, direccion, salario } = req.body;
        const response = await pool.query(
            'INSERT INTO empleados (nombres, apellidos, genero, estado_civil, fecha_nacimiento, dpi, nit, igss, irtra, direccion, salario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [nombres, apellidos, genero, estado_civil, fecha_nacimiento, dpi, nit, igss, irtra, direccion, salario]
        );
        res.status(201).json({
            message: 'Employee Added successfully',
            body: {
                employee: response.rows[0]
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
};

const updateEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nombres, apellidos, genero, estado_civil, fecha_nacimiento, dpi, nit, igss, irtra, direccion, salario } = req.body;

        const response = await pool.query(
            'UPDATE empleados SET nombres = $1, apellidos = $2, genero = $3, estado_civil = $4, fecha_nacimiento = $5, dpi = $6, nit = $7, igss = $8, irtra = $9, direccion = $10, salario = $11 WHERE id = $12 RETURNING *',
            [nombres, apellidos, genero, estado_civil, fecha_nacimiento, dpi, nit, igss, irtra, direccion, salario, id]
        );
         if(response.rows.length === 0){
            return res.status(404).send('Employee not found');
        }
        res.status(200).json({
            message: 'Employee Updated Successfully',
            body: {
                employee: response.rows[0]
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('DELETE FROM empleados where id = $1', [id]);
        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(`Employee ${id} deleted Successfully`);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};