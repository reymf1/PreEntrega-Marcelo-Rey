// En src/componentens/FormularioProducto/FormularioProducto
import React from "react";
import styles from "./FormularioProducto.module.css";

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  cargando,
}) {
  return (
    <div className={styles.contact}>
      <h2>Agregar Nuevo Producto</h2>
      <form className={styles.formulario} onSubmit={manejarEnvio}>
        <div className={styles.formulario1}>
          <label>
            Nombre del Producto
            <input
              type="text"
              placeholder="Rocío Áurico"
              name="nombre" // Atributo clave para identificar el input
              value={datosForm.nombre}
              onChange={manejarCambio}
            />
          </label>
          <label>
            Precio
            <input
              type="number"
              placeholder="5000"
              name="precio" // Atributo clave
              value={datosForm.precio}
              onChange={manejarCambio}
            />
          </label>
          <label>
            Stock
            <input
              type="number"
              placeholder="5"
              name="stock" // Atributo clave
              value={datosForm.stock}
              onChange={manejarCambio}
            />
          </label>
        </div>
        <div className={styles.formulario2}>
          <label>
            Imagen
            <input
              type="file"
              accept="image/*"
              onChange={manejarCambioImagen}
              className={styles.formFile}
            />
          </label>
        </div>
        <button type="submit" disabled={cargando} className={styles.botonGuardar}>
          {cargando ? (
            <>
              <span className={styles.spinner}></span>
              Subiendo...
            </>
          ) : (
            "Guardar Producto"
          )}
        </button>
      </form>
    </div>
  );
}
