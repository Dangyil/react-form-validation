export default function FormInput({
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false
}) {
  return (
    <div className="form-group">
      <div className="form-input-wrapper">
        <input
          type={type}
          name={name}
          placeholder={error ? '' : placeholder}
          value={value}
          onChange={onChange}
          autoComplete="on"
          disabled={disabled}
          className={`form-input ${error ? 'error' : ''}`}
        />
        {error && <span className="form-input-error-icon">!</span>}
      </div>
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
}
