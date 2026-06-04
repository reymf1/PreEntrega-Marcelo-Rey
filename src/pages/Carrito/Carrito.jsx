// src/componentes/Cart/Cart.jsx
import React from "react";
import styles from "./Carrito.module.css";
import { useCart } from "../../context/CartContext";

const Carrito = () => {
  // Obtenemos el estado 'cart' y las funciones que necesitemos del contexto
  const { cart, clearCart, getCartTotal } = useCart();
  // Si el carrito está vacío, mostramos un mensaje
  if (cart.length === 0) {
    return (
      <div className={styles.cart}>
        <h1>El carrito está vacío</h1>
        <p>Agrega productos para continuar la compra.</p>
      </div>
    );
  }
  // Si hay productos, los mostramos
  return (
    <div className={styles.cart}>
      <h1>Carrito de Compras</h1>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h4>{item.nombre}</h4>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.quantity}</p>
        </div>
      ))}
      <hr />
      <h3>Total a pagar: ${getCartTotal()}</h3>
      <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
  );
};
export default Carrito;
