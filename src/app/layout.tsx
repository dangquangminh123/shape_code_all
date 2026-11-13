import type { Metadata } from 'next';
import './globals.css';
import '../styles/shape-layer-hotfix.css';

export const metadata: Metadata = {
  title: 'Khởi tạo nền tảng – Thực hành & phát triển',
  description: 'Xây dựng nền tảng vững chắc, thực hành và phát triển kỹ năng.',
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
      </body>
    </html>
  );
}
