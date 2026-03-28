const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function initializeDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS trips (
    rowid INTEGER PRIMARY KEY AUTOINCREMENT,
    routeName TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    distance REAL NOT NULL,
    description TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Trips table is ready');
    }
  });
}

async function makeConnection() {
    db = await sqlite.open({
        filename: "trips.db",
        driver: sqlite3.Database
    });
}

module.exports = {initializeDatabase, makeConnection};