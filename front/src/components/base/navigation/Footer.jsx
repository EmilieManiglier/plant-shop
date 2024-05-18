import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white text-center px-4 py-12">
      <p>{t('navigation.copyright', { year })}</p>
    </footer>
  );
};

export default Footer;
