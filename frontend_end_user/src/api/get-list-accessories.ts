export type getListAccessoriesRequest = {
  page: number;
  categories: number[];
};

export type getListAccessoriesResponse = {
  page: number;
  limit: number;
  total: number;
  data: Product[];
};

export const getListAccessories = async (req: getListAccessoriesRequest) => {
  console.log(JSON.stringify(req));

  // :TODO fetch data
  const resp = await fetch('/mocks/plants.json');
  return resp.json();
};
