export default function Select({
  id,
  label,
  error,
  required = false,
  children,
  ...props
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      <select id={id} className={`form-input ${error ? 'input-error' : ''}`} {...props}>
        {children}
      </select>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
