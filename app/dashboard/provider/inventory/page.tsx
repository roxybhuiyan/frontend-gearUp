'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, type Gear } from '@/lib/data';

export default function InventoryPage() {
  const [gear, setGear] = useState<Gear[]>([]);
  const [message, setMessage] = useState('Loading your inventory…');
  useEffect(() => {
    const token = localStorage.getItem('gearup_token'); const saved = localStorage.getItem('gearup_user');
    if (!token || !saved) { window.location.assign('/auth/login'); return; }
    const user = JSON.parse(saved); const savedRole = typeof user.role === 'string' ? user.role.toLowerCase() : '';
    if (!['customer', 'provider', 'admin'].includes(savedRole)) { localStorage.removeItem('gearup_token'); localStorage.removeItem('gearup_user'); window.location.assign('/auth/login'); return; }
    if (savedRole !== 'provider') { window.location.assign(`/dashboard/${savedRole}`); return; }
    api<Gear[]>('/gear?limit=100').then(items => { const mine = items.filter(item => item.provider?.id === user.id); setGear(mine); setMessage(mine.length ? '' : 'You have not listed any gear yet.'); }).catch(error => setMessage(error instanceof Error ? error.message : 'Could not load your inventory.'));
  }, []);
  return <main className="shell" style={{ paddingTop: 40, paddingBottom: 80 }}><Link href="/dashboard/provider" className="muted">← Provider dashboard</Link><div className="section-head" style={{ marginTop: 20 }}><div><div className="eyebrow" style={{ color: '#1d5a45' }}>Provider workspace</div><h1 style={{ fontSize: 46, letterSpacing: -2 }}>My inventory.</h1></div><Link href="/dashboard/provider/gear/new" className="btn">Add new gear →</Link></div><div className="table">{gear.length ? <table><thead><tr><th>Gear</th><th>Brand</th><th>Daily price</th><th>Stock</th><th>Availability</th></tr></thead><tbody>{gear.map(item => <tr key={item.id}><td><b>{item.name}</b></td><td>{item.brand}</td><td>${item.pricePerDay}</td><td>{item.stock}</td><td><span className="badge PICKED_UP">{item.availability ? 'Available' : 'Hidden'}</span></td></tr>)}</tbody></table> : <div className="empty">{message}</div>}</div></main>;
}
