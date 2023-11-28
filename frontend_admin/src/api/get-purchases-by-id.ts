export const getPurchaseById = async (id: number) => {
  const apiUrl = import.meta.env.BACKEND_API_URL || "http://localhost:8000";
  let url = `${apiUrl}/api/purchases/${id}`;
  const resp = await fetch(url);
  return resp.json();

};
