import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { array, number, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

import { Icon, useProducts } from 'components';
import { formatLocalizedCurrency } from 'helpers';
import { useFetch } from 'hooks';
import { routes } from 'router';

import plantIcon from 'assets/img/icons/icon-plant.png';
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
      <button type="button" className="absolute inset-0 opacity-0" onClick={navigateToProductShow}>
        {t('buttons.seePlantShow')}
      </button>

      <button
        type="button"
        className="product-favorite-btn"
        data-tooltip-id="favorite-btn-tooltip"
        data-tooltip-content={t('buttons.addToFavorites')}
        onClick={handleFavorite}
      >
        <Icon name="heart" iconStyle={product.favoriteId ? 'fas' : 'far'} className="text-gray-600" />
        <span className="sr-only">{t('buttons.addToFavorites')}</span>
      </button>

      <Tooltip id="favorite-btn-tooltip" />

      <div className="h-44 lg:h-80 shrink-0 overflow-hidden rounded-t-lg">
        {product.image ? (
          <img src={product.image} alt="" className="img-cover" />
        ) : (
          <div className="bg-green-500 w-full h-full flex-center-center">
            <img src={plantIcon} alt="" className="w-12 h-12 leaf-white" />
          </div>
        )}
      </div>

      <div className="p-6 h-full flex flex-col justify-between gap-y-12">
        <div>
          <p className="font-bold text-lg mb-2">{product.name}</p>
          {!isEmpty(product?.categories) && (
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, index) => (
                <p key={`product-category-${index}`} className="badge">
                  {category.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <p className="text-lg">{formatLocalizedCurrency(product.price)}</p>

        {/* TODO : Add button for cart when API is ready */}
        {/* <button type="button" className="btn cart-btn mx-auto">
          <Icon name="cart-arrow-down" className="cart-btn-icon" />
          <span className="cart-btn-content text-gray-700">{t('buttons.addToCart')}</span>
        </button> */}
      </div>
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
