export default function ErrorMessage({ message, onRetry }) {
  if (!message) {
    return null;
  }

  return (
    <div className="alert alert-error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="link-button" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}
