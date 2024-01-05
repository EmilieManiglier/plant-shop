import { useTranslation } from 'react-i18next';

import { Icon } from 'components';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <p className="mb-4">{t('meta.title')}</p>
      <a
        className="is-link"
        href="https://github.com/Kinoba/boilerplate-react"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="icon-text">
          <span className="icon">
            <Icon name={['fab', 'github']} />
          </span>
          <span>See on Github</span>
        </span>
      </a>
    </footer>
  );
};

export default Footer;
