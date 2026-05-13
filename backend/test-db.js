require('dotenv').config();
const db = require('./src/database/connection'); // ajuste caminho se necessário

(async () => {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('✅ Conexão bem-sucedida!', res.rows[0]);
  } catch (err) {
    console.error('❌ Falha na conexão:', err.message);
  }
})();