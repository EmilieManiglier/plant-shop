import { Fragment } from 'react';

import { ProductItem } from 'components';

const ProductsList = () => {
  return (
    <section className="grid grid-cols-12 gap-6 p-4 lg:px-12">
      {[...Array(5)].map((_, index) => (
        <Fragment key={`plant-${index}`}>
          <ProductItem className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3" />
        </Fragment>
      ))}
    </section>
  );
};

export default ProductsList;
