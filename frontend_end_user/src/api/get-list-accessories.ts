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
  const apiUrl = import.meta.env.BACKEND_API_URL || 'http://localhost:8000';
  const resp = await fetch(
    `${apiUrl}/api/products?type=ACCESSORY&page=${req.page}&${
      req.categories.length > 0 ? 'categories=' + req.categories.join(',') : ''
    }`
  );

  if (!resp.ok) {
    return Promise.resolve({
      page: req.page,
      limit: 8,
      total: 0,
      data: [],
    } as getListAccessoriesResponse);
  }

  return resp.json();
};
