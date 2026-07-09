import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";

// 1. Crear el contexto
export const AuthContext = createContext();

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  const auth = getAuth(); // Obtenemos la conexión con Firebase Authentication

  // Función para registrar un nuevo usuario
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Función para iniciar sesión
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Función para cerrar sesión
  const logout = () => {
    signOut(auth);
  };

  //Función para manejar el cambio de usuario
  const manejarCambioDeUsuario = async (currentUser) => {
    if (currentUser) {
      // Si hay un usuario, buscamos su rol en Firestore.
      const userDocRef = doc(db, "usuarios", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists() && userDocSnap.data().rol === "admin") {
        // Si el documento existe y tiene rol de admin, lo asignamos.
        setUser({ ...currentUser, rol: "admin" });
      } else {
        // Para cualquier otro caso, es un usuario regular.
        setUser({ ...currentUser, rol: "user" });
      }
    } else {
      setUser(null);
    }
    setCargando(false);
  };

  useEffect(() => {
    // onAuthStateChanged es el observador de Firebase
    const unsubscribe = onAuthStateChanged(auth, manejarCambioDeUsuario);
    // Limpiamos el observador al desmontar
    return () => unsubscribe();
  }, [auth, db]); // Agregamos 'auth' como dependencia

  // Crear el objeto 'value' con TODAS las funciones definidas
  const value = {
    user,
    cargando, // Es buena práctica pasar el estado de carga también
    signup,
    login, // Ahora 'login' sí existe y se puede pasar
    logout,
  };

  // Retornar el Provider, asegurándonos de no renderizar hasta que cargue
  // Esto evita que los componentes hijos puedan acceder a 'user' cuando es null
  return (
    <AuthContext.Provider value={value}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};
