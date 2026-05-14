const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Private-Network", "true");
  next();
});

app.use(express.json());

// 2. Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend rodando e acessível!" });
});

// 3. Servir imagens estáticas
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// 4. Rotas principais
app.use('/api/products', productRoutes);
app.use('/api/usuario', usuarioRoutes);

module.exports = app;