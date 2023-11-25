export const getProductDetail = async (id: number) => {
  const apiUrl = import.meta.env.BACKEND_API_URL || 'http://localhost:8000';
  const resp = await fetch(`${apiUrl}/api/products/${id}`);

  if (!resp.ok) {
    return Promise.resolve(null);
  }

  return resp.json();
};
