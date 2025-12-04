export default function SuccessModal({ open, onClose, title, description, details }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="card-surface w-full max-w-md p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
            <span className="text-lg">✓</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {description && (
              <p className="mt-0.5 text-sm text-slate-400">{description}</p>
            )}
          </div>
        </div>

        {details && (
          <dl className="mb-5 space-y-2 text-sm text-slate-300">
            {Object.entries(details).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-medium text-slate-100 text-right break-words">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <button type="button" onClick={onClose} className="btn-primary w-full">
          Close
        </button>
      </div>
    </div>
  );
}
