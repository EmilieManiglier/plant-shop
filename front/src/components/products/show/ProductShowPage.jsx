import { useTranslation } from 'react-i18next';

import { Icon } from 'components';
import { formatLocalizedCurrency } from 'helpers';

import plant from 'assets/img/plant-1.jpg';

const treatments = [
  {
    type: 'watering',
    title: 'Arrosage',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    type: 'fertilizer',
    title: 'Engrais',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    type: 'light',
    title: 'Lumière',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  },
  {
    type: 'temperature',
    title: 'Température',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
  }
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
      return '';
  }
};

const ProductShowPage = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-12 gap-8">
      <div
        className="col-span-9 bg-green-50 bg-no-repeat bg-right px-12 py-32"
        style={{ backgroundImage: `url(${plant})` }}
      >
        <div className="flex flex-col-reverse">
          <h1 className="h1 mb-12">Pink Dragon</h1>
          <h2 className="h2 mb-2">Alocasia Baginda</h2>
        </div>

        <p className="max-w-[66%]">
          Dolore eu Lorem pariatur duis dolore ipsum sit consectetur aliquip consectetur deserunt ad. Adipisicing
          laborum esse enim et in amet est est cillum exercitation ullamco cillum qui amet. Labore id amet Lorem et eu
          quis amet. Voluptate et aliqua sit dolor culpa cupidatat ad consectetur. Ea mollit incididunt enim duis fugiat
          cupidatat.
        </p>

        <p className="text-2xl font-bold my-12">{formatLocalizedCurrency(12.99)}</p>

        <button type="button" className="btn">
          {t('buttons.addToCart')}
        </button>
      </div>

      <div className="col-span-3 py-32 pr-4">
        <h2 className="h2 mb-12">Traitements & Faits</h2>

        <div className="flex flex-col gap-y-8">
          {treatments.map((treatment, i) => (
            <div key={`plant-treatment-${i}`} className="flex items-start gap-8">
              <Icon name={getTreatmentIcon(treatment.type)} className="text-green-500 mt-2 w-6 h-6" />

              <div>
                <h3 className="uppercase tracking-widest mb-2">{treatment.title}</h3>
                <p>{treatment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowPage;
