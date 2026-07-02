// En src/componentens/FormularioProducto/FormularioProducto
import React from "react";
import styles from "./FormularioProducto.module.css";

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarCambioImagen,
  manejarEnvio,
  cargando,
  error,
  inputFileRef,
  modoEdicion,
}) {
  return (
    <div className={styles.contact}>
      <h2>{modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
      <form className={styles.formulario} onSubmit={manejarEnvio}>
        <div className={styles.formulario1}>
          <label className={styles.labelText}>
            Nombre del Producto
            <input
              className={styles.inputText}
              type="text"
              placeholder="Rocío Áurico"
              name="nombre" // Atributo clave para identificar el input
              value={datosForm.nombre}
              onChange={manejarCambio}
              required
            />
          </label>
          <label className={styles.labelText}>
            Precio
            <input
              className={styles.inputText}
              type="number"
              placeholder="5000"
              name="precio" // Atributo clave
              value={datosForm.precio}
              onChange={manejarCambio}
              required
            />
          </label>
          <label className={styles.labelFile}>
            Producto en promoción
            <input
              className={styles.inputFile}
              type="checkbox"
              name="promocion"
              checked={datosForm.promocion}
              onChange={manejarCambio}
            />
          </label>
          <label className={styles.labelText}>
            Stock
            <input
              className={styles.inputText}
              type="number"
              placeholder="5"
              name="stock" // Atributo clave
              value={datosForm.stock}
              onChange={manejarCambio}
              required
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
              ref={inputFileRef}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={cargando}
          className={styles.botonGuardar}
        >
          {cargando ? (
            <span className={styles.cargando}>
              <span className={styles.spinner}></span>Procesando...
            </span>
          ) : modoEdicion ? (
            "Actualizar Producto"
          ) : (
            "Guardar Producto"
          )}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
