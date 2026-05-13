const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

const corsOptions = {
  origin: "https://marianarodriguess3.github.io",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

// Permite receber JSON no body das requisições
app.use(express.json());

// Servir imagens estáticas
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Rotas da API
app.use('/api/products', productRoutes);
app.use('/api/usuario', usuarioRoutes);

// Rota raiz para teste de saúde do backend
app.get('/', (req, res) => {
  res.json({ message: 'Backend RunShoes ativo!' });
});

module.exports = app;