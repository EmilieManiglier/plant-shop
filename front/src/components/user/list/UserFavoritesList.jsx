import { useTranslation } from 'react-i18next';

const UserFavoritesList = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="h2">{t('auth:user.favoriteTitle')}</h1>
    </>
  );
};

export default UserFavoritesList;
