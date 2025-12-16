export default function UnlockModal({ show, lead, onClose, onConfirm }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-3">Unlock Lead?</h3>
        <p className="text-gray-700 mb-4">Unlock this lead for ₹20 and reveal contact details.</p>
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Unlock</button>
        </div>
      </div>
    </div>
  );
}