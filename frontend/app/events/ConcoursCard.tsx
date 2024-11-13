export function ConcoursCard({ concours, onParticipate }) {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">{concours.label}</h2>
            <p className="mb-2">Date: {new Date(concours.date).toLocaleDateString()}</p>
            <p className="mb-2">Adresse: {concours.adresse}</p>
            <p className="mb-2">Statut: {concours.active ? "Actif" : "Inactif"}</p>
            <p className="mb-4">{concours.description}</p>
            <button
                onClick={onParticipate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!concours.active || new Date(concours.date) <= new Date()}
            >
                Participer
            </button>
        </div>
    );
}