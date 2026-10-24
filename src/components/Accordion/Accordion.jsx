import { useId, useState } from 'react'
import styles from './Accordion.module.css'

function Accordion({ items, defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)
  const baseId = useId()

  function handleToggle(index) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const headerId = `${baseId}-header-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.id} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <h3 className={styles.heading}>
              <button
                id={headerId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
              >
                <span>{item.title}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={headerId} className={styles.panel}>
              <div className={styles.panelInner}>
                <p className={styles.content}>{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
