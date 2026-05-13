const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();

// 1. Configuração de CORS
const corsOptions = {
  origin: [
    "https://marianarodriguess3.github.io",
    "https://marianarodriguess3.github.io/RunShoes",
    "http://localhost:5173"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

// 2. Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend rodando e acessível!" });
});

// 3. Rotas principais
app.use('/api/products', productRoutes);

// 4. Servir imagens estáticas
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;