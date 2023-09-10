import { FC, useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import {
  addProduct,
  calculateCartTotalPrice,
  calculateCartTotalProducts,
} from "../../store/cartReducer";
import { IProduct } from "../../interfaces/productInterface";
import currencyFormatter from "../../utils/currencyFormatter";
import "./index.scss";

interface IProductCard {
  data: IProduct;
}

const Product: FC<IProductCard> = (product) => {
  const { id, name, image, price, quantity } = product.data;

  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productWarning, setProductWarning] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleProductDecrement = () => {
    setProductQuantity((prev) => {
      const amount = prev - 1;

      if (amount === quantity) {
        setProductWarning("");
      }

      if (amount < 0) {
        return 0;
      }

      return amount;
    });
  };

  const handleProductIncrement = () => {
    setProductQuantity((prev) => {
      const amount = prev + 1;

      if (amount > quantity) {
        setProductWarning("Quantity not available in stock");
      }

      return amount;
    });
  };

  const handleAddProductToCart = () => {
    dispatch(
      addProduct({
        id,
        name,
        image,
        quantity: productQuantity,
        price,
        total: price * productQuantity,
        quantityInStock: quantity,
      })
    );
    dispatch(calculateCartTotalProducts());
    dispatch(calculateCartTotalPrice());

    setProductQuantity(0);
  };

  return (
    <div className={`product__card product__card__product-${id} `}>
      <div className="product__image-container">
        <img src={image} alt={image} />
      </div>
      <h2 className="product__name">{name}</h2>
      <h3 className="product__price">{currencyFormatter.format(price)}</h3>

      <div className="product__total-counter">
        <button
          type="button"
          className="product__total-counter__decrement"
          onClick={handleProductDecrement}
        >
          -
        </button>
        <span className="product__total-counter__total">{productQuantity}</span>
        <button
          type="button"
          className="product__total-counter__increment"
          onClick={handleProductIncrement}
        >
          +
        </button>
      </div>

      {productWarning.length > 0 && (
        <div className="product__warning">{productWarning}</div>
      )}

      <div className="product__add">
        <button type="button" onClick={handleAddProductToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
