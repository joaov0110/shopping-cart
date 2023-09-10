import { FC } from "react";
import productsMock from "../../data/products";
import Product from "../../components/ProductCard";
import Cart from "../../components/Cart";
import "./index.scss";

const Products: FC = () => {
  const renderProducts = () => {
    return productsMock.map((prod) => {
      return (
        <div className="products__list__item" key={prod.id}>
          <Product data={prod} />
        </div>
      );
    });
  };

  return (
    <>
      <div className="products__list">{renderProducts()}</div>
      <Cart />
    </>
  );
};

export default Products;
