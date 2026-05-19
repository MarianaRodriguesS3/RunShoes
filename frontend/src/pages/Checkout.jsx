import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import "../pages/Checkout.css";

const IMAGE_BASE_URL = "https://runshoes-backend.onrender.com/images";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔧 Normaliza a URL da imagem de forma inteligente
  const fixImageUrl = (image) => {
    if (!image) return "";

    // 1. Se já for uma URL do Render atualizada, não mexe nela!
    if (image.startsWith("https://runshoes-backend.onrender.com")) {
      return image;
    }

    // 2. Se for uma URL completa antiga (localhost, etc) ou caminho com barras do Windows, limpa
    const cleanPath = image.replace(/\\/g, "/");
    const fileName = cleanPath.includes("/") ? cleanPath.split("/").pop() : cleanPath;

    // 3. Retorna a URL final apontando para o Render
    return `${IMAGE_BASE_URL}/${fileName}`;
  };

  // Estados do componente
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 🔧 Pega o produto do state ou localStorage ao carregar a página
  useEffect(() => {
    let prod = null;

    if (location.state?.product) {
      prod = { ...location.state.product }; 
    } else {
      const saved = localStorage.getItem("runshoes_checkout_product");
      if (saved) {
        try {
          prod = JSON.parse(saved);
        } catch {
          localStorage.removeItem("runshoes_checkout_product");
        }
      }
    }

    if (prod) {
      localStorage.setItem("runshoes_checkout_product", JSON.stringify(prod));
      setProduct(prod);
      setSelectedSize(prod.size || null);
      setQuantity(prod.quantity || 1);
    }
  }, [location.state]);

  // Controle de quantidade
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Estado de carregamento / sem produto selecionado
  if (!product) {
    return (
      <div className="cart-container">
        <h2 className="empty-cart">Nenhum produto selecionado.</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Compra</h1>

      <div className="cart-item checkout-layout-grid">
        {/* IMAGEM */}
        <div className="checkout-col-image">
          <img
            src={fixImageUrl(product.image)} // 🌟 FORÇA A CORREÇÃO DIRETO NA RENDERIZAÇÃO
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null; // Evita loop infinito se o fallback também falhar
              e.target.src = `${IMAGE_BASE_URL}/fallback.jpg`;
            }}
          />
        </div>

        {/* TAMANHOS + QTD */}
        <div className="checkout-col-selectors">
          <div className="size-selector">
            {[34, 35, 36, 37, 38, 39, 40, 41, 42].map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(-1)}>−</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>

        {/* INFO */}
        <div className="checkout-col-info">
          <h3>{product.name}</h3>
          <p className="price">
            R$ {(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* TOTAL */}
      <div className="cart-total-section">
        <div className="total-content">
          <h2>Total: R$ {(product.price * quantity).toFixed(2)}</h2>

          <div className="total-actions">
            <BtnFinalizarCompra
              disabled={!selectedSize}
              texto={selectedSize ? "Finalizar Compra" : "Selecione o Tamanho"}
              onClick={() =>
                navigate("/finalizar-compra", {
                  state: {
                    products: [
                      {
                        ...product,
                        image: fixImageUrl(product.image), // 🌟 Garante que o próximo componente receba a URL certa
                        size: selectedSize,
                        quantity,
                      },
                    ],
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;