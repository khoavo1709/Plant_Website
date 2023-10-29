import * as _ from 'lodash';

export function convertKeysToCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  } else if (typeof obj === 'object') {
    return _.mapKeys(obj, (value, key) => _.camelCase(key));
  } else {
    return obj;
  }
}
