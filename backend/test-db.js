const db = require('./src/database/connection');
require('dotenv').config();

(async () => {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('✅ Conexão bem-sucedida!', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('❌ Falha na conexão:', err.message);
    process.exit(1);
  }
})();