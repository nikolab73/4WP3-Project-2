const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function makeConnection() {
    db = await sqlite.open({
        filename: "trips.db",
        driver: sqlite3.Database
    });
    return db; // ← this is what was missing
}

async function initializeDatabase() {
    await db.run(`CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        routeName TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        distance REAL NOT NULL,
        description TEXT NOT NULL
    )`);
    console.log('Trips table is ready');
}

module.exports = { makeConnection, initializeDatabase };