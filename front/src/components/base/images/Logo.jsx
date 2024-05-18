import clsx from 'clsx';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

const Logo = ({ className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('flex flex-col gap-1 text-orange-500', className)}>
      <span className="font-logo font-bold text-2xl md:text-4xl">{t('meta.titlePart1')}</span>
      <span className="font-logo font-bold text-2xl md:text-4xl">{t('meta.titlePart2')}</span>
    </div>
  );
};

Logo.propTypes = {
  className: string
};

export default Logo;
