import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify"; //Para usar notificaciones en lugar de alert
import { FormularioCupon } from "../Formulario/FormularioCupon/FormularioCupon";
import styles from "./GestionCupones.module.css";
import HeaderTitulo from "../../components/HeaderTitulo/HeaderTitulo";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { Boton } from "../../components/Boton/Boton";

const estadoInicialForm = { codigo: "", descuento: "" };
const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [cuponAEditar, setCuponAEditar] = useState(null);

  //Cargar cupones (READ)
  const cargarCupones = async () => {
    try {
      const cuponesRef = collection(db, "cupones");
      const resp = await getDocs(cuponesRef);
      const lista = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCupones(lista);
    } catch (error) {
      setError("Error al cargar los cupones.");
    }
  };

  useEffect(() => {
    cargarCupones();
  }, []);

  // Funciones para crear y actualizar cupones
  //Función para manejar un cambio en los input
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Función para el envío de datos
  const manejarEnvio = async (e) => {
    e.preventDefault(); //Evita recargar la pantalla

    setError(null);

    // Validamos que todos los campos estén completos
    const codigo = datosForm.codigo.trim().toUpperCase();

    if (!codigo || datosForm.descuento === "") {
      setError("Complete todos los campos");
      return;
    }

    // Validamos que descuento esté entre 1 y 100
    const descuento = Number(datosForm.descuento);

    if (descuento < 1 || descuento > 100) {
      setError("El descuento debe estar entre 1 y 100%");
      return;
    }

    // Validación de código duplicado
    const existe = cupones.some(
      (c) =>
        c.codigo.toLowerCase() === codigo.toLowerCase() &&
        c.id !== cuponAEditar?.id,
    );

    if (existe) {
      setError("Ese código ya existe");
      return;
    }
    setCargando(true);
    try {
      // LÓGICA PARA SUBIR DATOS A FIRESTORE ---
      if (cuponAEditar) {
        const docRef = doc(db, "cupones", cuponAEditar.id);
        await updateDoc(docRef, {
          codigo: codigo, //Elimina los espacios de los extremos
          descuento: descuento,
        });
        toast.success("Cupón actualizado correctamente");
      } else {
        // Apuntamos a la colección "cupones" (si no existe, se crea)
        const cuponesCollection = collection(db, "cupones");
        // Agregamos el nuevo documento a la colección
        await addDoc(cuponesCollection, {
          codigo: codigo, //Elimina los espacios de los extremos
          descuento: descuento,
        });
        toast.success("Cupón agregado correctamente");
      }
      // Actualizar la lista
      await cargarCupones();

      //Resets
      // Reset formulario
      setDatosForm(estadoInicialForm);
      //Reset de cuponAEditar
      setCuponAEditar(null);
    } catch (error) {
      setError(`No se pudo guardar el cupón: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  const manejarEditar = (cupon) => {
    setCuponAEditar(cupon);
    setDatosForm({
      codigo: cupon.codigo,
      descuento: cupon.descuento,
    });
    //Cuando selecciona editar lo envía al formulario
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const modoEdicion = cuponAEditar !== null;

  // Cancelar edición
  const cancelarEdicion = () => {
    setCuponAEditar(null);
    setDatosForm(estadoInicialForm);
  };

  //Función para eliminar un cupón
  const eliminarCupon = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este cupón?",
    );
    if (confirmacion) {
      try {
        const docRef = doc(db, "cupones", id);
        await deleteDoc(docRef);

        // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
        setCupones((cuponesActuales) =>
          cuponesActuales.filter((cupon) => cupon.id !== id),
        );
        toast.success("Cupón eliminado correctamente");

        //Verifica que el cupon a editar no sea el que estoy eliminando. Si lo estoy eliminando blanquea el formulario de edición
        if (cuponAEditar?.id === id) {
          setCuponAEditar(null);
          setDatosForm(estadoInicialForm);
        }
      } catch (error) {
        setError(`No se pudo eliminar el cupón.`);
      }
    }
  };
  return (
    <>
      <HeaderTitulo
        titulo="Gestión de Cupones"
        subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
        variant="tituloEstrellas"
        tituloTag="h1"
        subtituloTag="h2"
      />
      <FormularioCupon
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        cargando={cargando}
        error={error}
        modoEdicion={modoEdicion}
        cancelarEdicion={cancelarEdicion}
      />
      <div className={styles.list}>
        <h2>Administrar Cupones de Descuento</h2>
        <ul className={styles.listItems}>
          <div className={styles.listHeader}>
            <span>Código</span>
            <span>Descuento</span>
            <span>Acciones</span>
          </div>
          {cupones.map((cupon) => (
            <li key={cupon.id}>
              <div className={styles.listItemTextProd}>
                <p>{cupon.codigo}</p>
              </div>
              <div className={styles.listItemDescuento}>
                <p>%{cupon.descuento}</p>
              </div>
              <div className={styles.listBotones}>
                <Boton variant="eliminar" onClick={() => manejarEditar(cupon)}>
                  Editar <AiOutlineEdit size={17} />
                </Boton>
                <Boton
                  variant="eliminar"
                  onClick={() => eliminarCupon(cupon.id)}
                >
                  Eliminar <RiDeleteBinLine size={15} />
                </Boton>
              </div>
            </li>
          ))}
        </ul>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};
export default GestionCupones;
