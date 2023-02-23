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
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.attributes.price * (item.quantity + 1),
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { ...product, quantity: 1, subtotal: product.attributes.price },
      ]);
    }
  };

  const decreaseQuantity = (product: Product) => {
    const item = cart.find((el) => el.id === product.id);

    if (item.quantity - 1 <= 0) {
      removeFromCart(product);
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.attributes.price * (item.quantity - 1),
              }
            : item
        )
      );
    }
  };

  const removeFromCart = (product: Product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const getProductSubtotal = (product) => {
    return product.attributes.price * product.quantity;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getProductSubtotal,
    decreaseQuantity,
  };
};
