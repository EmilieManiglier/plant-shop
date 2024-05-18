import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Icon } from 'components';

import { background2, background3, background4, background5 } from 'assets/img';

const advantages = [
  { type: 'payment', icon: 'lock' },
  { type: 'delivery', icon: 'truck-fast' },
  { type: 'quality', icon: 'handshake' }
];

const images = [background2, background3, background4, background5];

const Footer = () => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <>
      <section className="bg-beige-100">
        {user.isLoggedIn && (
          <>
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
          </>
        )}

        <div
          className={clsx('grid grid-cols-2 gap-6 main-container md:grid-cols-12 md:py-8', !user.isLoggedIn && 'py-8')}
        >
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

      <footer className="bg-gray-900 text-white text-center px-4 py-12">
        <p>{t('navigation.copyright', { year })}</p>
      </footer>
    </>
  );
};

export default Footer;
