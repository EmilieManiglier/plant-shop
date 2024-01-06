import clsx from 'clsx';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import plantIcon from 'assets/img/icons/icon-plant.png';

const Logo = ({ className = '', color = 'green' }) => {
  const { t } = useTranslation();

  let logoColor = 'text-green-500';

  if (color === 'white') {
    logoColor = 'text-green-500 lg:text-white';
  }

  return (
    <div className={clsx('flex gap-1 items-center', logoColor, className)}>
      <span className="font-cagliostro text-4xl font-bold">{t('meta.titlePart1')}</span>
      <img src={plantIcon} alt="" className="w-8 h-8 leaf-green" />
      <span className="font-cagliostro text-4xl font-bold">{t('meta.titlePart2')}</span>
    </div>
  );
};

Logo.propTypes = {
  className: string,
  color: string
};

export default Logo;
