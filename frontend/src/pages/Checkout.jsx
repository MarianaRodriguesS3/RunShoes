import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import "../pages/Checkout.css";

const IMAGE_BASE_URL = "https://runshoes-backend.onrender.com/images";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔧 normaliza URL da imagem (CORREÇÃO PRINCIPAL)
  const fixImageUrl = (image) => {
    if (!image) return "";

    // se já for URL completa com http ou https
    if (image.startsWith("http://") || image.startsWith("https://")) {
      // se for localhost, troca para backend real
      if (image.includes("localhost")) {
        const fileName = image.split("/").pop();
        return `${IMAGE_BASE_URL}/${fileName}`;
      }
      return image; // já é URL válida
    }

    // caso venha só o nome do arquivo
    return `${IMAGE_BASE_URL}/${image}`;
  };

  // 🔧 pega produto do state ou localStorage
  const [product] = useState(() => {
    let prod = null;

    if (location.state?.product) {
      prod = { ...location.state.product, image: fixImageUrl(location.state.product.image) };

      // salva versão corrigida no storage
      localStorage.setItem("runshoes_checkout_product", JSON.stringify(prod));
      return prod;
    }

    const saved = localStorage.getItem("runshoes_checkout_product");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // corrige a imagem caso esteja em localhost antigo
        parsed.image = fixImageUrl(parsed.image);
        return parsed;
      } catch (e) {
        localStorage.removeItem("runshoes_checkout_product");
        return null;
      }
    }

    return null;
  });

  const [selectedSize, setSelectedSize] = useState(product?.size || null);
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  // sem produto
  if (!product) {
    return (
      <div className="cart-container">
        <h2 className="empty-cart">Nenhum produto selecionado.</h2>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="cart-container">
      <h1>Compra</h1>

      <div className="cart-item checkout-layout-grid">
        {/* IMAGEM */}
        <div className="checkout-col-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              console.error("Erro ao carregar imagem:", e.target.src);
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
          <p className="price">R$ {(product.price * quantity).toFixed(2)}</p>
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