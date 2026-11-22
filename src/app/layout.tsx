import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bangla & English AI Voice Generator | স্টুডিও কোয়ালিটি ভয়েস",
  description: "Convert Bangla, English, and mixed Bangla-English text into natural studio-quality speech with instant playback and MP3 download.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
