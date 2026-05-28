import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CarritoContext.jsx";
//import { ScrollManager } from "./components/ScrollManager.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/*<ScrollManager />{/*Función que me permite navegar entre secciones una misma página y páginas distintas sin conflictos*/}
      <CartProvider>
        {/* Envolvemos la App */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
