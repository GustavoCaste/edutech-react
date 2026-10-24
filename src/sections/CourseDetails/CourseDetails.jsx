import Tabs from '../../components/Tabs/Tabs'
import styles from './CourseDetails.module.css'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

function CourseDetails({ course, instructor, isEnrolled, onEnroll }) {
  const tabs = [
    {
      id: 'visao-geral',
      label: 'Visão geral',
      content: (
        <>
          <p className={styles.text}>{course.summary}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Carga horária</dt>
              <dd>{course.hours} horas</dd>
            </div>
            <div>
              <dt>Nível</dt>
              <dd>{course.level}</dd>
            </div>
            <div>
              <dt>Investimento</dt>
              <dd>{currency.format(course.price)}</dd>
            </div>
            <div>
              <dt>Avaliação</dt>
              <dd>{course.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} de 5</dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      id: 'conteudo',
      label: 'Conteúdo',
      content: (
        <ol className={styles.modules}>
          {course.modules.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ol>
      ),
    },
    {
      id: 'instrutor',
      label: 'Instrutor',
      content: (
        <div className={styles.instructor}>
          <span className={styles.avatar} aria-hidden="true">
            {getInitials(instructor.name)}
          </span>
          <div>
            <p className={styles.instructorName}>{instructor.name}</p>
            <p className={styles.instructorRole}>{instructor.role}</p>
            <p className={styles.text}>{instructor.bio}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'pre-requisitos',
      label: 'Pré-requisitos',
      content: (
        <ul className={styles.requirements}>
          {course.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <section id="detalhes" className="surface" aria-labelledby="detalhes-titulo">
      <h2 className={styles.label}>Detalhes do curso</h2>
      <div className={styles.header}>
        <h3 id="detalhes-titulo" className={styles.title} tabIndex={-1}>
          {course.title}
        </h3>
        <button
          type="button"
          className={`btn ${isEnrolled ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => onEnroll(course)}
        >
          {isEnrolled ? 'Matriculado' : 'Matricular-se'}
        </button>
      </div>

      <Tabs tabs={tabs} label="Informações do curso" />
    </section>
  )
}

export default CourseDetails
