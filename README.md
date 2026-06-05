# 🛒 Run Shoes – Node.js + React + PostgreSQL

Este projeto é uma aplicação completa de **e-commerce de calçados**, desenvolvida com **Node.js no backend**, **React no frontend** e **PostgreSQL** como banco de dados relacional. A arquitetura foi projetada sob os princípios de **Programação Orientada a Objetos (POO)** e separação estrita em camadas, garantindo escalabilidade, manutenibilidade e segurança.

---

## 🚀 Tecnologias e Arquitetura

### 📦 Backend
Camada responsável pelo processamento das regras de negócio, segurança, gerenciamento de sessões e persistência de dados.

- **Tecnologias:** Node.js, Express, PostgreSQL (`pg`), JWT (`jsonwebtoken`), Criptografia (`bcryptjs`).
- **Arquitetura:** Orientada a Objetos (POO) dividida em Rotas, Controllers, Services e Models.
- **Funcionalidades:** API RESTful, autenticação via Bearer Token, queries parametrizadas antinjeção, mascaramento de dados sensíveis e manipulação dinâmica de cadastros e checkouts.

### 🎨 Frontend
Interface SPA (Single Page Application) responsiva, focada na experiência do usuário, consumo assíncrono de dados e gerenciamento de estado global.

- **Tecnologias:** React, Vite, React Router DOM, Context API, Axios.
- **Funcionalidades:** Estado global do carrinho, validações locais de formulários, máscaras de inputs (CPF/CEP), integração com API externa (ViaCEP) e simulação de rastreamento logístico em tempo real.

### 🗄️ Banco de Dados
Camada de persistência relacional robusta hospedada em nuvem na plataforma **Render**.

- **Tecnologias:** PostgreSQL.
- **Segurança:** Conexões criptografadas via SSL (`rejectUnauthorized: false`).
- **Tabelas Principais:** `users` (clientes), `products` (catálogo), `enderecos` (localidades) e `cartoes` (dados financeiros criptografados).

---

## 🗺️ Estrutura da Documentação

Clique nos tópicos abaixo para visualizar os detalhes de cada módulo do sistema:

### 🎨 Frontend - Componentes e Páginas


* [🏠 Página Home](README-guide.md#-pagina-home)
* [🧭 Componente Header](README-guide.md#-componente-header)
* [🛒 Página Carrinho (Cart)](README-guide.md#-pagina-carrinho-cart)
* [🔐 Página Login](README-guide.md#-pagina-login)
* [🎯 Componente Banner](README-guide.md#-componente-banner)




* [📦 Componente ProductList](./docs/frontend.md#-componente-productlist)
* [🛍️ Componente ProductCard](./docs/frontend.md#-componente-productcard)
* [🛒 Contexto CartContext](./docs/frontend.md#-contexto-cartcontext)
* [🔔 Componente CartMessage](./docs/frontend.md#-componente-cartmessage)
* [💳 Página Checkout](./docs/frontend.md#-página-checkout)
* [🧾 Página FinalizarCompra](./docs/frontend.md#-página-finalizarcompra)
* [🔘 Componente BtnFinalizarCompra](./docs/frontend.md#-componente-btnfinalizarcompra)
* [💰 Componente AbaPix](./docs/frontend.md#-componente-abapix)
* [💳 Componente AbaCartao](./docs/frontend.md#-componente-abacartao)
* [🎴 Componente AnimacaoCartao](./docs/frontend.md#-componente-animacaocartao)
* [📝 Página de Cadastro](./docs/frontend.md#-página-de-cadastro)
* [✏️ Página EditarCadastro](./docs/frontend.md#-página-editarcadastro)
* [🔑 Página ForgotPassword](./docs/frontend.md#-página-forgotpassword)
* [🔐 Página ResetPassword](./docs/frontend.md#-página-resetpassword)
* [📦 Página StatusPedido](./docs/frontend.md#-página-statuspedido)
* [🎴 Componente Footer](./docs/frontend.md#-componente-footer)

### 📦 Backend - Camadas da API
* [📦 Model Product](./docs/backend.md#-model-product)
* [📦 Model Usuario](./docs/backend.md#-model-usuario)
* [🎮 Controller ProductController](./docs/backend.md#-controller-productcontroller)
* [🎮 Controller UsuarioController](./docs/backend.md#-controller-usuariocontroller)
* [🛠️ Service ProductService](./docs/backend.md#-service-productservice)
* [🛠️ Service UsuarioService](./docs/backend.md#-service-usuarioservice)
* [=== Suas novas seções de rotas e middlewares compiladas anteriormente ===]
