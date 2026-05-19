import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import BtnFinalizarCompra from "../components/BtnFinalizarCompra";
import "./Cart.css";

const IMAGE_BASE_URL = "https://runshoes-backend.onrender.com/images";

function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity, userToken } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    if (userToken === "guest") navigate("/", { replace: true });
  }, [userToken, navigate]);

  useEffect(() => {
    const initialSelection = {};
    cartItems.forEach((item) => {
      initialSelection[`${item.id}-${item.size}-${item.name}`] = true;
    });
    setSelectedItems(initialSelection);
  }, [cartItems]);

  // 🔧 Normaliza e limpa a URL da imagem para apontar sempre para o Render
  const fixImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("https://runshoes-backend.onrender.com")) {
      return image;
    }

    const cleanPath = image.replace(/\\/g, "/");
    const fileName = cleanPath.includes("/") ? cleanPath.split("/").pop() : cleanPath;

    return `${IMAGE_BASE_URL}/${fileName}`;
  };

  const handleCheckboxChange = (key) => {
    setSelectedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const total = cartItems.reduce((acc, item) => {
    const key = `${item.id}-${item.size}-${item.name}`;
    return acc + (selectedItems[key] ? item.price * item.quantity : 0);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="empty-cart">Seu carrinho está vazio 🛒</h2>
      </div>
    );
  }

  const handleBuySingle = (item) => {
    // 🌟 Garante que o item individual vá com a imagem correta para o checkout
    const cleanItem = { ...item, image: fixImageUrl(item.image) };
    navigate("/finalizar-compra", { state: { products: [cleanItem] } });
  };

  const handleFinalizeCart = () => {
    const itemsToBuy = cartItems
      .filter((item) => {
        const key = `${item.id}-${item.size}-${item.name}`;
        return selectedItems[key];
      })
      // 🌟 Garante que todos os itens selecionados vão com a imagem limpa para o checkout
      .map((item) => ({ ...item, image: fixImageUrl(item.image) }));

    if (itemsToBuy.length === 0) {
      alert("Nenhum produto selecionado para compra.");
      return;
    }

    navigate("/finalizar-compra", { state: { products: itemsToBuy } });
  };

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>

      {cartItems.map((item) => {
        const key = `${item.id}-${item.size}-${item.name}`;
        return (
          <div className="cart-item" key={key}>
            <input
              type="checkbox"
              checked={selectedItems[key] || false}
              onChange={() => handleCheckboxChange(key)}
              className="cart-checkbox"
            />

            {/* 🌟 ALTERADO: Imagem agora usa a função de correção síncrona */}
            <img 
              src={fixImageUrl(item.image)} 
              alt={item.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${IMAGE_BASE_URL}/fallback.jpg`;
              }}
            />

            <div className="cart-info">
              <h3>{item.name}</h3>
              {item.size && <p className="cart-size">Tamanho: {item.size}</p>}
              <p className="price">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <div className="quantity-control">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.name, item.quantity - 1)
                }
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.name, item.quantity + 1)
                }
              >
                +
              </button>
            </div>

            <div className="cart-actions">
              <button className="btn-buy-single" onClick={() => handleBuySingle(item)}>
                Comprar
              </button>
              <button
                className="btn-remove"
                onClick={() => removeFromCart(item.id, item.size, item.name)}
              >
                Remover
              </button>
            </div>
          </div>
        );
      })}

      <div className="cart-total-section">
        <div className="total-content">
          <h2>Total: R$ {total.toFixed(2)}</h2>
          <div className="total-actions">
            <BtnFinalizarCompra onClick={handleFinalizeCart} />
            <button className="btn-clear" onClick={clearCart}>
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;