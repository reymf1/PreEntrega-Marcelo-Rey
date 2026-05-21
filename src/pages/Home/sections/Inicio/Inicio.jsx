import styles from "./Inicio.module.css"

export function Inicio() {
  return(
    <div className={styles.header__estrellas}>
      <div className={styles.header__titulo}>
        <h1>Sanándome Sanándote</h1>
        <h2>CENTRO PARA LA VIDA ESPIRITUAL</h2>
      </div>
      <div className={styles.header__simbolos}>
        <div className={styles.header__simbolos1}>
          <img src="/images/nube-1.png" alt=""/>
        </div>
        <div className={styles.header__simbolos1}>
          <img src="/images/posicion-de-yoga-1.png" alt=""/>
        </div>
        <div className={styles.header__simbolos1}>
          <img src="/images/holistico-1.png" alt=""/>
        </div>
        <div className={styles.header__simbolos1}>
          <img src="/images/espiritualidad-1.png" alt=""/>
        </div>
      </div>
    </div>
  )
}