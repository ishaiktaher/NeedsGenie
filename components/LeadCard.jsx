export default function LeadCard({ lead, onUnlock }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <p className="font-semibold text-lg">{lead.category}</p>
      <p className="text-gray-700">{lead.city} • {lead.locality}</p>
      <p className="text-gray-500 text-sm">{lead.budget}</p>
      <button onClick={onUnlock} className="mt-2 bg-blue-600 text-white py-2 rounded-lg">
        Unlock Lead
      </button>
    </div>
  );
}