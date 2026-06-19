import styles from "./Producto.module.css";
import { Boton } from "../../../../../components/Boton/Boton";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../../../../context/CartContext";

export function Producto({ id, img, nombre, precio, stock, descripcion }) {
  // Creamos el objeto producto a partir de las props
  const producto = { id, img, nombre, precio, stock };

  // Traemos la función del contexto
  const {
    addToCart,
    getCantidadActual,
    openCart,
    incrementarCantidad,
    decrementarCantidad,
  } = useCart();

  const [cantidad, setCantidad] = useState(1);

  // Obtenemos la cantidad YA existente en el carrito desde el contexto
  const cantidadActual = getCantidadActual(producto.id);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad((cant) => cant + 1);
    }
  };
  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad((cant) => cant - 1);
    }
  };

  /*const agregarAlCarrito = () => {
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
  };*/

  const [esFavorito, setEsFavorito] = useState(false);
  const marcarComoFavorito = () => setEsFavorito(!esFavorito);
  const location = useLocation(); //Guardo el URL

  // Lógica del Carrito
  const agregarAlCarrito = () => {
    addToCart(producto, cantidad);
    openCart();
    setCantidad(1);
    /*alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);*/
  };
  return (
    <article className={styles.productoCard}>
      <div className={styles.productoCardImg}>
        <img src={img} alt={nombre} />
      </div>
      <div className={styles.productoCardParrafo}>
        <h3>{nombre}</h3>
        <p className={styles.precio}>
          {precio.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>
        {/*<div className={styles.descripcion}></div>*/}
      </div>
      <p>En carrito: {cantidadActual}</p>
      <div className={styles.productoContEstrella}>
        <div className={styles.productoContadores}>
          <Boton variant="cont1" onClick={decrementar}>
            -
          </Boton>
          <p>{cantidad}</p>
          {/*Modificamos unicamente la parte del contador*/}
          <Boton variant="cont1" onClick={incrementar}>
            +
          </Boton>
        </div>
        <button onClick={marcarComoFavorito} className={styles.favorito}>
          <FaStar
            className={`${styles.estrella} ${esFavorito ? styles.amarillo : ""}`}
          />
        </button>
      </div>
      <div className={styles.botones1}>
        <Link
          to={`/producto/${id}`}
          state={{ from: location.pathname + location.hash }}
        >
          {/*En state guardo desde donde estoy*/}
          <Boton variant="prod" data-descripcion={descripcion}>
            Ver descripción
          </Boton>
        </Link>
        <Boton variant="prod" onClick={agregarAlCarrito}>
          Agregar al carrito
        </Boton>
      </div>
    </article>
  );
}
