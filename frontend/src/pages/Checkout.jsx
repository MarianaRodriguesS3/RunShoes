import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import "../pages/Checkout.css";

const IMAGE_BASE_URL = "https://runshoes-backend.onrender.com/images";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔧 normaliza URL da imagem
  const fixImageUrl = (image) => {
    if (!image) return "";
    // Se a URL contém localhost ou http local antigo, extrai apenas o nome do arquivo
    const fileName = image.includes("/")
      ? image.split("/").pop()
      : image;
    return `${IMAGE_BASE_URL}/${fileName}`;
  };

  // 🔧 pega produto do state ou localStorage
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let prod = null;

    // prioridade para o state vindo do navigate
    if (location.state?.product) {
      prod = location.state.product;
    } else {
      // tenta pegar do localStorage
      const saved = localStorage.getItem("runshoes_checkout_product");
      if (saved) {
        try {
          prod = JSON.parse(saved);
        } catch {
          localStorage.removeItem("runshoes_checkout_product");
        }
      }
    }

    // Corrige a URL da imagem automaticamente
    if (prod?.image) {
      prod.image = fixImageUrl(prod.image);
    }

    // Salva a versão corrigida no storage
    if (prod) {
      localStorage.setItem("runshoes_checkout_product", JSON.stringify(prod));
    }

    setProduct(prod);
  }, [location.state]);

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
            onError={(e) => { e.target.src = `${IMAGE_BASE_URL}/fallback.jpg`; }}
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