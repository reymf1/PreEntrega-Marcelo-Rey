import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../../../context/CarritoContext";

function Header() {
  // 2. Usamos el hook para acceder a la función
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();
  return (
    <header>
      <nav className={styles.headerNav}>
        <HashLink to="/#inicio">
          {/*Pongo esto en lugar de link porque permite navegar a un id específico dentro de una página usando hashes*/}
          <img src="/images/LogoYoga3.png" alt="Logo Yoga" />
        </HashLink>
        <ul className={styles.headerNavList}>
          <li>
            <HashLink to="/#inicio">INICIO</HashLink>
          </li>
          <li>
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
            >
              PRODUCTOS
            </HashLink>
          </li>
          <li>
            <Link to="/promo">PROMOCIONES</Link>
          </li>
          <li>
            <Link to="/formulario">ALTA DE PRODUCTOS</Link>
          </li>
          <li>
            <Link to="/nosotros">NOSOTROS</Link>
          </li>
          <li>
            <Link to="/acercaDeMi">ACERCA DE MI</Link>
          </li>
          <li>
            <Link to="/resenias">RESEÑAS</Link>
          </li>
          <li>
            <Link to="/contacto">CONTACTO</Link>
          </li>
        </ul>
        <div className={styles.headerNavCarrito}>
          <Link to="/carrito">
            <img
              className={styles.headerNavCarritoIcon}
              src="/images/carritoDeCompras.png"
              alt="Carrito de Compras"
            />
            {totalItems >= 0 && (
              <span className={styles.headerNavCarritoContador}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
export default Header;
