export const getCategories = async (type: 'PLANT' | 'ACCESSORY') => {
  console.log(type);

  const resp = await fetch('/mocks/categories.json');

  return resp.json();
};
