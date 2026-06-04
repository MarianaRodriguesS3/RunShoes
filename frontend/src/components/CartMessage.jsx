import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartMessage.css";

// 🔧 Define a base da URL para produção (Render)
const IMAGE_BASE_URL = "https://runshoes-backend.onrender.com/images";

function CartMessage() {
  const { notification, setNotification } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification, setNotification]);

  // 🔧 Garante a URL correta da imagem vinda do Render ou localmente
  const fixImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("https://runshoes-backend.onrender.com")) {
      return image;
    }
    const cleanPath = image.replace(/\\/g, "/");
    const fileName = cleanPath.includes("/") ? cleanPath.split("/").pop() : cleanPath;
    return `${IMAGE_BASE_URL}/${fileName}`;
  };

  const handleGoToCart = () => {
    setNotification(null);
    navigate("/carrinho");
  };

  if (!notification) return null;

  const { product } = notification;

  return (
    <div className="cart-card">
      <div className="cart-card-header">
        <span>✅ Adicionado ao carrinho</span>
        <button onClick={() => setNotification(null)}>✕</button>
      </div>

      <div className="cart-card-body">
        <img
          src={fixImageUrl(product.image)} // 🌟 ALTERADO: Passando pela validação limpa do Render
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${IMAGE_BASE_URL}/fallback.jpg`; // 🌟 Caso falhe, usa o fallback do Render
          }}
        />
        <div className="cart-info">
          <h4>{product.name}</h4>
          {product.size && <p className="size">Tamanho: {product.size}</p>}
          <p className="price">R$ {product.price}</p>
        </div>
      </div>

      <button className="view-cart-btn" onClick={handleGoToCart}>
        Ver carrinho
      </button>
    </div>
  );
}

export default CartMessage;