const app = require('./app'); 
const db = require('./database/connection');

// O Render injeta automaticamente a porta 10000 ou similar
const PORT = process.env.PORT || 5000;

// 1. Primeiro subimos o servidor
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// 2. Depois tentamos conectar ao banco de forma assíncrona
db.connect() 
  .then(() => {
    console.log('✅ PostgreSQL conectado');
  })
  .catch(err => {
    console.error("❌ Falha na conexão com o banco:", err);
    // Não mata o servidor, assim você consegue ver o erro nos logs do Render
  });