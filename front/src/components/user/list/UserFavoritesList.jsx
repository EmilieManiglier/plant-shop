import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductItem } from 'components';
import { useFetch } from 'hooks';

const UserFavoritesList = () => {
  const { t } = useTranslation();
  const {
    call: favoritesCall,
    data: favorites,
    setData: setFavorites,
    loading: loadingFavorites
  } = useFetch({ withSetState: false });

  useEffect(() => {
    const getFavorites = async () => {
      const { data } = await favoritesCall({ url: '/favorites' });

      if (!isEmpty(data)) {
        setFavorites(data.map((favorite) => favorite.product));
      }
    };

    getFavorites();
  }, []);

  return (
    <>
      <h1 className="h2 mb-6">{t('auth:user.favoriteTitle')}</h1>

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {loadingFavorites &&
          [...Array(3)].map((_, i) => (
            <div key={`favorite-skeleton-${i}`} className="skeleton h-80 w-full rounded-2xl" />
          ))}

        {!loadingFavorites && isEmpty(favorites) && <div className="md:col-span-2">{t('auth:user.noFavorites')}</div>}

        {!loadingFavorites && !isEmpty(favorites) && (
          <>
            {favorites.map((product) => (
              <ProductItem product={product} key={product.id} favoriteBtn={false} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UserFavoritesList;
