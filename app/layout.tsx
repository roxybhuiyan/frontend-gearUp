import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "GearUp | Find your next adventure", description: "Sports and outdoor equipment rentals" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
