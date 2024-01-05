import { uniqueId } from 'lodash';

/* Add a property uuid to every object in array */
export const addUuid = (array, label = '') => {
  return array.map((item) => ({ ...item, uuid: uniqueId(label) }));
};
