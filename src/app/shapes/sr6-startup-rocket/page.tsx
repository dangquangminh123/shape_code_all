import type { Metadata } from 'next';
import Sr6StartupRocket from '@/components/shapes/sr6-startup-rocket/Sr6StartupRocket';

export const metadata: Metadata = {
  title: 'SR6 — Startup Rocket Infographic',
  description: 'Infographic tên lửa 6 tầng SVG kết hợp lộ trình khởi nghiệp 6 giai đoạn và icon Font Awesome 6.',
};

export default async function Sr6StartupRocketPage({
  searchParams,
}: {
  searchParams?: Promise<{ theme?: string; instances?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const theme = params.theme === 'silver-red' ? 'silver-red' : 'reference';
  return (
    <>
      <Sr6StartupRocket theme={theme} />
      {params.instances === '2' && <Sr6StartupRocket theme={theme} />}
    </>
  );
}
