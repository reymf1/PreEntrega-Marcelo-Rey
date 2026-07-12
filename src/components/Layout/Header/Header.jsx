import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

function Header() {
  // 2. Usamos el hook para acceder a la función
  const { getCartQuantity, openCart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = getCartQuantity();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState(false);
  return (
    <header>
      {/* ===== ESCRITORIO ===== */}
      <nav className={styles.headerDesktopNav}>
        <HashLink to="/#inicio">
          {/*Pongo esto en lugar de link porque permite navegar a un id específico dentro de una página usando hashes*/}
          <img src="/images/LogoYoga3.png" alt="Logo Yoga" />
        </HashLink>
        <ul className={styles.headerDesktopNavList}>
          <li>
            <HashLink to="/#inicio">INICIO</HashLink>
          </li>
          <li>
            <HashLink to="/#productos">PRODUCTOS</HashLink>
          </li>
          <li>
            <Link to="/promo">PROMOCIONES</Link>
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
              {user.rol === "admin" ? (
                <li className={styles.headerNavItemMenu}>
                  <span>{user.email?.split("@")[0].toUpperCase()}</span>
                  <img src="/images/flechaabajo.png" alt="" />
                  <ul className={styles.headerNavItemMenuSubmenu}>
                    <li>
                      <Link to="/admin/gestion">GESTIÓN PRODUCTOS</Link>
                    </li>
                    <li>
                      <Link to="/admin/cupones">GESTIÓN CUPONES</Link>
                    </li>
                    <li>
                      <button onClick={logout}>CERRAR SESIÓN</button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>{user.email?.split("@")[0].toUpperCase()}</li>
              )}
            </>
          ) : (
            <li>
              <Link to="/login">INICIAR SESIÓN</Link>
            </li>
          )}
          <li className={styles.headerNavCarrito}>
            <img
              onClick={() => {
                openCart();
                setMenuAbierto(false);
              }}
              className={styles.headerNavCarritoIcon}
              src="/images/carritoDeCompras.png"
              alt="Carrito de Compras"
            />
            {totalItems >= 0 && (
              <span className={styles.headerNavCarritoContador}>
                {totalItems}
              </span>
            )}
          </li>
        </ul>
      </nav>

      {/* ===== MÓVIL ===== */}
      <nav className={styles.headerMobileNav}>
        <button
          className={styles.MenuBtn}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <img className={styles.iconMenu} src="/images/menu-1.png" alt="" />
        </button>

        <div className={styles.headerNav1Logo}>
          <HashLink to="/#inicio">
            <img src="/images/LogoYoga3.png" alt="Logo Yoga" />
          </HashLink>
        </div>
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
      </nav>

      {/* ===== PANEL LATERAL ===== */}
      <nav
        className={
          menuAbierto
            ? `${styles.mobileMenu} ${styles.open}`
            : styles.mobileMenu
        }
      >
        <button
          className={`${styles.MenuBtn} ${styles.closeBtn}`}
          onClick={() => {
            setMenuAbierto(false);
            setSubmenuAbierto(false);
          }}
        >
          <img
            className={styles.iconMenu}
            src="/images/cerrar-simbolo-1.png"
            alt=""
          />
        </button>
        <HashLink to="/#inicio" onClick={() => setMenuAbierto(false)}>
          {/*Pongo esto en lugar de link porque permite navegar a un id específico dentro de una página usando hashes*/}
          <img className={styles.logo} src="/images/LogoYoga3.png" alt="Logo Yoga" />
        </HashLink>
        <ul className={styles.MobileMenuList}>
          <li>
            <HashLink to="/#inicio" onClick={() => setMenuAbierto(false)}>
              INICIO
            </HashLink>
          </li>
          <li>
            <HashLink to="/#productos" onClick={() => setMenuAbierto(false)}>
              PRODUCTOS
            </HashLink>
          </li>
          <li>
            <Link to="/promo" onClick={() => setMenuAbierto(false)}>
              PROMOCIONES
            </Link>
          </li>
          <li>
            <Link to="/nosotros" onClick={() => setMenuAbierto(false)}>
              NOSOTROS
            </Link>
          </li>
          <li>
            <Link to="/acercaDeMi" onClick={() => setMenuAbierto(false)}>
              ACERCA DE MI
            </Link>
          </li>
          <li>
            <Link to="/resenias" onClick={() => setMenuAbierto(false)}>
              RESEÑAS
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={() => setMenuAbierto(false)}>
              CONTACTO
            </Link>
          </li>
          {/* Lógica de renderizado condicional */}
          {user ? (
            <>
              {user.rol === "admin" ? (
                <li className={styles.headerNavItemMenu}>
                  <div
                    className={styles.mobileUser}
                    onClick={() => setSubmenuAbierto(!submenuAbierto)}
                  >
                    <span>{user.email?.split("@")[0].toUpperCase()}</span>
                    <img
                      className={submenuAbierto ? styles.flechaAbierta : ""}
                      src="/images/flechaabajo.png"
                      alt=""
                    />
                  </div>
                  <ul
                    className={
                      submenuAbierto
                        ? `${styles.headerNavItemMenuSubmenu} ${styles.submenuOpen}`
                        : styles.headerNavItemMenuSubmenu
                    }
                  >
                    <li>
                      <Link
                        to="/admin/gestion"
                        onClick={() => setMenuAbierto(false)}
                      >
                        GESTIÓN PRODUCTOS
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/cupones"
                        onClick={() => setMenuAbierto(false)}
                      >
                        GESTIÓN CUPONES
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setMenuAbierto(false);
                        }}
                      >
                        CERRAR SESIÓN
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>{user.email?.split("@")[0].toUpperCase()}</li>
              )}
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setMenuAbierto(false)}>
                INICIAR SESIÓN
              </Link>
            </li>
          )}
          <li className={styles.headerNavCarrito}>
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
          </li>
        </ul>
      </nav>

      {/*<nav className={styles.headerNav1}>
        <button
          className={styles.headerNavMenuBtn}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? (
            <img
              className={styles.iconMenu}
              src="/images/cerrar-simbolo-1.png"
              alt=""
            />
          ) : (
            <img className={styles.iconMenu} src="/images/menu-1.png" alt="" />
          )}
        </button>
        <div className={styles.headerNav1Logo}>
          <HashLink to="/#inicio">
            <img src="/images/LogoYoga3.png" alt="Logo Yoga" />
          </HashLink>
        </div>
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
      </nav>*/}
    </header>
  );
}
export default Header;
