import { Producto } from "../ProductoFB/ProductoFB";
import styles from "./ProductosFBList.module.css";

export function ProductosFBList({ productos }) {
  return (
    <div className={styles.producto}>
      {productos.map((prod) => (
        <ProductoFB key={prod.id} {...prod} />
      ))}
    </div>
  );
}
