import StepStackDemo from '@/components/shapes/step-stack-demo/StepStackDemo';
import Ar5ArrowRibbonSection from '@/components/shapes/ar5-arrow-ribbon/Ar5ArrowRibbonSection';
import Hfr6HeartwheelSection from '@/components/shapes/hfr6-heartwheel/Hfr6HeartwheelSection';
import Vt4TubeRibbonSection from '@/components/shapes/vt4-tube-ribbon/Vt4TubeRibbonSection';
import Ih8HeartElementsSection from '@/components/shapes/ih8-heart-elements/Ih8HeartElementsSection';
import Sr6StartupRocket from '@/components/shapes/sr6-startup-rocket/Sr6StartupRocket';
import St7SqueezeTubes from '@/components/shapes/st7-squeeze-tubes/St7SqueezeTubes';
import S8fStarflow from '@/components/shapes/s8f-starflow/S8fStarflow';
import D8pDiamondPetals from '@/components/shapes/d8p-diamond-petals/D8pDiamondPetals';
import Ta4TargetArrow from '@/components/shapes/ta4-target-arrow/Ta4TargetArrow';
import Wh9HeartRing from '@/components/shapes/wh9-heart-ring/Wh9HeartRing';
import { Gb5GiftBoxes } from '@/components/shapes/gb5-gift-boxes';
import Pn10PencilRibbon from '@/components/shapes/pn10-pencil-ribbon/Pn10PencilRibbon';
import Cb5Clipboard from '@/components/shapes/cb5-clipboard/Cb5Clipboard';
import Tc5TrophyCups from '@/components/shapes/tc5-trophy-cups/Tc5TrophyCups';
import Pb4PumpBottle from '@/components/shapes/pb4-pump-bottle/Pb4PumpBottle';
import Lm6LevelsMarks from '@/components/shapes/lm6-levels-marks/Lm6LevelsMarks';
import Ls4LadderSteps from '@/components/shapes/ls4-ladder-steps/Ls4LadderSteps';
import Rt6ReverseTimeline from '@/components/shapes/rt6-reverse-timeline/Rt6ReverseTimeline';
import Sq5SqertModel from '@/components/shapes/sq5-sqert-model/Sq5SqertModel';
import Ob3OptionBanners from '@/components/shapes/ob3-option-banners/Ob3OptionBanners';

export default function HomePage() {
  return (
    <>
      <StepStackDemo />
      <Ar5ArrowRibbonSection />
      <Hfr6HeartwheelSection />
      <Vt4TubeRibbonSection />
      <Ih8HeartElementsSection />
      <Sr6StartupRocket />
      <St7SqueezeTubes />
      <S8fStarflow theme="reference" />
      <D8pDiamondPetals theme="reference" />
      <Ta4TargetArrow theme="reference" />
      <Wh9HeartRing theme="reference" />
      <Gb5GiftBoxes />
      <Pn10PencilRibbon theme="reference" />
      <Cb5Clipboard />
      <Tc5TrophyCups />
      <Pb4PumpBottle />
      <Lm6LevelsMarks />
      <Ls4LadderSteps />
      <Rt6ReverseTimeline />
      <Sq5SqertModel />
      <Ob3OptionBanners />
    </>
  );
}
