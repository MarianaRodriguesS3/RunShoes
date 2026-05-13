import axios from "axios";

const api = axios.create({
  // URL do seu backend no Render
  baseURL: "https://runshoes-backend.onrender.com/api",
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
      
      // Ajustado para o caminho do GitHub Pages
      window.location.href = "/RunShoes/login"; 
    }
    return Promise.reject(error);
  }
);

export const getUsuarioLogado = async () => {
  try {
    const res = await api.get("/usuario/dados-usuario");
    return res.data.user;
  } catch (err) {
    console.error("Erro ao buscar dados do usuário logado:", err);
    return null;
  }
};

export default api;