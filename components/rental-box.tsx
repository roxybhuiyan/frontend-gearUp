'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/data';

export function RentalBox({ gearId }: { gearId: string }) {
 const [start, setStart] = useState(''); const [end, setEnd] = useState(''); const [message, setMessage] = useState(''); const [loading, setLoading] = useState(false); const router = useRouter(); const today = new Date().toISOString().slice(0, 10);
 async function rent() { const token = localStorage.getItem('gearup_token'); const saved = localStorage.getItem('gearup_user'); if (!token || !saved) { router.push(`/auth/login?next=/gear/${gearId}`); return; } const user = JSON.parse(saved); if (user.role !== 'CUSTOMER') { setMessage('Only customer accounts can place rental orders.'); return; } if (!start || !end || end <= start) { setMessage('Choose a valid start and end date.'); return; } setLoading(true); setMessage(''); try { await api('/rentals', { method: 'POST', body: JSON.stringify({ gearId, rentalStartDate: new Date(start).toISOString(), rentalEndDate: new Date(end).toISOString(), quantity: 1 }) }, token); router.push('/dashboard/customer'); } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not place your order.'); } finally { setLoading(false); } }
 return <div className="rent-box"><b>Choose your rental dates</b><div className="fields"><input aria-label="Rental start date" min={today} type="date" value={start} onChange={e => setStart(e.target.value)}/><input aria-label="Rental end date" min={start || today} type="date" value={end} onChange={e => setEnd(e.target.value)}/></div>{message && <p className="error">{message}</p>}<button type="button" onClick={rent} disabled={loading} className="btn" style={{width:'100%'}}>{loading ? 'Placing order…' : 'Rent this gear →'}</button><p className="muted" style={{fontSize:12,textAlign:'center'}}>Your booking is confirmed immediately in your dashboard.</p></div>;
}
