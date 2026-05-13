const app = require('./app'); // app.js dentro de src
const db = require('./database/connection'); // connection.js dentro de src/database

const PORT = process.env.PORT || 5000;

// Conecta ao banco e inicia o servidor
db.connect() // ou db.query('SELECT 1') se estiver usando pool
  .then(() => {
    console.log('✅ PostgreSQL conectado');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ Falha na conexão:", err));