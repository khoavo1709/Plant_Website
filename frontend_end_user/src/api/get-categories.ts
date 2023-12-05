export type getCategoriesRequest = {
  type: 'PLANT' | 'ACCESSORY';
};

export const getCategories = async (req: getCategoriesRequest) => {
  const apiUrl = import.meta.env.BACKEND_API_URL || 'http://localhost:8000';
  const resp = await fetch(`${apiUrl}/api/categories?product_type=${req.type}`);

  if (!resp.ok) {
    return Promise.resolve([] as Category[]);
  }

  return resp.json() as Promise<Category>;
};
