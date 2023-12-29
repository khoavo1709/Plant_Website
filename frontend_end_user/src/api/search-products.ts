export type SearchProductsRequest = {
  page: number;
  search?: string | null;
};

export type SearchProductsResponse = {
  page: number;
  limit: number;
  total: number;
  data: Product[];
};

export const seachProducts = async (req: SearchProductsRequest) => {
  const apiUrl = import.meta.env.BACKEND_API_URL || 'http://localhost:8000';
  const resp = await fetch(
    `${apiUrl}/api/products?page=${req.page}&${
      req.search ? 'search=' + req.search : ''
    }`
  );

  if (!resp.ok) {
    return Promise.resolve({
      page: req.page,
      limit: 8,
      total: 0,
      data: [],
    } as SearchProductsResponse);
  }

  return resp.json();
};
