import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon, ProductsList, useProducts } from 'components';
import { routes } from 'router';

const ProductPage = () => {
  const { t } = useTranslation();
  const { products } = useProducts();

  return (
    <div className="main-container">
      <Link to={routes.productAdd.path} className="btn ml-auto my-8 w-fit">
        {t('buttons.add')}
        <Icon name="add" />
      </Link>

      {!isEmpty(products) && <ProductsList page="products" />}
    </div>
  );
};

export default ProductPage;
