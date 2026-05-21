import styles from "./Redes.module.css";

function Redes() {
  return (
    <div className={styles.pieRedesLogo}>
      <div className={styles.pieRedes}>
        <h4>Seguinos en las redes!</h4>
        <div className={styles.pieRedesIcon}>
          <a
            href="https://www.facebook.com/sanandomesanandote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/facebook.png" alt="Icono Facebook" />
          </a>
          <a
            href="https://www.instagram.com/sanandomesanandote/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/instagram.png" alt="Icono Instagram" />
          </a>
          <a
            href="https://www.tiktok.com/@sanadomesanandote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/tik-tok.png" alt="Icono TikTok" />
          </a>
          <a
            href="https://wa.me/+5491138013164"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/whatsapp.png" alt="Icono Whatsapp" />
          </a>
        </div>
      </div>
      <div className={styles.pieLogo}>
        <a href="#inicio">
          <img src="/images/LogoYoga3.png" alt="Logo Yoga" />
        </a>
      </div>
    </div>
  );
}
export default Redes;
