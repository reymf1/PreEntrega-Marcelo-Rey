import styles from "./Info.module.css";

function Info() {
  return (
    <div className={styles.pieInfo}>
      <h4>Información de contacto</h4>
      <div className={styles.pieInfoWp}>
        <img src="/images/whatsapp-negro-1.png" alt="Icono Whatsapp" />
        <p>+54 911 38013164 </p>
      </div>
      <div className={styles.pieInfoCorreo}>
        <img
          src="/images/correo-electronico-1.png"
          alt="Icono Correo Electrónico"
        />
        <div className={styles.pieInfoCorreo1}>
          <a href="mailto:vaninapvitale@gmail.com">vaninapvitale@gmail.com</a>
          <a href="mailto:afumarco@yahoo.com">afumarco@yahoo.com</a>
        </div>
      </div>
      <div className={styles.pieInfoDireccion}>
        <img src="/images/direccion-1.png" alt="Icono Dirección" />
        <p>Argerich 1576, Villa del Parque</p>
      </div>
    </div>
  );
}
export default Info;
