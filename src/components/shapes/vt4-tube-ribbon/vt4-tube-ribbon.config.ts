export const VT4_ASSET_BASE = '/assets/shapes/vt4-tube-ribbon';

export type Vt4Index = '1' | '2' | '3' | '4';
export type Vt4StepNumber = '01' | '02' | '03' | '04';
export type Vt4MaskRole =
  | 'tubeFull'
  | 'tubeBody'
  | 'tubeFoil'
  | 'tubeRim'
  | 'tubeCap'
  | 'ribbonFace'
  | 'ribbonBevel';
export type Vt4Masks = Partial<Record<Vt4MaskRole, string>>;
export type Vt4Theme = 'colorful' | 'color' | 'silver-red';
export type Vt4IconName = 'droplet' | 'leaf' | 'sparkles' | 'shield';

export const VT4_MASK_FILES: Record<Vt4MaskRole, string> = {
  tubeFull: 'vt4-tube-full-mask.svg',
  tubeBody: 'vt4-tube-body-mask.svg',
  tubeFoil: 'vt4-tube-foil-mask.svg',
  tubeRim: 'vt4-tube-rim-mask.svg',
  tubeCap: 'vt4-tube-cap-mask.svg',
  ribbonFace: 'vt4-ribbon-face-mask.svg',
  ribbonBevel: 'vt4-ribbon-bevel-mask.svg',
};

export interface Vt4OptionItem {
  index: Vt4Index;
  number: Vt4StepNumber;
  title: string;
  subtitle: string;
  icon: Vt4IconName;
}

export const VT4_OPTIONS: Vt4OptionItem[] = [
  {
    index: '1',
    number: '01',
    title: 'LÀM SẠCH',
    subtitle: 'PHIÊN BẢN 01',
    icon: 'droplet',
  },
  {
    index: '2',
    number: '02',
    title: 'DƯỠNG ẨM',
    subtitle: 'PHIÊN BẢN 02',
    icon: 'leaf',
  },
  {
    index: '3',
    number: '03',
    title: 'PHỤC HỒI',
    subtitle: 'PHIÊN BẢN 03',
    icon: 'sparkles',
  },
  {
    index: '4',
    number: '04',
    title: 'BẢO VỆ',
    subtitle: 'PHIÊN BẢN 04',
    icon: 'shield',
  },
];
