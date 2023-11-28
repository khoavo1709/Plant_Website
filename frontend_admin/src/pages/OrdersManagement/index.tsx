import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SearchTextBox from "../../components/Filter/SearchTextBox";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { Purchase } from "../../../types/purchase";

const itemsHeader = [
  "Full name",
  "Email",
  "Phone number",
  "Address",
  "Total price",
  "Status",
  "Order date",
];

type IResponse = {
  page: number;
  limit: number;
  total: number;
  data: Purchase[];
};

const OrdersManagement = () => {
  const [isFocusNameOrMail, checkFocusNameOrMail] = useState(false);
  const [isFocusPhone, checkFocusPhone] = useState(false);
  const searchParams = new URLSearchParams(document.location.search);
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
    const fetchData = async () => {
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;
      const status = searchParams.get("status") || "";
      const name = searchParams.get("name_or_mail") || "";
      const phone = searchParams.get("mobile") || "";

      setTempNameOrMail(name);
      setTempPhone(phone);
      setTempStatus(status);

      try {
        let url = `http://localhost:8000/api/purchases?`;
        if (page) url += `&page=${page}`;
        if (limit) url += `&limit=${limit}`;
        if (status) url += `&status=${status}`;
        if (name) url += `&name_or_mail=${name}`;
        if (phone) url += `&mobile=${phone}`;

        const response = await fetch(url);
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

  return (
    <main>
      <Header />
      <div className="background-main-page">
        <div>
          <div className="flex justify-between items-center">
            <div className="relative flex">
              <div className="flex items-center">
                <div className="relative">
                  {/* <SearchTextBox
                    checkFocus={() => checkFocusNameOrMail(!isFocusNameOrMail)}
                    placeHolder="Name or mail"
                    changeIcon={
                      <MagnifyingGlassIcon
                        className={`w-4 h-4 text-gray-500 ${
                          isFocusNameOrMail ? "hidden" : ""
                        }`}
                      />
                    }

                  /> */}
                  <input
                    type="search"
                    className="w-full mx-4 p-2 text-sm border rounded-lg bg-gray-50 outline-none"
                    placeholder="Name or mail"
                    value={tempNameOrMail || ""}
                    onChange={(e) => {
                      setTempNameOrMail(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="relative">
                  {/* <SearchTextBox
                    checkFocus={() => checkFocusPhone(!isFocusPhone)}
                    placeHolder="Phone number"
                    changeIcon={
                      <MagnifyingGlassIcon
                        className={`w-4 h-4 text-gray-500 ${
                          isFocusPhone ? "hidden" : ""
                        }`}
                      />
                    }
                  /> */}
                  <input
                    type="search"
                    className="w-full p-2 mx-4 text-sm border rounded-lg bg-gray-50 outline-none"
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
                    className="w-full p-2 mx-4 text-sm border rounded-lg bg-gray-50 outline-none"
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
          <Table
            item={{
              itemsHeader: itemsHeader,
              itemsBody: data.data.map((purchase) => [
                purchase.customer_name,
                purchase.customer_email,
                purchase.mobile,
                purchase.address,
                purchase.total.toString(),
                purchase.status,
                new Date(purchase.created_at).toLocaleDateString() +
                  " " +
                  new Date(purchase.created_at).toLocaleTimeString(),
              ]),
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default OrdersManagement;
