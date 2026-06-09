// src/componentes/Cart/Cart.jsx
import React from "react";
import styles from "./Carrito.module.css";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const Carrito = () => {
  // Obtenemos el estado 'cart' y las funciones que necesitemos del contexto
  const { cart, clearCart, getCartTotal, closeCart } = useCart();
  // Si el carrito está vacío, mostramos un mensaje
  if (cart.length === 0) {
    return (
      <div className={styles.cart}>
        <h1>El carrito está vacío</h1>
        <p>Agrega productos para continuar la compra.</p>
        <HashLink
          to="/#productos"
          scroll={
            (el) =>
              setTimeout(() => {
                el.scrollIntoView({
                  block: "start",
                });
              }, 100) //Pongo esta función porque si voy a productos desde una página distinta, espera a que se renderice toda la página y después scrollea. scroll recibe e=<section id="productos">, espera 100 mseg., realiza scroll al elemento en start al comienzo).
          }
          className=""
        >
          Ver Productos
        </HashLink>
      </div>
    );
  }
  // Si hay productos, los mostramos con las opciones de finalizar y vaciar
  return (
    <div className={styles.cart}>
      <IoClose onClick={closeCart} className={styles.iconClose} size={25} />
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h4>{item.nombre}</h4>
          <RiDeleteBinLine size={18} />
          <p>Cantidad: {item.quantity}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.quantity}</p>
        </div>
      ))}
      <hr />
      <h3>Total a pagar: ${getCartTotal()}</h3>
      <button onClick={clearCart}>Vaciar Carrito</button>
      <Link to="/" onClick={() => alert("Gracias por comprar")} className="">
        Finalizar Compra
      </Link>
    </div>
  );
};
export default Carrito;
