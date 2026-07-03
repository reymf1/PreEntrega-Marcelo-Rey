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

const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  //Cargar cupones (READ)
  const cargarCupones = async () => {
    try {
      const cuponesRef = collection(db, "cupones");
      const resp = await getDocs(cuponesRef);
      const lista = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCupones(lista);
    } catch (error) {
      setError(`"Error al cargar los cupones: " ${error.message}`);
    }
  };

  useEffect(() => {
    cargarCupones();
  }, []);
};

//Crear cupón (CREATE)
/*const crearCupon = async (e) => {
  e.preventDefault();//Ante un evento, evita que la pantalla se recargue
  setError(null);
  if(!codigo)
};*/
