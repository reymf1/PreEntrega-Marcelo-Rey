// src/componentes/Cart/Cart.jsx
import React from "react";
import styles from "./Carrito.module.css";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Boton } from "../../components/Boton/Boton";

const Carrito = () => {
  // Obtenemos el estado 'cart' y las funciones que necesitemos del contexto
  const {
    cart,
    clearCart,
    getCartTotal,
    closeCart,
    incrementarCantidad,
    decrementarCantidad,
  } = useCart();
  // Si el carrito está vacío, mostramos un mensaje
  if (cart.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <IoClose onClick={closeCart} className={styles.iconClose} size={25} />
        <h2>Tu Carrito de Compras</h2>
        <h4>Aún no hay artículos en tu carrito</h4>
        <HashLink
          onClick={closeCart}
          className={styles.cartExpl}
          to="/#productos"
          /*scroll={
            (el) =>
              setTimeout(() => {
                el.scrollIntoView({
                  block: "start",
                });
              }, 100) //Pongo esta función porque si voy a productos desde una página distinta, espera a que se renderice toda la página y después scrollea. scroll recibe e=<section id="productos">, espera 100 mseg., realiza scroll al elemento en start al comienzo).
          }*/
        >
          Explora nuestros productos
        </HashLink>
      </div>
    );
  }
  // Si hay productos, los mostramos con las opciones de finalizar y vaciar
  return (
    <>
      <header className={styles.header}>
        <IoClose onClick={closeCart} className={styles.iconClose} size={25} />
        <h2>Tu Carrito de Compras</h2>
      </header>

      <div className={styles.cart}>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemImgPrecio}>
                <div className={styles.cartItemImg}>
                  <img src={item.img} alt={item.nombre} />
                </div>
                <div className={styles.cartItemPrecio}>
                  <h4>{item.nombre}</h4>
                  <div className={styles.cartItemContadores}>
                    <Boton variant="contCarrito" onClick={decrementarCantidad}>
                      -
                    </Boton>
                    <p>{item.quantity}</p>
                    {/*Modificamos unicamente la parte del contador*/}
                    <Boton variant="contCarrito" onClick={incrementarCantidad}>
                      +
                    </Boton>
                  </div>
                  <p>Precio unitario: ${item.precio}</p>
                  <p>Subtotal: ${item.precio * item.quantity}</p>
                </div>
              </div>
              <div className={styles.cartItemDelete}>
                <RiDeleteBinLine size={18} />
              </div>
            </div>
          ))}
        </div>

        <footer className={styles.footer}>
          <div className={styles.total}>
            <span className={styles.totalPagar}>Total a pagar: </span>
            <span className={styles.totalValor}>
              {getCartTotal().toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
          </div>
          <Boton variant="vaciar" onClick={clearCart}>
            Vaciar Carrito <RiDeleteBinLine size={18} />
          </Boton>
          <Link
            to="/"
            onClick={() => alert("Gracias por comprar")}
            className=""
          >
            <Boton variant="compra" onClick={clearCart}>
              Finalizar Compra
            </Boton>
          </Link>
        </footer>
      </div>
    </>
  );
};
export default Carrito;
