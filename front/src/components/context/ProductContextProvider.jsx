import { node } from 'prop-types';
import { createContext, useContext, useEffect } from 'react';

import { useFetch } from 'hooks';

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const { call, data: products, setData: setProducts } = useFetch();

  useEffect(() => {
    const getProducts = () => {
      call({ url: '/products' });
    };

    getProducts();
  }, []);

  return <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);

ProductContextProvider.propTypes = {
  children: node.isRequired
};

export default ProductContextProvider;
