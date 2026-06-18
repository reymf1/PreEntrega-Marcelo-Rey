import React, { useState, useEffect } from "react";
import { ProductosList } from "../ProductosList/ProductosList";
import HeaderTitulo from "../../../../../components/HeaderTitulo/HeaderTitulo";
import styles from "./ProductosContainer.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase/config";

//-----------Función Productos---------------------
export function ProductosContainer({
  promocion,
  titulo,
  subtitulo,
  variant,
  tituloTag,
  subtituloTag,
}) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        /*const respuesta = await fetch("/data/productos.json");
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos");
        }
        const datos = await respuesta.json();
        setProductos(datos);*/
        const productosDB = collection(db, "productos");
        const respuesta = await getDocs(productosDB);
        setProductos(
          respuesta.docs.map((doc) => ({
            ...doc.data(),
            FbId: doc.id, //Este id es el automático de firebase, pero no lo necesito ya que tengo mi propio id creado por mi (dentro de data), pero lo agrego con otro nombre por si lo necesito más adelante para implementar alta, edición o eliminación de productos.
          })),
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);
  const productosAMostrar = promocion
    ? productos.filter((prod) => prod.promocion)
    : productos; //Filtra los productos que tienen promocion=true en el json

  //Este useEffect lo uso si voy a productos desde una página distinta. Verifica si va a productos y si terminó de cargar los mismos.
  useEffect(() => {
    if (!cargando && window.location.hash === "#productos") {
      document.getElementById("productos")?.scrollIntoView({
        block: "start",
      });
    }
  }, [cargando]);
  return (
    <>
      <HeaderTitulo
        titulo={titulo}
        subtitulo={subtitulo}
        variant={variant}
        tituloTag={tituloTag}
        subtituloTag={subtituloTag}
      />
      {cargando && <p>Cargando productos, por favor espere...</p>}
      {/*Lopongo en el return porque si hay error o está cargando aparece el título aparece*/}
      {error && <p>Error: {error}</p>}
      {!cargando && !error && <ProductosList productos={productosAMostrar} />}
    </>
  );
}
