const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { DB_PATH } = require('../config');

if (DB_PATH !== ':memory:') {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS produto (
    codigo  INTEGER PRIMARY KEY,
    preco   REAL    NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0
  )
`);

module.exports = db;
