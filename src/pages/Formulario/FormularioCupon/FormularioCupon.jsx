// En src/componentens/FormularioProducto/FormularioProducto
import React from "react";
import styles from "./FormularioCupon.module.css";

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioCupon({
  datosForm,
  manejarCambio,
  manejarEnvio,
  cargando,
  error,
  modoEdicion,
  cancelarEdicion,
}) {
  return (
    <div className={styles.contact}>
      <h2>
        {modoEdicion
          ? "Actualizar Cupón de Descuento"
          : "Crear Cupón de Descuento"}
      </h2>
      <form className={styles.formulario} onSubmit={manejarEnvio}>
        <div className={styles.formulario1}>
          <label className={styles.labelText}>
            Código de descuento
            <input
              className={styles.inputText}
              type="text"
              placeholder="Código"
              name="codigo" // Atributo clave para identificar el input
              value={datosForm.codigo}
              onChange={manejarCambio}
              required
            />
          </label>
          <label className={styles.labelText}>
            Descuento
            <input
              className={styles.inputText}
              type="number"
              placeholder="25"
              name="descuento" // Atributo clave
              value={datosForm.descuento}
              onChange={manejarCambio}
              required
            />
          </label>
        </div>
        <div className={styles.botones}>
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
              "Actualizar Cupón"
            ) : (
              "Crear Cupón"
            )}
          </button>
          {modoEdicion && (
            <button
              type="button"
              className={styles.botonGuardar}
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
