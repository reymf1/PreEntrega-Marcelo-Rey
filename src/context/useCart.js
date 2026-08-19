import { useContext } from "react";
import { CartContext } from "./CartContext";

//Custom Hook usecCart(). Es una Hook personalizada (la creo yo)
export const useCart = () => {
  const context = useContext(CartContext); //Consumo del contexto
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
