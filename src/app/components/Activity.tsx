import { read, RecordItem } from '../lib/storage';
import { Button } from './ui/button';
export function Activity({ kind, onBack }: { kind: 'pickups' | 'reports'; onBack: () => void }) {
 const items = read<RecordItem[]>(kind, []);
 return <main className="min-h-screen bg-[#F8FFF9] p-6 text-[#1B5E20]"><Button onClick={onBack}>Back to dashboard</Button><h2 className="my-6">My {kind}</h2><p className="mb-4">Saved on this device. These records have not been sent to a collection service.</p>{items.length === 0 && <p>No {kind} saved yet.</p>}{items.map(item => <article key={item.id} className="bg-white border rounded-2xl p-5 mb-4"><h3>{item.wasteType || item.issueType}</h3><p>{item.address || item.location}</p><p>{item.date} {item.time}</p><p>{item.description || item.notes}</p><p>{item.ticketId}</p><p>{item.status}</p><small>{new Date(item.createdAt).toLocaleString()}</small>{item.photos?.map((photo: string, i: number) => <img key={i} src={photo} alt="Report attachment" className="w-24 rounded-xl mt-2" />)}</article>)}</main>;
}
