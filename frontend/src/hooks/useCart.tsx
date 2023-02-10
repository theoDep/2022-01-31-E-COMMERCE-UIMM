import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Product } from "../types";

export default () => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (product: Product) => {
    if (cart.some((item) => item.id === product.id)) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: Product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  return { cart, addToCart, removeFromCart };
};
