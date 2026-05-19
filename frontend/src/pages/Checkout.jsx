import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import "../pages/Checkout.css";

const IMAGE_BASE_URL = "https://runshoes-backend.onrender.com/images";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const fixImageUrl = (img) => {
    if (!img) return "";
    const fileName = img.includes("/") ? img.split("/").pop() : img;
    return `${IMAGE_BASE_URL}/${fileName}`;
  };

  const [product] = useState(() => {
    let prod = null;
    if (location.state?.product) {
      prod = location.state.product;
      localStorage.setItem("runshoes_checkout_product", JSON.stringify(prod));
      return prod;
    }
    const saved = localStorage.getItem("runshoes_checkout_product");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        localStorage.removeItem("runshoes_checkout_product");
        return null;
      }
    }
    return null;
  });

  const [selectedSize, setSelectedSize] = useState(product?.size || null);
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  if (!product) {
    return (
      <div className="cart-container">
        <h2 className="empty-cart">Nenhum produto selecionado.</h2>
      </div>
    );
  }

  const handleQuantityChange = (delta) => setQuantity(prev => Math.max(1, prev + delta));

  return (
    <div className="cart-container">
      <h1>Compra</h1>
      <div className="cart-item checkout-layout-grid">

        <div className="checkout-col-image">
          <img
            src={fixImageUrl(product.image)}
            alt={product.name}
            onError={(e) => { e.target.src = `${IMAGE_BASE_URL}/fallback.jpg`; }}
          />
        </div>

        <div className="checkout-col-selectors">
          <div className="size-selector">
            {[34, 35, 36, 37, 38, 39, 40, 41, 42].map(size => (
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

        <div className="checkout-col-info">
          <h3>{product.name}</h3>
          <p className="price">R$ {(product.price * quantity).toFixed(2)}</p>
        </div>
      </div>

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
                        image: fixImageUrl(product.image),
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