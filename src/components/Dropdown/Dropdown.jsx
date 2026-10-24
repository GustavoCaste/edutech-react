import { useEffect, useId, useRef, useState } from 'react'
import styles from './Dropdown.module.css'

function Dropdown({ label, options, value, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const baseId = useId()

  const labelId = `${baseId}-label`
  const triggerId = `${baseId}-trigger`
  const menuId = `${baseId}-menu`
  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const selectedIndex = options.findIndex((option) => option.value === value)
    optionRefs.current[Math.max(selectedIndex, 0)]?.focus()
  }, [isOpen, options, value])

  function closeMenu() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  function handleSelect(option) {
    onSelect(option)
    closeMenu()
  }

  function focusOption(index) {
    const lastIndex = options.length - 1
    const nextIndex = index > lastIndex ? 0 : index < 0 ? lastIndex : index
    optionRefs.current[nextIndex]?.focus()
  }

  function handleMenuKeyDown(event) {
    const currentIndex = optionRefs.current.indexOf(document.activeElement)

    switch (event.key) {
      case 'ArrowDown':
        focusOption(currentIndex + 1)
        break
      case 'ArrowUp':
        focusOption(currentIndex - 1)
        break
      case 'Home':
        focusOption(0)
        break
      case 'End':
        focusOption(options.length - 1)
        break
      case 'Escape':
        closeMenu()
        break
      case 'Tab':
        setIsOpen(false)
        return
      default:
        return
    }

    event.preventDefault()
  }

  function handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <div className={styles.dropdown} ref={containerRef}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-labelledby={`${labelId} ${triggerId}`}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{selectedOption?.label ?? 'Selecione'}</span>
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen && (
        <ul id={menuId} role="menu" aria-labelledby={labelId} className={styles.menu} onKeyDown={handleMenuKeyDown}>
          {options.map((option, index) => {
            const isSelected = option.value === value

            return (
              <li key={option.value} role="none">
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  className={styles.option}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                  {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
