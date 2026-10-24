import styles from './CourseItem.module.css'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function CourseItem({ course, isSelected, isEnrolled, onViewDetails, onEnroll }) {
  return (
    <li className={`${styles.item} ${isSelected ? styles.selected : ''}`}>
      <div>
        <h3 className={styles.title}>
          <span>{course.title}</span>
        </h3>
        <p className={styles.meta}>
          <span className={styles.tag}>{course.category}</span>
          <span>{course.level}</span>
          <span>{course.hours} horas</span>
          <span className={styles.rating}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 1l1.8 3.8 4.2.5-3.1 2.9.8 4.1L7 10.3l-3.7 2 .8-4.1L1 5.3l4.2-.5z" />
            </svg>
            <span className="visually-hidden">Avaliação</span>
            {course.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
          </span>
        </p>
      </div>

      <div className={styles.footer}>
        <p className={styles.price}>{currency.format(course.price)}</p>
        <div className={styles.actions}>
          <button type="button" className="btn btn-ghost" onClick={() => onViewDetails(course.id)}>
            Detalhes<span className="visually-hidden"> de {course.title}</span>
          </button>
          <button
            type="button"
            className={`btn ${isEnrolled ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => onEnroll(course)}
          >
            {isEnrolled ? 'Matriculado' : 'Matricular-se'}
            <span className="visually-hidden"> em {course.title}</span>
          </button>
        </div>
      </div>
    </li>
  )
}

export default CourseItem
