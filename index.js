
const express = require('express');
const knex = require('knex')(require('./knexfile').development);
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Knex ORM CRUD API',
			version: '1.0.0',
			description: 'CRUD API with Express, Knex, and SQLite',
		},
	},
	apis: ['./index.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
app.use(express.json());


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
app.post('/users', async (req, res) => {
	try {
		const [id] = await knex('users').insert(req.body);
		res.status(201).json({ id });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
app.get('/users/:id', async (req, res) => {
	const user = await knex('users').where({ id: req.params.id }).first();
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ error: 'User not found' });
	}
});
// Basic entry point


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get('/users', async (req, res) => {
	const users = await knex('users').select('*');
	res.json(users);
});


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
app.put('/users/:id', async (req, res) => {
	try {
		await knex('users').where({ id: req.params.id }).update(req.body);
		res.json({ success: true });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 */
app.delete('/users/:id', async (req, res) => {
	try {
		await knex('users').where({ id: req.params.id }).del();
		res.json({ success: true });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});


// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
