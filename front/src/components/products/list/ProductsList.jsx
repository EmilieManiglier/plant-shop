import { isEmpty } from 'lodash';
import { oneOf } from 'prop-types';
import { useMemo } from 'react';

import { ProductItem, useProducts } from 'components';

const ProductsList = ({ page }) => {
  const { products } = useProducts();

  const productsList = useMemo(() => {
    if (isEmpty(products)) return [];
    else if (page !== 'home') return products;
    return products?.length > 5 ? products?.slice(0, 5) : products;
  }, [products]);

  return (
    <section className="grid grid-cols-12 gap-6 p-4 lg:px-12">
      {productsList?.map((product, index) => (
        <ProductItem
          key={`product-${index}`}
          product={product}
          className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3"
        />
      ))}
    </section>
  );
};

ProductsList.propTypes = {
  page: oneOf(['home', 'products']).isRequired
};

export default ProductsList;
