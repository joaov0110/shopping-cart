import { FC, useEffect, useState } from "react";
import {
  stateSelectors,
  addProducts,
  calculateCartTotalPrice,
  calculateCartTotalProducts,
} from "../../store/cartReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import useLocalStorage from "../../hooks/useLocalStorage";
import CartProduct from "./Product";
import "./style.scss";

const Cart: FC = () => {
  const [openProductsList, setOpenProductsList] = useState(false);

  const cartProducts = useAppSelector(stateSelectors.selectProducts);
  const cartTotalProducts = useAppSelector(
    stateSelectors.selectCartTotalProducts
  );
  const cartTotalPrice = useAppSelector(stateSelectors.selectCartTotalPrice);

  const dispatch = useAppDispatch();

  const { getData } = useLocalStorage();

  useEffect(() => {
    if (getData("cart")) {
      console.log("sdfsdfsdf", getData("cart"));

      dispatch(addProducts(getData("cart")));
      dispatch(calculateCartTotalPrice());
      dispatch(calculateCartTotalProducts());
    }
  }, []);

  const handleOpenProductsList = () => {
    setOpenProductsList((prev) => !prev);
  };

  const renderProductsList = () => {
    if (cartTotalProducts > 0) {
      return (
        <div className="cart__products__list">
          {cartProducts.map((product) => {
            return <CartProduct key={product.id} data={product} />;
          })}
        </div>
      );
    }

    return <p className="cart__products__no-products">No products added</p>;
  };

  return (
    <div className="cart__container">
      <button
        type="button"
        className="cart__opener"
        onClick={handleOpenProductsList}
      >
        <span className="cart__prod-quantity">{cartTotalProducts}</span>
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
          alt="cart icon"
        />
      </button>

      {openProductsList && (
        <div className="cart__products">
          {renderProductsList()}

          {cartTotalProducts > 0 && (
            <div className="cart__products__total">
              Order Total: {cartTotalPrice}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
