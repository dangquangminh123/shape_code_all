import { FaDatabase, FaGear, FaHeadSideVirus, FaRegLightbulb } from 'react-icons/fa6';
import { TbTargetArrow } from 'react-icons/tb';
import type { Hb4IconName } from './hb4-hanger-banners.config';

/** The four reference pictograms, assembled from the repository's existing icon library. */
export default function Hb4StepIcon({ name }: { name: Hb4IconName }) {
  if (name === 'idea') {
    return (
      <span className="hb4-pictogram hb4-pictogram--idea">
        <FaHeadSideVirus className="hb4-idea-head" />
        <span className="hb4-idea-bulb"><FaRegLightbulb /></span>
      </span>
    );
  }

  if (name === 'gears') {
    return (
      <span className="hb4-pictogram hb4-pictogram--gears">
        <FaGear className="hb4-gear hb4-gear--large" />
        <FaGear className="hb4-gear hb4-gear--small" />
      </span>
    );
  }

  if (name === 'database') return <FaDatabase className="hb4-pictogram hb4-pictogram--database" />;

  return <TbTargetArrow className="hb4-pictogram hb4-pictogram--target" strokeWidth={2.5} />;
}
