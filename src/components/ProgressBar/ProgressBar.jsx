import { useId } from 'react'
import styles from './ProgressBar.module.css'

function ProgressBar({ value, label, showValue = true }) {
  const labelId = useId()
  const percent = Math.round(Math.min(100, Math.max(0, value)))
  const isComplete = percent === 100

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span id={labelId} className={styles.label}>
          {label}
        </span>
        {showValue && <span className={styles.value}>{percent}%</span>}
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={`${styles.fill} ${isComplete ? styles.complete : ''}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
