import React, { useState } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";
import HeaderTitulo from "../../../components/HeaderTitulo/HeaderTitulo";
import styles from "./FormularioContainer.module.css";

export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    // Quitamos la urlImagen de aca porque la obtendremos después de la subida
  });
  //setImagenFile(null); //Se resetea el setImagenFile
  // 1. Nuevo estado para el archivo de imagen
  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value,
    });
  };

  // 2. Nueva función para manejar el cambio del input de tipo "file"
  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    //console.log("Enviando los siguientes datos a la API:", datosForm);
    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }
    // --- Lógica para subir la imagen a Imgbb ---
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY; // 🚨 ¡Reemplazá esto con tu clave!
    const formData = new FormData();
    formData.append("image", imagenFile);
    try {
      setCargando(true);
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!respuestaImgbb.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

        // Unimos la URL de la imagen con el resto de los datos del formulario
        const productoCompleto = {
          ...datosForm,
          // Agregamos la URL obtenida
          precio: Number(datosForm.precio), //Convierte a número
          stock: Number(datosForm.stock),
          urlImagen: datosImgbb.data.url,
        };

        // Por el momento hacemos un console.log
        console.log(
          "Enviando los siguientes datos COMPLETOS a la API:",
          productoCompleto,
        );
        // Reset formulario
        setDatosForm({
          nombre: "",
          precio: "",
          stock: "",
        });

        setImagenFile(null);
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
    } finally {
      setCargando(false);
    }
  };
  return (
    <>
      <HeaderTitulo
        titulo="Alta de Productos"
        subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
        variant="tituloEstrellas"
        tituloTag="h1"
        subtituloTag="h2"
      />
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        // Pasamos la nueva función como prop
        manejarCambioImagen={manejarCambioImagen}
        cargando={cargando}
      />
    </>
  );
}
