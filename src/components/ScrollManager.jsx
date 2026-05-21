import { useEffect } from "react";
import { useLocation } from "react-router-dom"; //Me entrega la URL actual

export function ScrollManager() {
  const location = useLocation(); //Obtengo la URL
  useEffect(() => {
    if (!location.hash) {
      //Si location no tiene "#" el scroll va al tope de página
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = location.hash.replace("#", ""); //Si tiene el "#" lo saco porque el id no tiene "#"

    const element = document.getElementById(id); //Obtengo el elemento con ese id

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 90,//Es la distancia del elemento al tope de pantalla y el resto (en px) el espacio (en altura) que ocupa la navbar fixed
        behavior: "smooth",
      }); //Se desplaza hasta ese elemento
    }
  }, [location]); //useEffect se ejecuta cada vez que cambia la url (location)

  return null; //No muestra nada en pantalla
}
