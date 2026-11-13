/** ST7 / Sample 07 / Independent data layer; React Icons, never emoji. */
export type St7Theme = 'reference' | 'silver-red';
export type St7Row = {
  number: '01' | '02' | '03';
  direction: 'right' | 'left';
  eyebrow: string;
  title: string;
  suffix: string;
  description: string;
};

export const ST7_ROWS: readonly St7Row[] = [
  { number: '01', direction: 'right', eyebrow: 'YOUR', title: 'TEXT', suffix: 'HERE', description: 'Ý tưởng và thử nghiệm ban đầu.' },
  { number: '02', direction: 'left', eyebrow: 'YOUR', title: 'TEXT', suffix: 'HERE', description: 'Hoàn thiện chất lượng và trải nghiệm.' },
  { number: '03', direction: 'right', eyebrow: 'YOUR', title: 'TEXT', suffix: 'HERE', description: 'Tăng trưởng bền vững, triển khai linh hoạt.' },
];
