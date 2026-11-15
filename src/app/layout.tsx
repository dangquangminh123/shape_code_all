import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import '../styles/shape-layer-hotfix.css';

export const metadata: Metadata = {
  title: 'Shape Showcase – Son dưỡng môi & quà tặng',
  description: 'Bộ sưu tập giao diện shape tương tác: son dưỡng làm đẹp đôi môi, quà tặng ý nghĩa và các mẫu infographic.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <main className="app-main">{children}</main>
        <Script src="/shape-auto-animations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

