export const getProductDetail = async (id: number) => {
  console.log(id);
  // :TODO fetch data
  const resp = await fetch('/mocks/product.json');
  return resp.json();
};
