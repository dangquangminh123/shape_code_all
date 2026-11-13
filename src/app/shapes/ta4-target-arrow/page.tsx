import Ta4TargetArrow from '@/components/shapes/ta4-target-arrow/Ta4TargetArrow';
import type { Ta4Theme } from '@/components/shapes/ta4-target-arrow/ta4-target-arrow.config';

interface PageProps {
  searchParams?: Promise<{ theme?: string }>;
}

export default async function Ta4TargetArrowPage({ searchParams }: PageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const theme: Ta4Theme = resolved?.theme === 'modern' ? 'modern' : 'reference';
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Ta4TargetArrow theme={theme} />
    </main>
  );
}
