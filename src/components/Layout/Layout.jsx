import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Carrito from "../../pages/Carrito/Carrito";
import { CartContext, useCart } from "../../context/CartContext";
import styles from "./Layout.module.css";

//Todo lo que pongamos dentro de <Layout> en App.jsx será el "children"
export function Layout() {
  const { isCartOpen } = useCart();
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <aside className={`${styles.aside} ${isCartOpen ? styles.open : ""}`}>
        <Carrito />
      </aside>
      <Footer />
    </div>
  );
}
