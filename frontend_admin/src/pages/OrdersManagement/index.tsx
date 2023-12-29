import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Purchase } from "../../../types/purchase";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

type IResponse = {
  page: number;
  limit: number;
  total: number;
  data: Purchase[];
};

const OrdersManagement = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setTotal] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [tempNameOrMail, setTempNameOrMail] = useState<string>("");
  const [tempPhone, setTempPhone] = useState<string>("");
  const [tempStatus, setTempStatus] = useState<string>("");
  const [data, setData] = useState<IResponse>({
    page: 1,
    limit: 10,
    total: 0,
    data: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;
      const status = searchParams.get("status") || "";
      const name = searchParams.get("name_or_mail") || "";
      const phone = searchParams.get("mobile") || "";

      setTempNameOrMail(name);
      setTempPhone(phone);
      setTempStatus(status);
      setCurrentPage(Number(page));
      setLimit(Number(limit));
      setTotal(data.total);

      try {
        let url = `http://localhost:8000/api/purchases?`;
        if (page) url += `&page=${page}`;
        if (limit) url += `&limit=${limit}`;
        if (status) url += `&status=${status}`;
        if (name) url += `&name_or_mail=${name}`;
        if (phone) url += `&mobile=${phone}`;

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            Authorization: token ? token : "",
          },
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = new URL(window.location.href);
      url.searchParams.set("name_or_mail", tempNameOrMail);
      url.searchParams.set("mobile", tempPhone);
      url.searchParams.set("status", tempStatus);
      window.location.href = url.toString();
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href);
    url.searchParams.set("name_or_mail", tempNameOrMail);
    url.searchParams.set("mobile", tempPhone);
    url.searchParams.set("status", e.target.value);
    window.location.href = url.toString();
  };

  const onPageChange = () => (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("name_or_mail", tempNameOrMail);
    url.searchParams.set("mobile", tempPhone);
    url.searchParams.set("status", tempStatus);

    window.location.href = url.toString();
  };

  return (
    <main>
      <Header />
      <div className="background-main-page h-full">
        <div>
          <div className="flex justify-between items-center">
            <div className="relative flex">
              <div className="grid grid-cols-3 gap-8 ml-6 ">
                <div className="relative">
                  <input
                    type="search"
                    className="w-full mt-8 p-2 text-sm border rounded-lg bg-gray-50 outline-none"
                    placeholder="Name or mail"
                    value={tempNameOrMail || ""}
                    onChange={(e) => {
                      setTempNameOrMail(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="relative">
                  <input
                    type="search"
                    className="w-full mt-8 p-2 text-sm border rounded-lg bg-gray-50 outline-none"
                    placeholder="Phone number"
                    value={tempPhone || ""}
                    onChange={(e) => {
                      setTempPhone(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="relative">
                  <select
                    title="StatusSearch"
                    className="w-full mt-8 p-2 mx-1 text-sm border rounded-lg bg-gray-50 outline-none"
                    placeholder="Status"
                    value={tempStatus || ""}
                    onChange={(e) => {
                      handleStatusChange(e);
                    }}
                  >
                    <option value="" defaultChecked>
                      ALL
                    </option>
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="m-7 bg-white p-4 rounded-2xl shadow-md">
            <table className="text-sm text-left w-full">
              <thead className="uppercase border-b">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Full name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Phone number
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Total price
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Order date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((purchase) => (
                  <tr key={purchase.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{purchase.customer_name}</td>
                    <td className="px-6 py-4">{purchase.customer_email}</td>
                    <td className="px-6 py-4">{purchase.mobile}</td>
                    <td className="px-6 py-4">{purchase.address}</td>
                    <td className="px-6 py-4">{purchase.total}</td>
                    <td className="px-6 py-4">{purchase.status}</td>
                    <td className="px-6 py-4">
                      {new Date(purchase.created_at).toLocaleDateString() +
                        " " +
                        new Date(purchase.created_at).toLocaleTimeString()}
                    </td>

                    <td className="flex px-6 py-4 justify-end text-slate-400">
                      <div className="px-2">
                        <Link to={"/orders/" + purchase.id}>
                          <InformationCircleIcon
                            title="Info"
                            className="hover:text-blue-500 hover:ease-in-out hover:scale-125 h-5"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <Pagination
            currentPage={currentPage}
            totalPages={
              data.total % limit === 0
                ? Math.floor(data.total / limit)
                : Math.floor(data.total / limit) + 1
            }
            onPageChange={onPageChange()}
          ></Pagination> */}
        </div>
      </div>
    </main>
  );
};

export default OrdersManagement;
