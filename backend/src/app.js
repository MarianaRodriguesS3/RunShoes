const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();

// 1. Configuração de CORS (O navegador exige a URL exata do GitHub)
const corsOptions = {
  origin: [
    "https://marianarodriguess3.github.io",
    "https://marianarodriguess3.github.io/RunShoes"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); // Ativa o CORS antes de qualquer rota
app.use(express.json());

// 2. Rota de teste direto (Se essa funcionar, o servidor está OK)
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend rodando e acessível!" });
});

// 3. Suas rotas principais
app.use('/api/products', productRoutes);

module.exports = app;