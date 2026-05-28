// src/componentes/Cart/Cart.jsx
import React from "react";
import styles from "./Carrito.module.css";

const Carrito = () => {
  // Por ahora, este componente solo mostrará un mensaje.
  // Más adelante, consumirá los datos de nuestro contexto.
  return (
    <div className={styles.cart}>
      <h1>Carrito de Compras</h1>
      <p>Aquí se mostrarán los productos que agregaste.</p>
    </div>
  );
};
export default Carrito;
