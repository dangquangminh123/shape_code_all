import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'UI Shape Library - Multi-Shape React/Next.js Source',
  description:
    'Hệ thống giao diện UI Shape chuyên sâu: Tách lớp Stroke/Fill/Content, SVG Masking, Drop-Shadow bám biên và tương tác liên kết.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="app-header-inner">
              <Link href="/" className="app-brand">
                <span className="app-brand-badge">UI SHAPE LAB</span>
                <span>Code All Shape – Hệ thống Giao diện Shape</span>
              </Link>
              <nav className="app-nav">
                <Link href="/" className="app-nav-link">
                  Trang tổng hợp &amp; Hướng dẫn Folder SVG
                </Link>
                <Link href="/shapes/step-stack-demo" className="app-nav-link">
                  Xem riêng Mẫu 01: Step Stack 3 Tầng
                </Link>
              </nav>
            </div>
          </header>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
