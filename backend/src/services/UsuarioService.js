const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// --- FUNÇÕES AUXILIARES (Geração de dados mock) ---
const enderecosFamosos = [
  { cep: "01001-000", rua: "Praça da Sé", numero: "100", bairro: "Sé", cidade: "São Paulo", estado: "SP" },
  { cep: "20040-020", rua: "Rua do Ouvidor", numero: "200", bairro: "Centro", cidade: "Rio de Janeiro", estado: "RJ" },
  { cep: "30190-100", rua: "Avenida Afonso Pena", numero: "300", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG" },
  { cep: "40020-000", rua: "Avenida Sete de Setembro", numero: "400", bairro: "Centro", cidade: "Salvador", estado: "BA" },
  { cep: "80020-310", rua: "Rua XV de Novembro", numero: "500", bairro: "Centro", cidade: "Curitiba", estado: "PR" },
];

function gerarCPF() {
  return String(Math.floor(Math.random() * 99999999999)).padStart(11, '0');
}

function gerarEnderecoMock() {
  const idx = Math.floor(Math.random() * enderecosFamosos.length);
  return enderecosFamosos[idx];
}

function gerarNumeroCartao() {
  let numero = "";
  for (let i = 0; i < 16; i++) {
    numero += Math.floor(Math.random() * 10);
  }
  return numero;
}

function gerarDadosExtrasCartao() {
  const mes = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, "0");
  const ano = (Math.floor(Math.random() * 5) + 26).toString(); // ex: 26 = 2026
  const cvv = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return { mes, ano, cvv };
}

// --- CLASSE DE SERVIÇO ---
class UsuarioService {

  // --- Dados iniciais para formulário
  static gerarDadosIniciais() {
    return { nome: "", email: "", cpf: gerarCPF(), endereco: gerarEnderecoMock() };
  }

  static gerarDadosMock(email) {
    return { nome: "", email, cpf: gerarCPF(), endereco: gerarEnderecoMock() };
  }

  // --- CADASTRO ---
  static async cadastrarUsuario(nome, email, senha, cpf = null, endereco = null) {

    const existing = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) throw new Error("Email já cadastrado");

    const hashedPassword = await bcrypt.hash(senha, 10);
    const cpfFinal = cpf || gerarCPF();

    const result = await db.query(
      `INSERT INTO users (nome, email, cpf, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [nome, email, cpfFinal, hashedPassword]
    );

    const userId = result.rows[0].id;
    const enderecoFinal = endereco || gerarEnderecoMock();

    await db.query(
      `INSERT INTO enderecos (usuario_id, cep, rua, numero, bairro, cidade, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId,
        enderecoFinal.cep,
        enderecoFinal.rua,
        enderecoFinal.numero,
        enderecoFinal.bairro,
        enderecoFinal.cidade,
        enderecoFinal.estado
      ]
    );

    return new Usuario(userId, nome, email, cpfFinal, hashedPassword, enderecoFinal);
  }

  // --- LOGIN ---
  static async logarUsuario(email, senha) {

    const users = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (users.rows.length === 0) throw new Error("Usuário não encontrado");

    const userData = users.rows[0];

    const enderecos = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [userData.id]);

    const usuario = new Usuario(
      userData.id,
      userData.nome,
      userData.email,
      userData.cpf,
      userData.password,
      enderecos.rows[0] || null
    );

    const senhaValida = await usuario.validarSenha(senha);
    if (!senhaValida) throw new Error("Senha inválida");

    return usuario;
  }

  // --- BUSCAR POR EMAIL ---
  static async buscarPorEmail(email) {
    const users = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (users.rows.length === 0) return null;

    const userData = users.rows[0];
    const enderecos = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [userData.id]);

    return new Usuario(userData.id, userData.nome, userData.email, userData.cpf, userData.password, enderecos.rows[0] || null);
  }

  // --- BUSCAR POR ID ---
  static async buscarPorId(id) {
    const users = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (users.rows.length === 0) return null;

    const userData = users.rows[0];
    const enderecos = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [id]);

    return new Usuario(userData.id, userData.nome, userData.email, userData.cpf, userData.password, enderecos.rows[0] || null);
  }

  // --- ATUALIZAÇÃO ---
  static async atualizarUsuario(id, nome, email, password = null, cpf = null, endereco = null) {
    const updates = [];
    const params = [];
    let index = 1;

    if (nome) { updates.push(`nome = $${index++}`); params.push(nome); }
    if (email) { updates.push(`email = $${index++}`); params.push(email); }
    if (cpf) { updates.push(`cpf = $${index++}`); params.push(cpf); }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.push(`password = $${index++}`);
      params.push(hashed);
    }

    if (updates.length > 0) {
      params.push(id);
      await db.query(`UPDATE users SET ${updates.join(", ")} WHERE id = $${index}`, params);
    }

    if (endereco) {
      const existe = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [id]);

      if (existe.rows.length > 0) {
        await db.query(
          `UPDATE enderecos
           SET cep = $1, rua = $2, numero = $3, bairro = $4, cidade = $5, estado = $6
           WHERE usuario_id = $7`,
          [
            endereco.cep,
            endereco.rua,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.estado,
            id
          ]
        );
      } else {
        await db.query(
          `INSERT INTO enderecos (usuario_id, cep, rua, numero, bairro, cidade, estado)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            id,
            endereco.cep,
            endereco.rua,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.estado
          ]
        );
      }
    }

    return this.buscarPorId(id);
  }

  // --- CARTÕES ---
  static async obterOuGerarCartao(usuarioId) {
    const rows = await db.query("SELECT * FROM cartoes WHERE usuario_id = $1", [usuarioId]);
    if (rows.rows.length > 0) return rows.rows[0];

    const extras = gerarDadosExtrasCartao();
    return { numero: gerarNumeroCartao(), mes: extras.mes, ano: extras.ano, cvv: extras.cvv };
  }

  static async salvarCartao(usuarioId, cartao) {
    if (!cartao || !usuarioId) return;

    const numeroStr = String(cartao.numero).replace(/\D/g, '');
    const rows = await db.query("SELECT id FROM cartoes WHERE usuario_id = $1", [usuarioId]);

    if (rows.rows.length > 0) {
      await db.query(
        `UPDATE cartoes
         SET numero = $1, mes = $2, ano = $3, cvv = $4
         WHERE usuario_id = $5`,
        [numeroStr, cartao.mes, cartao.ano, cartao.cvv, usuarioId]
      );
    } else {
      await db.query(
        `INSERT INTO cartoes (usuario_id, numero, mes, ano, cvv)
         VALUES ($1, $2, $3, $4, $5)`,
        [usuarioId, numeroStr, cartao.mes, cartao.ano, cartao.cvv]
      );
    }
  }
}

module.exports = UsuarioService;