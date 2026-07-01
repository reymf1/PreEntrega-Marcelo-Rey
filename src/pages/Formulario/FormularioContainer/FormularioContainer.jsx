/*import React, { useState } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";
import HeaderTitulo from "../../../components/HeaderTitulo/HeaderTitulo";
// IMPORTACIONES CLAVE DE FIREBASE
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useRef } from "react"; //Uso useRef para hacer referencia al input type=file para limpiar la pantalla una vez cargada la imágen

export function FormularioContainer({ productoAgregado }) {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    promocion: false,
    categoria: "",
    // Quitamos la urlImagen de aca porque la obtendremos después de la subida
  });
  // 1. Nuevo estado para el archivo de imagen
  const [imagenFile, setImagenFile] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const inputFileRef = useRef(null); //Uso useRef para hacer referencia al input type=file para limpiar la pantalla una vez cargada la imágen

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 2. Nueva función para manejar el cambio del input de tipo "file"
  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };
  const manejarEnvio = async (evento) => {
    evento.preventDefault();//Evita recargar la pantalla
    //console.log("Enviando los siguientes datos a la API:", datosForm);
    setError(null);
    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile) {
      setError("Por favor, selecciona una imagen para el producto.");
      return;
    }
    // --- Lógica para subir la imagen a Imgbb ---
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", imagenFile);
    try {
      setCargando(true);
      /*console.log("Subiendo imagen a Imgbb...");*/
/*const respuestaImgbb = await fetch(
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
          img: datosImgbb.data.url,
        };

        // LÓGICA PARA SUBIR DATOS A FIRESTORE ---
        console.log("Enviando producto a Firebase:", productoCompleto);
        // Apuntamos a la colección "productos" (si no existe, se crea)
        const productosCollection = collection(db, "productos");
        // Agregamos el nuevo documento a la colección
        await addDoc(productosCollection, productoCompleto);

        // Reset formulario
        setDatosForm({
          nombre: "",
          precio: "",
          stock: "",
          descripcion: "",
          promocion: false,
          categoria: "",
        });
        setImagenFile(null); //Se resetea el setImagenFile
        if (inputFileRef.current) {
          //El if es porque en el primer render el input no fue conectado al ref, entonces es null
          inputFileRef.current.value = "";
        } //Se limpia el input file

        // Actualizar la lista
        await productoAgregado();
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      setError(`Error al cargar el producto: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };
  return (
    <>
      {/*<HeaderTitulo
        titulo="Alta de Productos"
        subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
        variant="tituloEstrellas"
        tituloTag="h1"
        subtituloTag="h2"
      />*/ /*}
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        // Pasamos la nueva función como prop
        manejarCambioImagen={manejarCambioImagen}
        cargando={cargando}
        error={error}
        inputFileRef={inputFileRef}
      />
    </>
  );
}*/
