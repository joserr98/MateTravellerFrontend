import React from 'react'
import { Toast } from 'react-bootstrap'
import './ErrorToast.css'

export const ErrorToast = ({
    showToast,
    errorMessage,
    setShowToast
}) => {
  return (
    <div className="toast-container">
    <Toast
      bg={"danger"}
      show={showToast}
      delay={1350}
      autohide
      className="toasted"
      style={{
        position: "fixed",
        zIndex: 999,
        top: 0,
      }}
      onClose={() => setShowToast(false)}
    >
      <Toast.Body>{errorMessage}</Toast.Body>
    </Toast>
  </div>
  )
}
