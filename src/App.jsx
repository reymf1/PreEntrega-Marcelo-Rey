import "./App.css";
import { Home } from "./pages/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { EquipoContainer } from "./pages/Equipo/EquipoContainer/EquipoContainer";
import { ProductosContainer } from "./pages/Home/sections/Productos/ProductosContainer/ProductosContainer";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import ProductoDescripcion from "./pages/Home/sections/Productos/ProductoDescripcion/ProductoDescripcion";
import Carrito from "./pages/Carrito/Carrito";
import GestionProductos from "./pages/GestionProductos/GestionProductos";
import GestionCupones from "./pages/GestionCupones/GestionCupones";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Toast.css";

function App() {
  return (
    <>
      <ToastContainer />
      {/*Es el lugar donde se visualizan todas las notificaciones. Sirve para mostrar en pantalla las notificaciones creadas con React Toastify*/}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="promo"
            element={
              <ProductosContainer
                promocion={true}
                titulo="Promociones"
                subtitulo="CENTRO PARA LA VIDA ESPIRITUAL"
                variant="tituloEstrellas"
                tituloTag="h1"
                subtituloTag="h2"
              />
            }
          />
          <Route path="producto/:id" element={<ProductoDescripcion />} />
          <Route path="nosotros" element={<EquipoContainer />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route
            path="admin/gestion"
            element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <GestionProductos />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="admin/cupones"
            element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <GestionCupones />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
