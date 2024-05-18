import clsx from 'clsx';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { logo } from 'assets/img';

const Logo = ({ className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('text-orange-500 relative', className)}>
      <div className="absolute -right-8 top-0 z-10 h-16 w-16">
        <img src={logo} alt="Logo" className="img-cover" />
      </div>
      <p className="relative z-10 flex flex-col gap-1">
        <span className="font-logo font-bold text-2xl md:text-4xl">{t('meta.titlePart1')}</span>
        <span className="font-logo font-bold text-2xl md:text-4xl">{t('meta.titlePart2')}</span>
      </p>
    </div>
  );
};

Logo.propTypes = {
  className: string
};

export default Logo;
