import styles from './Header.module.css'

const NAV_LINKS = [
  { href: '#catalogo', label: 'Cursos' },
  { href: '#detalhes', label: 'Detalhes' },
  { href: '#certificado', label: 'Horas complementares' },
  { href: '#duvidas', label: 'Dúvidas' },
]

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
            <rect x="5" y="3" width="22" height="26" rx="3" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
            <path d="M11 3v26" stroke="var(--color-margin)" strokeWidth="2" />
            <path d="M14 11h9M14 16h9M14 21h6" stroke="var(--color-pen)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          EduTech
        </a>

        <nav aria-label="Navegação principal" className={styles.nav}>
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
