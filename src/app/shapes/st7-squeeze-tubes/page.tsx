import St7SqueezeTubes from '@/components/shapes/st7-squeeze-tubes/St7SqueezeTubes';

export default async function St7SqueezeTubesPage({
  searchParams,
}: {
  searchParams?: Promise<{ theme?: string; instances?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const theme = params.theme === 'silver-red' ? 'silver-red' : 'reference';
  return (
    <>
      <St7SqueezeTubes theme={theme} />
      {params.instances === '2' && <St7SqueezeTubes theme={theme} />}
    </>
  );
}

