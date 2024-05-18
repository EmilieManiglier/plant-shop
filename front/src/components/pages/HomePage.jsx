import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon, ProductsList, useProducts } from 'components';
import { routes } from 'router';

import { background2, background3, background4, background5, heroBg } from 'assets/img';
import 'assets/styles/pages/_home-page.scss';

const advantages = [
  { type: 'payment', icon: 'lock' },
  { type: 'delivery', icon: 'truck-fast' },
  { type: 'quality', icon: 'handshake' }
];

const images = [background2, background3, background4, background5];

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

      <section className="bg-beige-100">
        <div className="lg:grid lg:grid-cols-3 lg:border-b lg:border-gray-300">
          {advantages.map((advantage, i) => (
            <div
              key={`advantage-${i}`}
              className="p-4 flex items-center gap-4 border-b border-gray-900 lg:border-none lg:justify-center"
            >
              <Icon name={advantage.icon} className="text-green-500" />

              <p className="font-title text-xl lg:text-lg">{t(`home.advantages.${advantage.type}.title`)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 main-container py-10 lg:grid-cols-4">
          {images.map((image, i) => (
            <div key={`background-${i}`} className="col-span-6 lg:col-span-1">
              <img src={image} alt="" className="img-cover aspect-square" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 main-container md:grid-cols-12 md:py-8">
          <div className="col-span-2 md:col-span-6">
            <h2 className="text-2xl font-title">{t('aboutShort')}</h2>
            <p className="my-6 lg:max-w-[75%]">
              Id anim reprehenderit deserunt laboris consequat nulla non est irure nisi est ullamco cillum. Aliquip
              tempor aute non pariatur velit laboris culpa nulla tempor mollit sit reprehenderit nulla.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-2xl font-title">{t('home.contactUs')}</h2>
            <p className="my-6">email@gmail.com</p>
            <p>+33 67868396</p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-2xl font-title">{t('home.followUs')}</h2>
            <p className="my-6">Instagram</p>
            <p>Facebook</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
