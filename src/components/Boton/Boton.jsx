import styles from "./Boton.module.css";

export function Boton({
  type = "button",
  variant = "consultar",
  onClick,
  descripcion,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={styles[variant]}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
