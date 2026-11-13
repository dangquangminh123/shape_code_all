import D8pDiamondPetals from '@/components/shapes/d8p-diamond-petals/D8pDiamondPetals';
import type { D8pTheme } from '@/components/shapes/d8p-diamond-petals/d8p-diamond-petals.config';

interface PageProps {
  searchParams?: Promise<{ theme?: string }>;
}

export default async function D8pDiamondPetalsPage({ searchParams }: PageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const theme: D8pTheme = resolved?.theme === 'spectrum' ? 'spectrum' : 'reference';
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <D8pDiamondPetals theme={theme} />
    </main>
  );
}
