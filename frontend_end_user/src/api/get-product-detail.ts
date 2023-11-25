export const getProductDetail = async (id: number) => {
  const apiUrl = process.env.BACKEND_API_URL || 'https://localhost:8000';
  const resp = await fetch(`${apiUrl}/api/products/${id}`);

  if (!resp.ok) {
    return Promise.resolve(null);
  }

  return resp.json();
};
