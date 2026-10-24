import Accordion from '../../components/Accordion/Accordion'
import styles from './FaqSection.module.css'

function FaqSection({ items }) {
  return (
    <section id="duvidas" className="section" aria-labelledby="duvidas-titulo">
      <div className={`container ${styles.layout}`}>
        <div>
          <h2 id="duvidas-titulo" className="section-title">
            Dúvidas frequentes
          </h2>
          <p className="section-description">
            Não encontrou o que procurava? Fale com a equipe pelo chat da área do aluno.
          </p>
        </div>

        <Accordion items={items} defaultOpenIndex={0} />
      </div>
    </section>
  )
}

export default FaqSection
