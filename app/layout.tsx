import type { Metadata } from "next";
import "./globals.css";
import "./extra.css";
export const metadata: Metadata = { title: "GearUp | Find your next adventure", description: "Sports and outdoor equipment rentals" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>; }
