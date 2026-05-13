const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Configuração de CORS personalizada
const corsOptions = {
  // Permitimos o domínio base e o subdiretório do projeto
  origin: [
    "https://marianarodriguess3.github.io",
    "https://marianarodriguess3.github.io/RunShoes"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Servir imagens estáticas
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Rotas da API
app.use('/api/products', productRoutes);
app.use('/api/usuario', usuarioRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend RunShoes ativo!' });
});

module.exports = app;