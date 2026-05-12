-- SCHEMA COMPLETO PARA POSTGRESQL - LOJA VIRTUAL


-- TABELA DE PRODUTOS

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de produtos (sem duplicar)
INSERT INTO products (name, description, price, image) VALUES
('Tênis Feminino Branco', 'Tênis feminino confortável branco.', 82.90, 'tenis1.jpeg'),
('Tênis All Star', 'Tênis All Star Azul.', 129.90, 'tenis2.jpeg'),
('Tênis Nike', 'Tênis Nike Air Force.', 109.90, 'tenis3.jpeg'),
('Tênis Vans', 'Sapatenis Deals Tênis Vans Unisex.', 89.90, 'tenis4.jpeg'),
('Tênis Feminino Rose', 'Tênis Feminino Branco Rose Sara.', 109.90, 'tenis5.jpeg'),
('Tênis Adidas', 'Tênis Adidas Feminino Grand Court.', 259.90, 'tenis6.jpeg'),
('Tênis Branco Casual', 'Tênis Feminino Branco Casual.', 79.90, 'tenis7.jpeg'),
('Tênis Shoes', 'Tênis Feminino Casual Original Shoes.', 99.90, 'tenis8.jpeg')
ON CONFLICT (name) DO NOTHING;


-- TABELA DE USUÁRIOS

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255),
  reset_token_expire TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- TABELA DE ENDEREÇOS

CREATE TABLE IF NOT EXISTS enderecos (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL,
  cep VARCHAR(10),
  rua VARCHAR(255),
  numero VARCHAR(20),
  bairro VARCHAR(100),
  cidade VARCHAR(100),
  estado VARCHAR(2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_usuario
    FOREIGN KEY(usuario_id) REFERENCES users(id)
    ON DELETE CASCADE
);


-- TABELA DE CARTÕES

CREATE TABLE IF NOT EXISTS cartoes (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL,
  numero VARCHAR(16),
  mes VARCHAR(2),
  ano VARCHAR(4),
  cvv VARCHAR(3),
  UNIQUE (usuario_id),
  CONSTRAINT fk_usuario_cartao
    FOREIGN KEY(usuario_id) REFERENCES users(id)
    ON DELETE CASCADE
);