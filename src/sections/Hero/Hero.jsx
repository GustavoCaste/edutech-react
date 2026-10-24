import styles from './Hero.module.css'

function Hero({ courseCount }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-titulo">
      <div className="container">
        <div className={styles.page}>
          <h1 id="hero-titulo" className={styles.title}>
            Cursos de tecnologia que terminam em projeto, não em prova.
          </h1>
          <p className={styles.lead}>
            Escolha entre {courseCount} cursos de front-end, back-end, dados, mobile e DevOps. Todos têm certificado aceito
            como atividade complementar.
          </p>
          <div className={styles.actions}>
            <a href="#catalogo" className="btn btn-primary">
              Ver cursos
            </a>
            <a href="#certificado" className="btn btn-secondary">
              Validar horas complementares
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
