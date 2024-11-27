import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Sản Phẩm Nổi Bật</h1>
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
