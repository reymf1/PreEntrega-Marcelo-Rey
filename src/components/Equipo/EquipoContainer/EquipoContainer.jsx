import React, { useState, useEffect } from "react";
import { ContactoList } from "../ContactoList/ContactoList";
import HeaderTitulo from "../../HeaderTitulo/HeaderTitulo";
import styles from "./EquipoContainer.module.css";

//-----------Función Productos---------------------
export function EquipoContainer() {
  const [contactos, setContactos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        const respuesta = await fetch("/data/contactos.json");
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos");
        }
        const datos = await respuesta.json();
        setContactos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };
    obtenerContactos();
  }, []);
  return (
    <>
      <HeaderTitulo
        titulo="Nosotros"
        subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
        variant="tituloEstrellas"
        tituloTag="h1"
        subtituloTag="h2"
      />
      {cargando && <p>Cargando productos, por favor espere...</p>}
      {error && <p>Error: {error}</p>}
      {!cargando && !error && <ContactoList contactos={contactos} />}
    </>
  );
}
