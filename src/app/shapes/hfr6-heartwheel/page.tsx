import type { Metadata } from 'next';
import Hfr6HeartwheelSection from '@/components/shapes/hfr6-heartwheel/Hfr6HeartwheelSection';

export const metadata: Metadata = {
  title: 'HFR6 — Heartwheel',
  description: 'Vòng tròn sáu cánh gradient với trái tim trắng và biểu tượng Font Awesome.',
};

export default async function Hfr6HeartwheelPage({ searchParams }: { searchParams: Promise<{ theme?: string; instances?: string }> }) {
  const params = await searchParams;
  const theme = params.theme === 'silver-red' ? 'silver-red' : 'color';
  return (
    <>
      <Hfr6HeartwheelSection theme={theme} />
      {params.instances === '2' && <Hfr6HeartwheelSection theme={theme} />}
    </>
  );
}
