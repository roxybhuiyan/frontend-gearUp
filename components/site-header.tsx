'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
type SessionUser = { fullName?: string; role?: 'CUSTOMER' | 'PROVIDER' | 'ADMIN' };
export function SiteHeader() {
  const [user, setUser] = useState<SessionUser | null>(null);
  useEffect(() => { try { const saved = localStorage.getItem('gearup_user'); const token = localStorage.getItem('gearup_token'); if (saved && token) setUser(JSON.parse(saved)); } catch { localStorage.removeItem('gearup_user'); localStorage.removeItem('gearup_token'); } }, []);
  const dashboard = `/dashboard/${user?.role?.toLowerCase() || 'customer'}`;
  function logout() { localStorage.removeItem('gearup_user'); localStorage.removeItem('gearup_token'); setUser(null); }
  return <header className="shell nav"><Link href="/" className="brand">gear<i>up</i>.</Link><nav className="navlinks"><Link href="/gear">Browse gear</Link><a href="#how-it-works">How it works</a><a href="#why">Why GearUp</a></nav><div className="nav-actions">{user ? <><Link href={dashboard} className="btn light">{user.fullName?.split(' ')[0] || 'My'} dashboard</Link><button type="button" onClick={logout} className="btn">Log out</button></> : <><Link href="/auth/login" className="btn light">Log in</Link><Link href="/auth/register" className="btn">Get started</Link></>}</div></header>;
}
