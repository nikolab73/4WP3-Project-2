const express = require('express');
const cors = require('cors');
const { makeConnection, initializeDatabase } = require('./initDB');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

async function start() {
    const db = await makeConnection();
    await initializeDatabase();

    // GET all trips
    app.get('/api', async (req, res) => {
        const trips = await db.all('SELECT * FROM trips');
        res.json(trips);
    });

    // POST new trip
    app.post('/api', async (req, res) => {
        const { routeName, difficulty, distance, description } = req.body;
        const result = await db.run(
            'INSERT INTO trips (routeName, difficulty, distance, description) VALUES (?, ?, ?, ?)',
            [routeName, difficulty, distance, description]
        );
        res.json({ status: `New record created with id=${result.lastID}` });
    });

    // PUT replace collection
    app.put('/api', async (req, res) => {
        const trips = req.body;
        await db.run('DELETE FROM trips');
        for (const trip of trips) {
            await db.run(
                'INSERT INTO trips (routeName, difficulty, distance, description) VALUES (?, ?, ?, ?)',
                [trip.routeName, trip.difficulty, trip.distance, trip.description]
            );
        }
        res.json({ status: 'Collection replaced' });
    });

    // DELETE all trips
    app.delete('/api', async (req, res) => {
        await db.run('DELETE FROM trips');
        res.json({ status: 'Collection deleted' });
    });

    // GET one trip
    app.get('/api/:id', async (req, res) => {
        const trip = await db.get('SELECT * FROM trips WHERE id = ?', [req.params.id]);
        res.json(trip);
    });

    // PUT update one trip
    app.put('/api/:id', async (req, res) => {
        const { routeName, difficulty, distance, description } = req.body;
        await db.run(
            'UPDATE trips SET routeName=?, difficulty=?, distance=?, description=? WHERE id=?',
            [routeName, difficulty, distance, description, req.params.id]
        );
        res.json({ status: `Record id=${req.params.id} updated` });
    });

    // DELETE one trip
    app.delete('/api/:id', async (req, res) => {
        await db.run('DELETE FROM trips WHERE id=?', [req.params.id]);
        res.json({ status: `Record id=${req.params.id} deleted` });
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

start();