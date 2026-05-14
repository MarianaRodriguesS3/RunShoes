import axios from "axios";

// Cria a instância do axios
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://runshoes-backend.onrender.com/api",
});

// Adiciona o token JWT se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tratamento de erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "/RunShoes/login";
    }
    return Promise.reject(error);
  }
);

// Função nomeada para buscar usuário logado
export const getUsuarioLogado = async () => {
  try {
    const res = await api.get("/usuario/dados-usuario");
    return res.data.user;
  } catch (err) {
    console.error("Erro ao buscar dados do usuário logado:", err);
    return null;
  }
};

// Função nomeada para buscar produtos (opcional)
export const getProdutos = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    return [];
  }
};

// **Export default no final para compatibilidade**
export default api;