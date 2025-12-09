

import { useState, createContext, useContext, useCallback } from 'react'
import { Toast, ToastContainer, Overlay } from 'react-bootstrap'

const ToastCtx = createContext(() => {})

export function useToaster() {
  return useContext(ToastCtx)
}

export default function Toaster({ children }) {
  const [globalToasts, setGlobalToasts] = useState([])   
  const [anchoredToasts, setAnchoredToasts] = useState([]) 

  const push = useCallback((msg, bg = 'dark', anchorEl = null) => {
    const id = crypto.randomUUID()
    if (anchorEl) {
      setAnchoredToasts(t => [...t, { id, msg, bg, anchorEl }])
      setTimeout(() => setAnchoredToasts(t => t.filter(x => x.id !== id)), 2000)
    } else {
      setGlobalToasts(t => [...t, { id, msg, bg }])
      setTimeout(() => setGlobalToasts(t => t.filter(x => x.id !== id)), 2000)
    }
  }, [])

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <ToastContainer position="bottom-center" className="p-3" style={{ zIndex: 2000 }}>
        {globalToasts.map(t => (
          <Toast key={t.id} bg={t.bg} show>
            <Toast.Body className="text-white">{t.msg}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>

     
      {anchoredToasts.map(t => (
        <Overlay
          key={t.id}
          target={t.anchorEl}
          show
          placement="top"
          transition={false}
        >
          {({ ...props }) => (
            <div {...props} style={{ ...props.style, zIndex: 2000 }}>
              <Toast bg={t.bg} show>
                <Toast.Body className="text-white">{t.msg}</Toast.Body>
              </Toast>
            </div>
          )}
        </Overlay>
      ))}
    </ToastCtx.Provider>
  )
}