import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { FormularioContainer } from "../Formulario/FormularioContainer/FormularioContainer";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

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
    <div>
      <h2>Gestión de Productos</h2>
      <hr />
      <FormularioContainer productoAgregado={cargarProductos} />
      <hr />
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.nombre} - ${prod.precio}
            {/*acá agregaremos los botones de acción */}
            <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GestionProductos;
