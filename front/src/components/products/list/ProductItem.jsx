import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { array, number, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Logo } from 'components';
import { formatLocalizedCurrency } from 'helpers';

import 'assets/styles/components/_product-item.scss';

const ProductItem = ({ product, className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('product-item', className)}>
      <div className="rounded-2xl overflow-hidden h-80 w-full transition-img relative">
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

      <button type="button" className="btn outlined w-full uppercase">
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
