'use client';
export default function ErrorPage({reset}:{reset:()=>void}) { return <main className="shell section error-state"><h1>Something went off trail.</h1><p className="muted">We could not load this page. Please try again.</p><button className="btn" onClick={reset}>Try again</button></main>; }
