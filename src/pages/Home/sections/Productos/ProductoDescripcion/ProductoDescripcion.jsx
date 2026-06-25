import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; //Devuelve un objeto con los parámetros de la URL
import styles from "../ProductoDescripcion/ProductoDescripcion.module.css";
import HeaderTitulo from "../../../../../components/HeaderTitulo/HeaderTitulo";
import { Link } from "react-router-dom";
import { Boton } from "../../../../../components/Boton/Boton";
import { HashLink } from "react-router-hash-link";
// Importaciones clave para obtener un solo documento
import { doc, query, collection, where, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";

const ProductoDescripcion = () => {
  //Es lo mismo que function ProductoDescripcion()
  const { id } = useParams(); //Tomo el id de useParams
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  const location = useLocation();
  const volverA = location.state?.from || "/"; //Si existe location.state volverA=location.state sino volverA="/"

  /*useEffect(() => {
    const cargarProducto = async () => {
      try {
        const respuesta = await fetch("/data/productos.json");
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos");
        }
        const datos = await respuesta.json();
        const productoEncontrado = datos.find((p) => p.id === parseInt(id)); //Porque useParams devuelve string

        productoEncontrado
          ? setProducto(productoEncontrado)
          : setError("Producto no encontrado");
      } catch (error) {
        setError("Error al cargar el producto");
      } finally {
        setCargando(false);
      }
    };
    cargarProducto();
  }, [id]);*/

  useEffect(() => {
    if (!id) {
      setCargando(false);
      setError("Id inválido");
      return;
    }
    const cargarProducto = async () => {
      try {
        /*Usaría const docRef = doc(db, "Productos nacionales", id); si utilizaría el id de firebase*/
        //Como queremos utilizar nuestro id, creamos una consulta = query
        /*const queryId = query(
          //creamos una referencia a la colección productos
          collection(db, "productos"),
          //sólo los documentos cuyo campo id sea igual al valor recibido
          where("id", "==", Number(id)),
        );*/
        const docRef = doc(db, "productos", id);
        const resp = await getDoc(docRef);
        if (!resp.exists()) {
          setCargando(false);
          setError("No se encontró el producto");
          return;
        }
        setProducto({
          ...resp.data(),
          id: resp.id,
        });
      } catch (error) {
        setError(`Error al cargar el producto:${error.message}`);
      } finally {
        setCargando(false);
      }
    };
    cargarProducto();
  }, [id]);
  if (cargando) return <h2>Cargando detalle del producto...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!producto) return null;

  const { img, nombre, precio, descripcion } = producto;

  return (
    <>
      <div className={styles.descrProducto}>
        <HeaderTitulo
          titulo="Descripción de Producto"
          subtitulo="Abraza la sanación y la sabiduría interior"
          variant="tituloh2"
          tituloTag="h2"
          subtituloTag="p"
        />
      </div>
      <div className={styles.producto}>
        <article className={styles.productoCard}>
          <div className={styles.productoCardImg}>
            <img src={img} alt={nombre} />
          </div>
          <div className={styles.productoCardParrafo}>
            <h3>{nombre}</h3>
            <p className={styles.precio}>
              {precio.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>
            <div
              className={styles.descripcion}
              dangerouslySetInnerHTML={{ __html: descripcion }}
            />
            {/*Convierte el contenido de descripcion del json en html dentro de un div*/}
          </div>
          <div className={styles.botones1}>
            <HashLink
              to={volverA}
              /*scroll={(el) =>
                setTimeout(() => {
                  el.scrollIntoView({
                    block: "start",
                  });
                }, 100)
              }*/
            >
              <Boton variant="prod">Volver</Boton>
            </HashLink>
          </div>
        </article>
      </div>
    </>
  );
};
export default ProductoDescripcion;
