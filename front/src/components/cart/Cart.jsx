import clsx from 'clsx';
import { each, isEmpty } from 'lodash';
import { func, string } from 'prop-types';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput, Icon } from 'components';
import { formatLocalizedCurrency } from 'helpers';

import 'assets/styles/components/_cart.scss';

const cart = {
  products: [
    {
      id: 1,
      name: 'Alocasia regal shield',
      price: 100,
      quantity: 8,
      image: 'https://picsum.photos/200/300'
    },
    {
      id: 2,
      name: 'Pink Dragon',
      price: 11.99,
      quantity: 2,
      image: 'https://picsum.photos/200/300'
    }
  ]
};

const Cart = ({ onClose, className = '' }) => {
  const { t } = useTranslation();

  const {
    register,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      quantity: {}
    }
  });
  const formProviderValues = { register, setValue, errors };

  useEffect(() => {
    initQuantity();
  }, []);

  const initQuantity = () => {
    each(cart.products, (product) => setValue(`quantity.${product.id}`, product.quantity));
  };

  return (
    <div className={clsx('cart', className)}>
      <div className="flex-center-between border-b border-gray-200 pb-4">
        <h2 className="h2">{t('cart.title')}</h2>

        <button type="button" onClick={onClose}>
          <Icon name="xmark" classes="text-gray-500 h-6 " />
          <span className="sr-only">{t('buttons.closeCart')}</span>
        </button>
      </div>

      <div className="mt-6 grow pb-4 overflow-y-auto">
        {isEmpty(cart.products) ? (
          <div className="flex-center-center h-[calc(100%-3rem)]">
            <p>{t('cart.empty')}</p>
          </div>
        ) : (
          <ul className="">
            {cart.products.map((product) => (
              <li key={`cart-product-${product.id}`} className="flex items-center gap-4 mb-8">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />

                <div className="grow">
                  <p className="font-bold text-lg">{product.name}</p>
                  <div className="flex-center-between">
                    <p className="text-gray-600">{formatLocalizedCurrency(product.price)}</p>

                    <div className="flex items-center gap-3">
                      <FormProvider {...formProviderValues}>
                        <FormInput
                          type="number"
                          name={`quantity.${product.id}`}
                          label="Quantité"
                          className="cart-quantity"
                        />
                      </FormProvider>

                      <button type="button" className="btn gray">
                        <Icon name="trash-can" />
                        <span className="sr-only">{t('buttons.deleteItem')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white fixed bottom-0 right-0 left-0 pb-2">
        <button type="button" className="btn w-fit mx-auto">
          {t('buttons.checkout')}
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  onClose: func.isRequired,
  className: string
};

export default Cart;
