export default function Input({
  id,
  label,
  error,
  required = false,
  ...props
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      <input id={id} className={`form-input ${error ? 'input-error' : ''}`} {...props} />
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
