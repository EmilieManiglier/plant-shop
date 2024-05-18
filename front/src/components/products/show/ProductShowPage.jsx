import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionProvider,
  AccordionTitle,
  Banner,
  Icon,
  ProductShowSkeleton
} from 'components';
import { formatLocalizedCurrency } from 'helpers';
import { useFetch } from 'hooks';
import { routes } from 'router';

import { background1 } from 'assets/img';

const treatments = [
  {
    type: 'description',
    label: 'Description',
    value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  { type: 'watering', label: 'Arrosage', value: 'Arroser une à deux fois par semaine' },
  {
    type: 'fertilizer',
    label: 'Engrais',
    value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  { type: 'light', label: 'Lumière', value: 'Ne pas exposer directement au soleil' },
  { type: 'temperature', label: 'Température', value: 'Attention au froid' }
];

const getTreatmentIcon = (type) => {
  switch (type) {
    case 'watering':
      return 'droplet';
    case 'fertilizer':
      return 'seedling';
    case 'light':
      return 'sun';
    case 'temperature':
      return 'thermometer-half';
    default:
      return 'bars-staggered';
  }
};

const ProductShowPage = () => {
  const { t } = useTranslation();
  const { call: productCall, data: product, loading: productLoading } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = () => {
      productCall({ url: `/products/${id}` });
    };

    getProduct();
  }, [id]);

  if (productLoading) {
    return <ProductShowSkeleton />;
  }

  return (
    <>
      <section className="h-[25rem] relative after:content-empty after:absolute after:inset-0 after:bg-gray-900/25">
        <img src={background1} alt="" className="img-cover" />
      </section>

      {!product && (
        <div className="main-container my-12">
          <Banner type="error">
            <p>{t('products:productNotFound')}</p>
          </Banner>
          <Link to={routes.products.path} className="btn w-fit mt-6">
            {t('products:seeProductsAvailable')}
          </Link>
        </div>
      )}

      {product && (
        <section className="main-container my-12">
          <h1 className="h1 underlined flex-center-between flex-wrap gap-8 mb-12">
            <span>{product.name}</span>
            <span>{formatLocalizedCurrency(product.price)}</span>
          </h1>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden h-80 mb-12">
                {product.image && <img src={product.image} alt="" className="img-cover" />}
              </div>

              <div className="mb-12 md:flex-center-between lg:mb-6">
                <p className="mb-2">Quantité</p>

                {/* TODO: Add quantity selector */}
                <div className="border border-gray-900 rounded-full px-4 py-2 w-32">1</div>
              </div>

              <button type="button" className="btn w-full mb-12 lg:mb-0">
                {t('buttons.addToCart')}
              </button>
            </div>

            <div className="lg:col-span-8">
              <h2 className="h2 mb-12">{t('products:informations')}</h2>

              <AccordionProvider defaultOpen={[0]} allowMultipleOpen>
                {treatments.map((treatment, i) => (
                  <Accordion key={`accordion-${i}`} itemIndex={i}>
                    <AccordionTitle icon={{ name: 'angle-down', class: 'accordion-arrow' }}>
                      <div className="flex items-center gap-6">
                        <Icon name={getTreatmentIcon(treatment.type)} />
                        {treatment.label}
                      </div>
                    </AccordionTitle>

                    <AccordionContent>
                      <p>{treatment.value}</p>
                    </AccordionContent>
                  </Accordion>
                ))}
              </AccordionProvider>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductShowPage;
