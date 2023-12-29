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
  const apiUrl = import.meta.env.BACKEND_API_URL || 'http://localhost:8000';
  const resp = await fetch(
    `${apiUrl}/api/products?type=PLANT&page=${req.page}&${
      req.categories.length > 0 ? 'categories=' + req.categories.join(',') : ''
    }`
  );

  if (!resp.ok) {
    return Promise.resolve({
      page: req.page,
      limit: 8,
      total: 0,
      data: [],
    } as getListPlantsResponse);
  }

  return resp.json();
};
