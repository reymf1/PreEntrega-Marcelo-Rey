import { ProductosContainer } from "./sections/Productos/ProductosContainer/ProductosContainer";
import { Inicio } from "./sections/Inicio/Inicio";
import "./Home.module.css";

export function Home() {
  return (
    <>
      <section id="inicio">
        <Inicio />
      </section>
      <section id="productos">
        <ProductosContainer
          promocion={false}
          titulo="Productos"
          subtitulo="Abraza la sanación y la sabiduría interior"
          variant="tituloh2"
          tituloTag="h2"
          subtituloTag="p"
        />
      </section>

      <section id="productosFB">
        <ProductosFBContainer
          promocion={false}
          titulo="ProductosFB"
          subtitulo="Abraza la sanación y la sabiduría interior"
          variant="tituloh2"
          tituloTag="h2"
          subtituloTag="p"
        />
      </section>
    </>
  );
}
