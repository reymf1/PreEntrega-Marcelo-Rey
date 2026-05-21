import styles from "./Contacto.module.css";

export function Contacto({ img, nombre, email, puesto }) {
  return (
    <article className={styles.contactoCard}>
      <div className={styles.contactoCardImg}>
        <img src={img} alt={nombre} />
      </div>
      <div className={styles.contactoCardParrafo}>
        <h3>{nombre}</h3>
        <p>{puesto}</p>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </article>
  );
}
