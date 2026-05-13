const app = require('./app'); 
const db = require('./database/connection');

// O Render injeta a porta automaticamente. Em local, usa 5000.
const PORT = process.env.PORT || 5000;

// 1. Iniciamos o servidor primeiro para o Render validar o deploy
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// 2. Conectamos ao banco de forma assíncrona
db.connect() 
  .then(() => {
    console.log('✅ PostgreSQL conectado');
  })
  .catch(err => {
    console.error("❌ Falha na conexão com o banco:", err);
  });