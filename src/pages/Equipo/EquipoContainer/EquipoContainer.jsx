import React, { useState, useEffect } from "react";
import { ContactoList } from "../ContactoList/ContactoList";
import HeaderTitulo from "../../../components/HeaderTitulo/HeaderTitulo";
import styles from "./EquipoContainer.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

//-----------Función Equipo---------------------
export function EquipoContainer() {
  const [contactos, setContactos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        /*const respuesta = await fetch("/data/contactos.json");
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos");
        }
        const datos = await respuesta.json();
        setContactos(datos);*/
        const contactosDB = collection(db, "contactos");
        const respuesta = await getDocs(contactosDB);
        const datos = respuesta.docs.map((doc) => ({
          ...doc.data(),
          FbId: doc.id, //Este id es el automático de firebase, pero no lo necesito ya que tengo mi propio id creado por mi (dentro de data), pero lo agrego con otro nombre por si lo necesito más adelante para implementar alta, edición o eliminación de contactos.
        }));
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
      {cargando && (
        <span className={styles.cargando}>
          <span className={styles.spinner}></span>Cargando información del equipo, por favor espere...
        </span>
      )}
      {error && <p>Error: {error}</p>}
      {!cargando && !error && <ContactoList contactos={contactos} />}
    </>
  );
}
