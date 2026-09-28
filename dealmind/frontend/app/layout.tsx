import './globals.css';
import Header from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DealMind — Memory-Powered Sales Deal Intelligence Agent',
  description: 'Every conversation remembered. Every deal smarter. Sales Deal Intelligence powered by Hindsight long-term memory.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">DEALMIND</span>
              <span>— Persistent Relationship Memory Engine for Enterprise Sales</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>Hindsight Memory API Integration</span>
              <span>•</span>
              <span>Microsoft Azure / Python Stack</span>
              <span>•</span>
              <span>Hackathon Edition</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
