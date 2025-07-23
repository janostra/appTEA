const fs = require('fs');
const path = require('path');
const pool = require('./connection');

const initDB = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql')).toString();
    await pool.query(sql);
    console.log("✅ Tablas creadas desde schema.sql");
  } catch (err) {
    console.error("🛑 Error al crear tablas:", err);
  }
};

module.exports = initDB;
