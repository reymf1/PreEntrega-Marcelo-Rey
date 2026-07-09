import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

function Header() {
  // 2. Usamos el hook para acceder a la función
  const { getCartQuantity, openCart } = useCart();
  const { user, logout } = useAuth();
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
            <HashLink to="/#productos">PRODUCTOS</HashLink>
          </li>
          <li>
            <Link to="/promo">PROMOCIONES</Link>
          </li>
          {/*<li>
            <Link to="/gestion">GESTIÓN PRODUCTOS</Link>
          </li>*/}
          <li>
            <Link to="/admin/cupones">GESTIÓN CUPONES</Link>
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
          {/* Lógica de renderizado condicional */}
          {user ? (
            <>
              {/* Mostrar Gestion SOLO si el usuario es admin */}
              {user.rol === "admin" && (
                <li>
                  <Link to="/gestion">GESTIÓN PRODUCTOS</Link>
                </li>
              )}
              <span>¡Hola, {user.email}!</span>
              <button onClick={logout}>Cerrar Sesión</button>
            </>
          ) : (
            <li>
              <Link to="/login">INGRESÁ</Link>
            </li>
          )}
          <div className={styles.headerNavCarrito}>
            <img
              onClick={openCart}
              className={styles.headerNavCarritoIcon}
              src="/images/carritoDeCompras.png"
              alt="Carrito de Compras"
            />
            {totalItems >= 0 && (
              <span className={styles.headerNavCarritoContador}>
                {totalItems}
              </span>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
