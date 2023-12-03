export type getProductsByIDsRequest = {
  ids: number[];
};

export type getProductsByIDsResponse = {
  page: number;
  limit: number;
  total: number;
  data: Product[];
};

// :TODO remove hardcoded limit
export const getProductsByIDs = async (req: getProductsByIDsRequest) => {
  if (req.ids.length == 0) {
    return Promise.resolve({
      page: 1,
      limit: 10000,
      total: 0,
      data: [],
    } as getProductsByIDsResponse);
  }

  const apiUrl = import.meta.env.BACKEND_API_URL || 'http://localhost:8000';
  const resp = await fetch(
    `${apiUrl}/api/products?limit=10000&${
      req.ids.length > 0 ? 'ids=' + req.ids.join(',') : ''
    }`
  );

  if (!resp.ok) {
    return Promise.resolve({
      page: 1,
      limit: 10000,
      total: 0,
      data: [],
    } as getProductsByIDsResponse);
  }

  return resp.json();
};
