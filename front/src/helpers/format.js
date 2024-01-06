import { isUndefined, uniqueId } from 'lodash';

import i18n from 'translations';

/* Add a property uuid to every object in array */
export const addUuid = (array, label = '') => {
  return array.map((item) => ({ ...item, uuid: uniqueId(label) }));
};

export const formatLocalizedNumber = (number, options = { style: 'decimal' }) => {
  if (isUndefined(number) || isNaN(number)) number = 0;

  return new Intl.NumberFormat(i18n.language, { ...options, maximumFractionDigits: 2 }).format(number);
};

export const formatLocalizedCurrency = (price, options = { style: 'currency', currency: 'EUR' }) => {
  return formatLocalizedNumber(price, options);
};
