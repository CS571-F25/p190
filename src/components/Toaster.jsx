import { useState, createContext, useContext, useCallback } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastCtx = createContext(() => {})

export function useToaster(){ return useContext(ToastCtx) }

export default function Toaster({ children }) {
  const [toasts, setToasts] = useState([])

  const push = useCallback((msg, bg='dark') => {
    const id = crypto.randomUUID()
    setToasts(t => [...t, { id, msg, bg }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2200)
  }, [])

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <ToastContainer position="top-center" className="p-3">
        {toasts.map(t => (
          <Toast key={t.id} bg={t.bg} show>
            <Toast.Body className="text-white">{t.msg}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastCtx.Provider>
  )
}
