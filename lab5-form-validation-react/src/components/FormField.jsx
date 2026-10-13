// Reusable controlled input with an error badge
export default function FormField({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="badge" role="alert">⚠ {error}</span>}
    </div>
  );
}
