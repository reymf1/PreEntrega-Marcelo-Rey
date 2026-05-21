import styles from "./HeaderTitulo.module.css";

function HeaderTitulo({ id, tituloTag: TituloTag="h1", subtituloTag: SubTituloTag="h2",titulo, subtitulo, variant }) {
  return (
    <header className={styles[variant]}>
      <TituloTag>{titulo}</TituloTag>
      <SubTituloTag>{subtitulo}</SubTituloTag>
    </header>
  );
}
export default HeaderTitulo;
