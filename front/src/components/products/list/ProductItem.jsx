import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { array, number, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

import { Icon, Logo, useProducts } from 'components';
import { formatLocalizedCurrency } from 'helpers';
import { useFetch } from 'hooks';
import { routes } from 'router';

import 'assets/styles/components/_product-item.scss';

const ProductItem = ({ product, className = '' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { products, setProducts } = useProducts();
  const { call: addToFavoriteCall } = useFetch();
  const { call: deleteFavoriteCall } = useFetch();

  const navigateToProductShow = () => {
    navigate(generatePath(routes.productShow.path, { id: product.id }));
  };

  const handleFavorite = async () => {
    const favoritePresent = product.favoriteId;
    const call = favoritePresent ? deleteFavoriteCall : addToFavoriteCall;

    await call({
      url: favoritePresent ? `/favorites/${product.favoriteId}` : '/favorites',
      method: favoritePresent ? 'delete' : 'post',
      ...(!favoritePresent && { params: { productId: product.id } })
    });

    const updatedProducts = products.map((prod) => {
      return prod.id === product.id ? { ...prod, favoriteId: favoritePresent ? null : product.id } : prod;
    });
    setProducts(updatedProducts);

    toast.success(t(`products:favorites.${favoritePresent ? 'deleteSuccess' : 'success'}`));
  };

  return (
    <div className={clsx('product-item', className)}>
      <button
        type="button"
        className="absolute top-8 right-8 z-10"
        data-tooltip-id="btn-favorite-tooltip"
        data-tooltip-content={t('buttons.addToFavorites')}
        onClick={handleFavorite}
      >
        <Icon name="heart" iconStyle={product.favoriteId ? 'fas' : 'far'} className="text-green-500 w-7 h-7" />
        <span className="sr-only">{t('buttons.addToFavorites')}</span>
      </button>

      <Tooltip id="btn-favorite-tooltip" />

      <div className="rounded-2xl overflow-hidden h-80 w-full transition-img relative shrink-0">
        {product.image ? (
          <img src={product.image} alt="" className="img-cover" />
        ) : (
          <div className="bg-beige-100 w-full h-full flex-center-center">
            <Logo />
          </div>
        )}

        <>
          {!isEmpty(product?.categories?.[0]) && (
            <div className="absolute bottom-4 right-4">
              <p className="badge">{product.categories[0].name}</p>
            </div>
          )}
        </>
      </div>

      <div className="my-10 flex justify-between items-start gap-6">
        <h3 className="h3">{product.name}</h3>
        <p className="h3">{formatLocalizedCurrency(product.price)}</p>
      </div>

      <button type="button" className="btn outlined w-full uppercase" onClick={navigateToProductShow}>
        {t('buttons.seeDetails')}
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  product: shape({
    name: string,
    description: string,
    price: string,
    stock: number,
    image: string,
    categories: array
  }).isRequired,
  className: string
};

export default ProductItem;
