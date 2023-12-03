export const getListPurchases = async (
  currentPage: number,
  nameOrMail: string,
  phone: string,
  status: string
) => {
  const apiUrl = import.meta.env.BACKEND_API_URL || "http://localhost:8000";
  let url = `${apiUrl}/api/purchases?`;

  if (currentPage) {
    url += `&page=${currentPage}`;
  }

  if (nameOrMail) {
    url += `&name_or_mail=${nameOrMail}`;
  }

  if (phone) {
    url += `&mobile=${phone}`;
  }

  if (status) {
    url += `&status=${status}`;
  }

  const resp = await fetch(url);

  return resp.json();
};
