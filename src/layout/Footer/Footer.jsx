import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>© {new Date().getFullYear()} EduTech</p>
        <p>Projeto fictício desenvolvido para fins acadêmicos.</p>
      </div>
    </footer>
  )
}

export default Footer
