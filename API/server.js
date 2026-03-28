const express = require('express');
const cors = require('cors');
const db = require('./initDB');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

async function start() {
    await Model.makeConnection();
    Model.initializeDatabase();

    // Routes
    app.get('/api', async (req, res) => {
        const trips = await db.all('SELECT * FROM trips');
        req.json(trips);
    });
    
    app.post('/api', async (req, res) => {
        const { routeName, difficulty, distance, description } = req.body;
        const result = await db.run('INSERT INTO trips (routeName, difficulty, distance, description)', [routeName, difficulty, distance, description]);
        res.json({ status : 'New record created with ID=${result.lastID}'});
    });

    app.delete('/api', async (req, res) => {
        await db.run('DELETE FROM trips');
        req.json({status : 'Records deleted'});
    });

    app.get('/api/:id', async (req, res) => {
        const trip = await db.get('SELECT * FROM trips WHERE id = ?', [req.params.id]);
        req.json(trip);
    });

    app.put('/api/:id', async (req, res) => {
        const { routeName, difficulty, distance, description } = req.body;
        await db.run('UPDATE trips SET routeName=?, difficulty=?, distance=?, description=?', [routeName, difficulty, distance, description]);
        req.json({status : 'Updated item with ID=${req.params.id}'});
    });

    app.delete('/api/:id', async (req, res) => {
        await db.run('DELETE FROM trips WHERE id=?', [id]);
        req.json({status : 'Deleted item with ID=${req.params.id}'});
    });
}