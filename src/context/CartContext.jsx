import { useState, useContext, createContext } from "react"; //useState → para guardar y actualizar el carrito. useContext → para poder consumir el contexto desde los componentes. createContext → para crear el contexto.

export const CartContext = createContext(); //Creamos el contexto

//Custom Hook usecCart(). Es una Hook personalizada (la creo yo)
export const useCart = () => {
  const context = useContext(CartContext); //Consumo del contexto
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

//CartProvider es el proveedor del estado del carrito
export const CartProvider = ({ children }) => {
  //Estados
  const [cart, setCart] = useState([]); //Comenzamos con el carrito vacío
  const [isCartOpen, setIsCartOpen] = useState(false);

  //Funciones de productos
  const addToCart = (product, quantity) => {
    //Función que maneja el carrito
    const itemInCart = cart.find((item) => item.id === product.id); //Busca un elemento dentro del array cart que coincida con item
    if (itemInCart) {
      //Si el elemento existe

      //Recorre todo el array
      const updatedCart = cart.map(
        (item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity } //Si es el mismo copia el producto y actualiza la cantidad
            : item, //Cuando no es el mismo lo deja igual
      );
      setCart(updatedCart); //Actualiza el estado
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]); // Si no existe, a los productos viejos le agrega los nuevos
    }
  };
  //Se crea la función vaciar el carrito para llamarla cuando la necesitamos
  const clearCart = () => {
    setCart([]);
  };

  //Funciones de consulta
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }; //Recorre el array y devuelve un único valor final. En este caso, la variable acc=0 (inicialmente) y luego va sumando todas las cantidades del carrito (array)
  //    array.reduce((acumulador, elemento) => {
  //     return algo;
  //      }, valorInicial)

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  }; // Calcula el precio total de los productos del carrito

  // NUEVA FUNCIÓN: Obtener la cantidad de un item específico
  //Obtengo la cantidad de productos que tiene el carrito desde el contexto
  const getCantidadActual = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // NUEVA FUNCIÓN: Eliminar un producto del carrito
  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };
  // NUEVA FUNCIÓN: Verificar si un producto ya está en el carrito
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  //Función para incrementar y decrementar la cantidad de un producto dentro del carrito
  const incrementarCantidad = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };
  const decrementarCantidad = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  //Funciones del aside Carrito
  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        //Estados
        cart,
        isCartOpen,
        //Funciones sobre productos
        addToCart,
        clearCart,
        removeItem,
        incrementarCantidad,
        decrementarCantidad,
        //Funciones de Consulta
        getCantidadActual, // <-- Exportamos la nueva función
        getCartQuantity,
        getCartTotal,
        isInCart,
        //Funciones UI
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
