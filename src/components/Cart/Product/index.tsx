import { FC } from "react";
import { IProduct } from "../../../interfaces/productInterface";
import { useAppDispatch } from "../../../hooks/useRedux";
import {
  removeProduct,
  calculateCartTotalPrice,
  calculateCartTotalProducts,
} from "../../../store/cartReducer";
import currencyFormatter from "../../../utils/currencyFormatter";
import "./style.scss";

interface ICartProduct {
  data: IProduct;
}

const CartProduct: FC<ICartProduct> = (product) => {
  const { id, image, name, quantity, price } = product.data;

  const dispatch = useAppDispatch();

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProduct(id));
    dispatch(calculateCartTotalProducts());
    dispatch(calculateCartTotalPrice());
  };

  return (
    <article
      className={`cartProduct__product cartProduct__product__product-${id}`}
    >
      <div className="cartProduct__product__img-container">
        <img src={image} alt={image} />
      </div>
      <div className="cartProduct__product__info">
        <h3 className="cartProduct__product__info__name">{name}</h3>
        <span className="cartProduct__product__info__quantity">
          Quantity: {quantity}
        </span>
        <span className="cartProduct__product__info__price">
          Price: {currencyFormatter.format(price)}
        </span>
      </div>
      <button
        type="button"
        className="cartProduct__product__remove"
        onClick={() => handleRemoveProduct(id)}
      >
        <img
          src="https://www.freeiconspng.com/uploads/trash-can-icon-3.png"
          alt="trash icon"
        />
      </button>
    </article>
  );
};

export default CartProduct;
