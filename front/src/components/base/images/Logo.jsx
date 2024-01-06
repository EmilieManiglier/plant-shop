import clsx from 'clsx';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import plantIcon from 'assets/img/icons/icon-plant.png';

const Logo = ({ className = '' }) => {
  const { t } = useTranslation();

  let logoColor = 'text-green-500';

  return (
    <div className={clsx('flex gap-1 items-center', logoColor, className)}>
      <h1 className="font-cagliostro text-4xl font-bold">{t('meta.titlePart1')}</h1>
      <img src={plantIcon} alt="" className="w-8 h-8" />
      <h1 className="font-cagliostro text-4xl font-bold">{t('meta.titlePart2')}</h1>
    </div>
  );
};

Logo.propTypes = {
  className: string
};

export default Logo;
