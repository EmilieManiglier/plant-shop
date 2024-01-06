import { useTranslation } from 'react-i18next';

import { Logo } from 'components';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-700 text-white text-center px-4 py-12">
      <Logo color="white" className="justify-center mb-12" />

      <div className="border-t border-white pt-12">
        <p>{t('navigation.copyright', { year })}</p>
      </div>
    </footer>
  );
};

export default Footer;
