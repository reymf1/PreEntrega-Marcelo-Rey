import { Producto } from "../Producto/Producto";
import styles from "./ProductosList.module.css";

export function ProductosList({ productos }) {
  return (
    <div className={styles.producto}>
      {productos.map((prod) => (
        <Producto key={prod.id} {...prod} />
      ))}
    </div>
  );
}
