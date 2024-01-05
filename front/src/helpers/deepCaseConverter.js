import { camelCase, isArray, isPlainObject, reduce, snakeCase } from 'lodash';

/**
 * Recursively converts deep nested object and array keys to CamelCase or snake_case depending of passed parameter
 */
export const deepCaseConverter = (object, toCamelCase) => {
  if (!isPlainObject(object) && !isArray(object)) {
    return object;
  } else if (isArray(object)) {
    return object.map((v) => deepCaseConverter(v, toCamelCase));
  }
  return reduce(
    object,
    (r, v, k) => {
      return {
        ...r,
        [toCamelCase ? camelCase(k) : snakeCase(k)]: deepCaseConverter(v, toCamelCase)
      };
    },
    {}
  );
};
