import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Carrito from "../../pages/Carrito/Carrito";
import { CartContext, useCart } from "../../context/CartContext";
import styles from "./Layout.module.css";

//Todo lo que pongamos dentro de <Layout> en App.jsx será el "children"
export function Layout() {
  const { isCartOpen, closeCart } = useCart();
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ""}`}
        onClick={() => {
          if (isCartOpen) closeCart();
        }}
      />
      <aside className={`${styles.aside} ${isCartOpen ? styles.open : ""}`}>
        <Carrito />
      </aside>
      <Footer />
    </div>
  );
}
