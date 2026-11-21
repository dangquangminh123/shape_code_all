import type { Metadata } from 'next';
import Ss5StudySkills from '@/components/shapes/ss5-study-skills/Ss5StudySkills';

export const metadata: Metadata = {
  title: 'SS5 — Study Skills Infographic | Code All Shape',
  description:
    'Năm khối sách kỹ năng học tập xếp chồng so le với dải ruy-băng bookmark từ bộ SVG gốc 6_tick.',
};

export default function Ss5Page() {
  return <Ss5StudySkills />;
}
