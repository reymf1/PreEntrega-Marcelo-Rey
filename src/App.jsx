import "./App.css";
import { Home } from "./pages/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { FormularioContainer } from "./pages/Formulario/FormularioContainer/FormularioContainer";
import { EquipoContainer } from "./pages/Equipo/EquipoContainer/EquipoContainer";
import { ProductosContainer } from "./pages/Home/sections/Productos/ProductosContainer/ProductosContainer";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import ProductoDescripcion from "./pages/Home/sections/Productos/ProductoDescripcion/ProductoDescripcion";
import Carrito from "./pages/Carrito/Carrito";

function App() {
  return (
    <>
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
          <Route path="formulario" element={<FormularioContainer />} />
          <Route path="nosotros" element={<EquipoContainer />} />
          <Route path="carrito" element={<Carrito />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
