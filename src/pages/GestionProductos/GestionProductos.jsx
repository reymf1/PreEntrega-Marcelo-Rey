import { useState, useEffect, useRef } from "react"; //Uso useRef para hacer referencia al input type=file para limpiar la pantalla una vez cargada la imágen
import { db } from "../../firebase/config";
import { FormularioProducto } from "../Formulario/FormularioProducto/FormularioProducto";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import HeaderTitulo from "../../components/HeaderTitulo/HeaderTitulo";
import styles from "./GestionProductos.module.css";
import { Boton } from "../../components/Boton/Boton";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify"; //Para usar notificaciones en lugar de alert

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
  const [imagenFile, setImagenFile] = useState(null);
  const [errorFormulario, setErrorFormulario] = useState(null);
  const [errorLista, setErrorLista] = useState(null);
  const [cargando, setCargando] = useState(false);
  const inputFileRef = useRef(null); //Uso useRef para hacer referencia al input type=file para limpiar la pantalla una vez cargada la imágen
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  //Función para cargar los productos de Firestore
  const cargarProductos = async () => {
    try {
      const productosRef = collection(db, "productos");
      const resp = await getDocs(productosRef);
      setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
      setErrorLista("Error al cargar los productos.");
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    cargarProductos();
  }, []);

  //Función para subir la imágen a Imgbb
  const subirImagen = async (imagenFile) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", imagenFile);
    const respuestaImgbb = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!respuestaImgbb.ok) {
      throw new Error("Error en la respuesta del servidor"); //Pasa al catch(error)
    }
    const datosImgbb = await respuestaImgbb.json();
    if (!datosImgbb.success) {
      throw new Error("La subida de la imagen a Imgbb falló.");
    }
    return datosImgbb.data.url;
  };

  //Función para eliminar un producto
  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );
    if (confirmacion) {
      try {
        const docRef = doc(db, "productos", id);
        await deleteDoc(docRef);

        // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
        setProductos((productosActuales) =>
          productosActuales.filter((prod) => prod.id !== id),
        );
        toast.success("Producto eliminado correctamente");
        //Verifica que el cupon a editar no sea el que estoy eliminando. Si lo estoy eliminando blanquea el formulario de edición
        if (productoAEditar?.id === id) {
          setProductoAEditar(null);
          setDatosForm(estadoInicialForm);
        }
      } catch (error) {
        console.error(error);
        setErrorLista("No se pudo eliminar el producto.");
      }
    }
  };

  //Función para manejar un cambio en los input
  const manejarCambio = (evento) => {
    setErrorFormulario(null);
    const { name, value, type, checked } = evento.target;
    setDatosForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Función para manejar el cambio del input de tipo "file"
  const manejarCambioImagen = (evento) => {
    setErrorFormulario(null);
    setImagenFile(evento.target.files[0]);
  };

  //Función para el envío de datos
  const manejarEnvio = async (evento) => {
    evento.preventDefault(); //Evita recargar la pantalla
    //console.log("Enviando los siguientes datos a la API:", datosForm);
    setErrorFormulario(null);
    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile && !productoAEditar) {
      setErrorFormulario("Por favor, selecciona una imagen para el producto.");
      return;
    }
    setCargando(true);
    try {
      //Subo la imagen sólo si imagenFile != null, es decir si quiero subirla a imgbb
      let urlImagen = datosForm.img;
      if (imagenFile) {
        urlImagen = await subirImagen(imagenFile);
      }
      // Unimos la URL de la imagen con el resto de los datos del formulario
      const productoCompleto = {
        ...datosForm,
        // Agregamos la URL obtenida
        precio: Number(datosForm.precio), //Convierte a número
        stock: Number(datosForm.stock),
        img: urlImagen, //urlImagen contiene la nueva imágen o la anterior (si decido no cambiarla al editar)
      };
      // LÓGICA PARA SUBIR DATOS A FIRESTORE ---
      if (productoAEditar) {
        const docRef = doc(db, "productos", productoAEditar.id);
        await updateDoc(docRef, productoCompleto);
        toast.success("Producto actualizado correctamente");
      } else {
        // Apuntamos a la colección "productos" (si no existe, se crea)
        const productosCollection = collection(db, "productos");
        // Agregamos el nuevo documento a la colección
        await addDoc(productosCollection, productoCompleto);
        toast.success("Producto agregado correctamente");
      }
      // Actualizar la lista
      await cargarProductos();
      //Resets
      // Reset formulario
      setDatosForm(estadoInicialForm);
      //Se resetea el setImagenFile
      setImagenFile(null);
      //Se limpia el input file
      if (inputFileRef.current) {
        //El if es porque en el primer render el input no fue conectado al ref, entonces es null
        inputFileRef.current.value = "";
      }
      //Reset de productoAEditar
      setProductoAEditar(null);
    } catch (error) {
      console.error(error);
      setErrorFormulario("No se pudo guardar el producto.");
    } finally {
      setCargando(false);
    }
  };

  const manejarEditar = (producto) => {
    setProductoAEditar(producto);
    setDatosForm({ ...producto });
    //Cuando selecciona editar lo envía al formulario
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const modoEdicion = productoAEditar !== null;

  // Cancelar edición
  const cancelarEdicion = () => {
    setProductoAEditar(null);
    setDatosForm(estadoInicialForm);
    setImagenFile(null);
    setErrorFormulario(null);

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

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
        error={errorFormulario}
        inputFileRef={inputFileRef}
        modoEdicion={modoEdicion}
        cancelarEdicion={cancelarEdicion}
      />
      {errorFormulario && (
        <p className={styles.errorFormulario}>{errorFormulario}</p>
      )}

      <div className={styles.list}>
        <h2>Administrar Productos</h2>
        <ul className={styles.listItems}>
          <div className={styles.listHeader}>
            <span>Imagen</span>
            <span>Producto</span>
            <span>Precio</span>
            <span>Acciones</span>
          </div>
          {productos.map((prod) => (
            <li key={prod.id}>
              <div className={styles.listItemImg}>
                <img src={prod.img} alt={prod.nombre} />
              </div>
              <div className={styles.listItemTextProd}>
                <p>{prod.nombre}</p>
              </div>
              <div className={styles.listItemPrecio}>
                <p>${prod.precio}</p>
              </div>
              <div className={styles.listBotones}>
                <Boton variant="eliminar" onClick={() => manejarEditar(prod)}>
                  Editar <AiOutlineEdit size={17} />
                </Boton>
                <Boton variant="eliminar" onClick={() => handleDelete(prod.id)}>
                  Eliminar <RiDeleteBinLine size={15} />
                </Boton>
              </div>
            </li>
          ))}
        </ul>
        {errorLista && <p className={styles.errorLista}>{errorLista}</p>}
      </div>
    </>
  );
};
export default GestionProductos;
