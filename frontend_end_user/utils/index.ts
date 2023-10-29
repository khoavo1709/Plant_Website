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

export const modelToCamelCase = (apiModel) => {
  if (!apiModel) {
    return;
  }
  const modelData = {};
  for (const key of Object.keys(apiModel)) {
    if (apiModel[key] === null && apiModel[key] === undefined) {
      return;
    }
    if (Array.isArray(apiModel[key])) {
      const array = [];
      for (const item of apiModel[key]) {
        switch (typeof item) {
          case 'string':
            array.push(_.camelCase(item));
            break;
          case 'number':
            array.push(item);
            break;
          default:
            array.push(this.modelToCamelCase(item));
        }
      }
      modelData[_.camelCase(key)] = array;
    } else {
      modelData[_.camelCase(key)] =
        typeof apiModel[key] === 'object'
          ? this.modelToCamelCase(apiModel[key])
          : apiModel[key];
    }
  }
  return modelData;
};
