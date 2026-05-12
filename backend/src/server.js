const app = require('./app');
const db = require('./database/connection');

(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ PostgreSQL conectado');

    app.listen(5000, () => {
      console.log('🚀 Servidor rodando em http://localhost:5000');
    });
  } catch (err) {
    console.error('❌ Falha ao conectar no banco:', err.message);
  }
})();