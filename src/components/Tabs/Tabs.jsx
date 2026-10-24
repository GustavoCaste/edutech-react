import { useId, useRef, useState } from 'react'
import styles from './Tabs.module.css'

function Tabs({ tabs, label, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const tabRefs = useRef([])
  const baseId = useId()

  function selectTab(index) {
    const nextIndex = (index + tabs.length) % tabs.length
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowRight':
        selectTab(activeIndex + 1)
        break
      case 'ArrowLeft':
        selectTab(activeIndex - 1)
        break
      case 'Home':
        selectTab(0)
        break
      case 'End':
        selectTab(tabs.length - 1)
        break
      default:
        return
    }

    event.preventDefault()
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className={styles.list} onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={styles.tab}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          tabIndex={0}
          hidden={index !== activeIndex}
          className={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}

export default Tabs
