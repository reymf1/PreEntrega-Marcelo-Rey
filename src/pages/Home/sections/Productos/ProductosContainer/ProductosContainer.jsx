import React, { useState, useEffect } from "react";
import { ProductosList } from "../ProductosList/ProductosList";
import HeaderTitulo from "../../../../../components/HeaderTitulo/HeaderTitulo";
import styles from "./ProductosContainer.module.css";

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
        const respuesta = await fetch("/data/productos.json");
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos");
        }
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        setError("Error al cargar el producto");
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);
  const productosAMostrar = promocion
    ? productos.filter((prod) => prod.promocion)
    : productos; //Filtra los productos que tienen promocion=true en el json
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
