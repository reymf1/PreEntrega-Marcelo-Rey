import styles from "./Footer.module.css";
//import { EquipoContainer } from "../../Equipo/EquipoContainer/EquipoContainer";
import Redes from "../../Redes/Redes";
import Info from "./Info/Info";

function Footer() {
  return (
    <footer>
      <div className={styles.pie}>
        <div>
          <Info />
        </div>
        {/*<div className={styles.pieEquipo}>
          <EquipoContainer />
        </div>*/}
        <div>
          <Redes />
        </div>
      </div>

      <div className={styles.pie1}>
        <p>Copyright &copy; 2026 | Aviso legal</p>
        <div className={styles.pie11}>
          <p>Sitio web creado por</p>
          <img src="/images/MR-1.png" alt="Logo Marcelo Rey" />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
