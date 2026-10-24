import Toast from './Toast'
import styles from './Toast.module.css'

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export default ToastContainer
