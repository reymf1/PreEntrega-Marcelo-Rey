import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { FormularioProducto } from "../Formulario/FormularioProducto/FormularioProducto";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import HeaderTitulo from "../../components/HeaderTitulo/HeaderTitulo";
import styles from "./GestionProductos.module.css";
import { Boton } from "../../components/Boton/Boton";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { useRef } from "react"; //Uso useRef para hacer referencia al input type=file para limpiar la pantalla una vez cargada la imágen

const GestionProductos = () => {
  const estadoInicialForm = {
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    promocion: false,
    categoria: "",
    // Quitamos la urlImagen de aca porque la obtendremos después de la subida
  };
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  // 1. Nuevo estado para el archivo de imagen
  const [imagenFile, setImagenFile] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const inputFileRef = useRef(null); //Uso useRef para hacer referencia al input type=file para limpiar la pantalla una vez cargada la imágen
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

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
    evento.preventDefault(); //Evita recargar la pantalla
    //console.log("Enviando los siguientes datos a la API:", datosForm);
    setError(null);
    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile && !productoAEditar) {
      setError("Por favor, selecciona una imagen para el producto.");
      return;
    }

    // --- Lógica para subir la imagen a Imgbb ---
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", imagenFile);

    let urlImagen = datosForm.imagen;
    try {
      setCargando(true);

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
          img: datosImgbb.data.url,
        };

        // LÓGICA PARA SUBIR DATOS A FIRESTORE ---
        console.log("Enviando producto a Firebase:", productoCompleto);
        // Apuntamos a la colección "productos" (si no existe, se crea)
        const productosCollection = collection(db, "productos");
        // Agregamos el nuevo documento a la colección
        await addDoc(productosCollection, productoCompleto);

        setDatosForm(estadoInicialForm); // Reset formulario
        setImagenFile(null); //Se resetea el setImagenFile
        if (inputFileRef.current) {
          //El if es porque en el primer render el input no fue conectado al ref, entonces es null
          inputFileRef.current.value = "";
        } //Se limpia el input file
        await cargarProductos(); // Actualizar la lista
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      setError(`Error al cargar el producto: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };
  const manejarEditar = (producto) => {
    setProductoAEditar(producto);
    setDatosForm(producto);
  };
  const modoEdicion = productoAEditar !== null;

  return (
    <>
      <HeaderTitulo
        titulo="Gestión de Productos"
        subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
        variant="tituloEstrellas"
        tituloTag="h1"
        subtituloTag="h2"
      />
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarCambioImagen={manejarCambioImagen}
        manejarEnvio={manejarEnvio}
        cargando={cargando}
        error={error}
        inputFileRef={inputFileRef}
        modoEdicion={modoEdicion}
      />
      <div className={styles.list}>
        <h2>Administrar Productos</h2>
        <ul className={styles.listItems}>
          {productos.map((prod) => (
            <li key={prod.id}>
              <div className={styles.listItemText}>
                <img src={prod.img} alt={prod.nombre} />
              </div>
              <div className={styles.listItemTextProd}>
                <p>{prod.nombre}</p>
              </div>
              <div>
                <p>${prod.precio}</p>
              </div>
              <div>
                <Boton variant="eliminar" onClick={() => manejarEditar(prod)}>
                  Editar <AiOutlineEdit size={17} />
                </Boton>
              </div>
              <div>
                <Boton variant="eliminar" onClick={() => handleDelete(prod.id)}>
                  Eliminar <RiDeleteBinLine size={15} />
                </Boton>
              </div>
              {/*acá agregaremos los botones de acción */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default GestionProductos;
