import clsx from 'clsx';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { Icon } from 'components';
import { formatLocalizedCurrency } from 'helpers';
import { routes } from 'router';

import plant from 'assets/img/plant-1.jpg';
import 'assets/styles/components/_product-item.scss';

const ProductItem = ({ className = '' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToProductShow = () => {
    /* TODO - add product id */
    navigate(generatePath(routes.productShow.path, { id: 1 }));
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
      >
        <Icon name="heart" className="text-gray-600" />
        <span className="sr-only">{t('buttons.addToFavorites')}</span>
      </button>

      <Tooltip id="favorite-btn-tooltip" />

      <div className="h-44 lg:h-80">
        <img src={plant} alt="" className="img-cover" />
      </div>

      <div className="p-6">
        <p className="font-bold text-lg">Leaf plant name</p>
        <p className="text-sm text-gray-500 mb-4">Plant category</p>
        <p className="mb-4 text-lg">{formatLocalizedCurrency(55.99)}</p>

        <button type="button" className="btn cart-btn mx-auto">
          <Icon name="cart-arrow-down" className="cart-btn-icon" />
          <span className="cart-btn-content text-gray-700">{t('buttons.addToCart')}</span>
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  className: string
};

export default ProductItem;
