import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Icon, ProductsList, useProducts } from 'components';

import heroBg from 'assets/img/background_2.jpg';
import storyBg from 'assets/img/background_3.jpg';

const advantages = [
  { type: 'payment', icon: 'lock' },
  { type: 'delivery', icon: 'truck-fast' },
  { type: 'quality', icon: 'handshake' }
];

const HomePage = () => {
  const { t } = useTranslation();
  const { products } = useProducts();

  return (
    <>
      <section className="h-screen relative after:absolute after:content-[''] after:inset-0 after:bg-black/50">
        <img src={heroBg} alt="" className="img-cover" />

        <div className="absolute translate-center-center z-10">
          <h1 className="h1 large text-white text-center">{t('home.title')}</h1>

          <button type="button" className="btn white mx-auto my-12">
            {t('buttons.buyPlants')}
          </button>
        </div>
      </section>

      {!isEmpty(products) && (
        <section className="p-4 lg:p-12">
          <h2 className="h2 uppercase mt-2 tracking-wider">{t('products:homeTitle')}</h2>

          <ProductsList page="home" />
        </section>
      )}

      <section className="flex flex-col gap-6 px-4 py-12 lg:flex-row lg:justify-between lg:px-24 lg:py-32">
        {advantages.map((advantage, i) => (
          <div key={`advantage-${i}`} className="flex flex-col items-center gap-4 mb-8 lg:flex-row">
            <div className="bg-green-500 rounded-full w-12 h-12 flex-center-center">
              <Icon name={advantage.icon} className="text-white" />
            </div>

            <div>
              <h2 className="h2 uppercase mt-2 tracking-wider">{t(`home.advantages.${advantage.type}.title`)}</h2>
              <p>{t(`home.advantages.${advantage.type}.description`)}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="lg:flex lg:gap-x-8">
        <div className="w-full h-72 lg:w-1/2 lg:h-96">
          <img src={storyBg} alt="" className="img-cover object-top" />
        </div>

        <div className="p-4 lg:w-1/2 lg:pt-0">
          <h2 className="h2 uppercase mb-8">{t('home.subtitle')}</h2>

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

          <button type="button" className="btn my-8">
            {t('buttons.readMore')}
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
