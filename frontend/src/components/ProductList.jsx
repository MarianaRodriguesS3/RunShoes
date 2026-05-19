import React from 'react';
import ProductCard from './ProductCard';

// URL do seu backend no Render onde as imagens realmente estão hospedadas
const IMAGE_BASE_URL = "https://runshoes-backend.onrender.com/images";

function ProductList({ products }) {
  // Garantir que products é um array
  if (!Array.isArray(products)) return null;

  // Se a lista estiver vazia
  if (products.length === 0) {
    return <p>Nenhum produto disponível.</p>;
  }

  // 🔧 Função auxiliar para garantir que o produto use a URL do Render
  const sanitizeProductImage = (product) => {
    if (!product) return product;
    
    let currentImage = product.image || product.imagem || "";

    // Se já estiver correto com a URL do Render, não faz nada
    if (currentImage.startsWith("https://runshoes-backend.onrender.com")) {
      return product;
    }

    // Limpa caminhos antigos locais (localhost) ou caminhos de pastas físicas (backend/public...)
    const cleanPath = currentImage.replace(/\\/g, "/");
    const fileName = cleanPath.includes("/") ? cleanPath.split("/").pop() : cleanPath;

    // Retorna o objeto do produto com a imagem apontando perfeitamente para o Render
    return {
      ...product,
      image: fileName ? `${IMAGE_BASE_URL}/${fileName}` : ""
    };
  };

  return (
    <div className="product-list">
      {products.map((prod) => {
        // 🔧 Aplica a limpeza na imagem do produto antes de renderizar ou enviar para o card
        const cleanProduct = sanitizeProductImage(prod);

        // Usar prod.id se existir, senão gerar uma key única como fallback
        const key = cleanProduct.id ?? `${cleanProduct.nome || cleanProduct.name}-${Math.random()}`;
        
        return <ProductCard key={key} product={cleanProduct} />;
      })}
    </div>
  );
}

export default ProductList;