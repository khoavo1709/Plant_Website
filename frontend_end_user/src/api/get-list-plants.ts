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
  const apiUrl = process.env.BACKEND_API_URL || 'https://localhost:8000';
  const resp = await fetch(`${apiUrl}/api/products?type=PLANT`);

  if (!resp.ok) {
    return Promise.resolve({
      page: req.page,
      limit: 20,
      total: 0,
      data: [],
    } as getListPlantsResponse);
  }

  return resp.json();
};
