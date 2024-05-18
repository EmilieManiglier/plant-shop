import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ProductsList, useProducts } from 'components';
import { routes } from 'router';

import { heroBg } from 'assets/img';
import 'assets/styles/pages/_home-page.scss';

const HomePage = () => {
  const { t } = useTranslation();
  const { products } = useProducts();

  return (
    <>
      <section className="h-screen relative">
        <img src={heroBg} alt="" className="img-cover" />

        <div className="title-container">
          <h1 className="font-title uppercase text-xl font-bold tracking-wider">{t('home.title')}</h1>
          <p className="my-6 text-xl">{t('home.subtitle')}</p>
          <Link to={routes.products.path} className="btn w-fit">
            {t('home.heroCta')}
          </Link>
        </div>
      </section>

      <section className="mt-16 main-container lg:grid lg:grid-cols-12 lg:gap-x-8 lg:my-24">
        <h2 className="h2 uppercase mb-8 lg:col-span-4">{t('about')}</h2>

        <div className="lg:col-span-8">
          <p className="mb-4">
            Id anim reprehenderit deserunt laboris consequat nulla non est irure nisi est ullamco cillum. Aliquip tempor
            aute non pariatur velit laboris culpa nulla tempor mollit sit reprehenderit nulla. Lorem enim nisi culpa
            commodo ex dolore laborum ea cillum mollit nisi qui veniam ea officia. Do aliquip dolore irure aliqua sit
            pariatur cupidatat et ullamco incididunt nostrud eu do.
          </p>

          <p>
            Cillum et commodo laboris irure eu incididunt consequat aliqua. Esse do do culpa eiusmod nostrud fugiat.
            Adipisicing ullamco reprehenderit voluptate laborum sit eiusmod commodo in.
          </p>
        </div>
      </section>

      {!isEmpty(products) && (
        <section className="p-4 mb-12 lg:p-12">
          <h2 className="h2 underlined mb-12">{t('products:homeTitle')}</h2>

          <ProductsList page="home" />
        </section>
      )}
    </>
  );
};

export default HomePage;
