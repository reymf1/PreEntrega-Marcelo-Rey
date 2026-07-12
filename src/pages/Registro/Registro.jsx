import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitulo from "../../components/HeaderTitulo/HeaderTitulo";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import styles from "./Registro.module.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError(null); // Reseteamos cualquier error previo

    if (!email.trim() || !password.trim()) {
      setError("Complete todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setCargando(true);
    try {
      // Intentamos crear el nuevo usuario en Firebase
      await signup(email, password);
      toast.success("Usuario registrado correctamente.");
      // Si la creación es exitosa, lo redirigimos al inicio
      // Firebase ya gestiona el estado de sesión automáticamente
      navigate("/");
    } catch (error) {
      // Aquí es donde manejamos el caso específico que nos interesa
      switch (error.code) {
        case "auth/email-already-in-use": {
          const quiereLoguearse = window.confirm(
            "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?",
          );
          if (quiereLoguearse) {
            navigate("/login");
          } else {
            navigate("/");
          }
          break;
        }

        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;

        case "auth/invalid-email":
          setError("El correo electrónico es inválido.");
          break;

        default:
          setError(
            "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
          );
          console.error("Error en el registro:", error.message);
      }
    } finally {
      setCargando(false);
    }
  };
  return (
    <div>
      <HeaderTitulo
        titulo="Registro de Datos"
        subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
        variant="tituloEstrellas"
        tituloTag="h1"
        subtituloTag="h2"
      />
      <div className={styles.contact}>
        <h2>Crear una nueva cuenta</h2>
        <form className={styles.formulario} onSubmit={manejarEnvio}>
          <div className={styles.inputs}>
            <label className={styles.labelText}>
              Correo Electrónico
              <input
                className={styles.inputText}
                type="email"
                value={email}
                placeholder="juanperez@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className={styles.labelText}>
              Contraseña
              <input
                className={styles.inputText}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mínimo 6 caracteres"
              />
            </label>
          </div>
          <div className={styles.botones}>
            <button
              type="submit"
              disabled={cargando}
              className={styles.botonGuardar}
            >
              {cargando ? (
                <span className={styles.cargando}>
                  <span className={styles.spinner}></span>Registrando...
                </span>
              ) : (
                "Registrarse"
              )}
            </button>
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};
export default Registro;
