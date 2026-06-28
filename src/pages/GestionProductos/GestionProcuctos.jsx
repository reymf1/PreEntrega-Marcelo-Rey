import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { FormularioContainer } from "../Formulario/FormularioContainer/FormularioContainer";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import HeaderTitulo from "../../components/HeaderTitulo/HeaderTitulo";
import styles from "./GestionProductos.module.css";
import { Boton } from "../../components/Boton/Boton";
import { RiDeleteBinLine } from "react-icons/ri";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const cargarProductos = async () => {
    const productosRef = collection(db, "productos");
    const resp = await getDocs(productosRef);
    setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    cargarProductos();
  }, []);
  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );
    if (confirmacion) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
      setProductos((productosActuales) =>
        productosActuales.filter((prod) => prod.id !== id),
      );
      alert("Producto eliminado.");
    }
  };
  return (
    <>
      <HeaderTitulo
        titulo="Gestión de Productos"
        subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
        variant="tituloEstrellas"
        tituloTag="h1"
        subtituloTag="h2"
      />
      <FormularioContainer productoAgregado={cargarProductos} />
      <div className={styles.list}>
        <h2>Gestionar Lista de Productos</h2>
        <ul className={styles.listItems}>
          {productos.map((prod) => (
            <li key={prod.id}>
              <div className={styles.listItemText}>
                <img src={prod.img} alt={prod.nombre} />
                <div className={styles.listItemTextProd}>
                  <p>{prod.nombre}</p>
                  <p>${prod.precio}</p>
                  {/*acá agregaremos los botones de acción */}
                  <Boton variant="eliminar" onClick={() => handleDelete(prod.id)}>
                    Eliminar <RiDeleteBinLine size={15}/>
                  </Boton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default GestionProductos;
