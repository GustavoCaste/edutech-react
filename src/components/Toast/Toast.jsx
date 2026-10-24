import { useEffect } from 'react'
import styles from './Toast.module.css'

const DEFAULT_TITLES = {
  success: 'Tudo certo',
  error: 'Algo deu errado',
  info: 'Aviso',
}

const ICONS = {
  success: <path d="M5 10.5l3.5 3.5L15 7" />,
  error: <path d="M7 7l6 6M13 7l-6 6" />,
  info: <path d="M10 9v5M10 6.5v.01" />,
}

function Toast({ id, type, title, message, duration, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onDismiss])

  return (
    <div className={`${styles.toast} ${styles[type]}`} role={type === 'error' ? 'alert' : 'status'}>
      <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="9" />
        {ICONS[type]}
      </svg>

      <div>
        <p className={styles.title}>{title ?? DEFAULT_TITLES[type]}</p>
        <p className={styles.message}>{message}</p>
      </div>

      <button type="button" className={styles.close} onClick={() => onDismiss(id)} aria-label="Fechar notificação">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <span className={styles.timer} style={{ animationDuration: `${duration}ms` }} aria-hidden="true" />
    </div>
  )
}

export default Toast
