import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Giá: {product.price} VND</p>
          <button className="btn btn-primary">Thêm Vào Giỏ</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
