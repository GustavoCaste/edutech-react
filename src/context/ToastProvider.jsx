import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastContext } from './ToastContext'
import ToastContainer from '../components/Toast/ToastContainer'

const MAX_VISIBLE_TOASTS = 4

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    nextId.current += 1
    const toast = { id: nextId.current, type, title, message, duration }

    setToasts((current) => [...current, toast].slice(-MAX_VISIBLE_TOASTS))
  }, [])

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
