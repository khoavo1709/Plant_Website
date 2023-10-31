export type getListPlantsRequest = {
  page: number;
  categories: number[];
};

export type getListPlantsResponse = {
  page: number;
  limit: number;
  total: number;
  data: Product[];
};

export const getListPlants = async (req: getListPlantsRequest) => {
  console.log(JSON.stringify(req));

  // :TODO fetch data
  const resp = await fetch('/mocks/plants.json');
  return resp.json();
};
