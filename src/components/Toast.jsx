export default function ToastContainer({ toasts }) {
  const icons = { success: '✓', error: '✕', info: '·' }
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span style={{fontFamily:'var(--mono)'}}>{icons[t.type] || '·'}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
