import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { ProductsList, useProducts } from 'components';

import { background2 } from 'assets/img';

const ProductPage = () => {
  const { t } = useTranslation();
  const { products } = useProducts();

  return (
    <>
      <section className="h-[25rem] relative after:content-empty after:absolute after:inset-0 after:bg-gray-900/25">
        <img src={background2} alt="" className="img-cover" />
      </section>

      <section className="main-container my-24">
        <h1 className="h1 underlined mb-12">{t('products:allProducts')}</h1>

        {!isEmpty(products) && <ProductsList page="products" />}
      </section>
    </>
  );
};

export default ProductPage;
