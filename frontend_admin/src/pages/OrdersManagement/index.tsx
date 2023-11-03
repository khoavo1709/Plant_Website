import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import SearchTextBox from "../../components/Filter/SearchTextBox";
import Header from "../../components/Header";
import Table from "../../components/Table";
import ButtonWithIcon from "../../components/Button/ButtonWithIcon";
import { useState } from "react";
import Pagination from "../../components/Pagination";

const itemsHeader = [
  "Full name",
  "Email",
  "Phone number",
  "Address",
  "Total price",
  "Status",
  "Order date",
];

const OrdersManagement = () => {
  const [isFocusNameOrMail, checkFocusNameOrMail] = useState(false);
  const [isFocusPhone, checkFocusPhone] = useState(false);
  enum Role {
    ADMIN = "ADMIN",
    STAFF = "STAFF",
  }

  const data = [
    {
      id: "purchase1",
      customerName: "Alice Johnson",
      customerMobile: "555-7890",
      customerEmail: "alice@example.com",
      customerAddress: "789 Pine St, Villageton",
      purchaseProducts: [
        {
          product: {
            id: 1,
            type: "PLANT",
            name: "Snake Plant",
            title: "Sansevieria Trifasciata",
            description: "Oxygen-producing indoor plant.",
            price: 25.99,
            image: "snake_plant.jpg",
            quantity: 50,
          },
          quantity: 2,
          price: 25.99,
        },
        {
          product: {
            id: 2,
            type: "PLANT",
            name: "Fiddle Leaf Fig",
            title: "Ficus lyrata",
            description:
              "Popular indoor tree with large, fiddle-shaped leaves.",
            price: 45.99,
            image: "fiddle_leaf_fig.jpg",
            quantity: 30,
          },
          quantity: 1,
          price: 12.99,
        },
      ],
      total: 64.97,
      status: "pending",
      note: "Please deliver as soon as possible.",
      purchaseAt: new Date("2023-11-02T12:30:00"),
      createBy: {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: Role.ADMIN,
        address: "123 Main St, Cityville",
        phone: "555-1234",
      },
    },
    {
      id: "purchase2",
      customerName: "Bob Williams",
      customerMobile: "555-3456",
      customerEmail: "bob@example.com",
      customerAddress: "101 Maple St, Forestville",
      purchaseProducts: [
        {
          product: {
            id: 2,
            type: "PLANT",
            name: "Fiddle Leaf Fig",
            title: "Ficus lyrata",
            description:
              "Popular indoor tree with large, fiddle-shaped leaves.",
            price: 45.99,
            image: "fiddle_leaf_fig.jpg",
            quantity: 30,
          },
          quantity: 1,
          price: 45.99,
        },
        {
          product: {
            id: 3,
            type: "ACCESSORY",
            name: "Plant Pot",
            title: "Ceramic Flower Pot",
            description: "Beautiful ceramic pot for your plants.",
            price: 12.99,
            image: "ceramic_pot.jpg",
            quantity: 100,
          },
          quantity: 3,
          price: 12.99,
        },
      ],
      total: 137.95,
      status: "shipping",
      note: "Please call before delivery.",
      purchaseAt: new Date("2023-11-01T15:45:00"),
      createBy: {
        id: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "securepass",
        role: Role.STAFF,
        address: "456 Oak St, Townsville",
        phone: "555-5678",
      },
    },
    {
      id: "purchase3",
      customerName: "Charlie Brown",
      customerMobile: "555-2345",
      customerEmail: "charliebown@example.com ",
      customerAddress: "789 Pine St, Villageton",
      purchaseProducts: [],
      total: 0,
      status: "pending",

      note: "",
      purchaseAt: new Date("2023-11-02T12:30:00"),
      createBy: {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: Role.ADMIN,
        address: "123 Main St, Cityville",
        phone: "555-1234",
      },
    },
    {
      id: "purchase4",
      customerName: "Eva Rodriguez",
      customerMobile: "555-4567",
      customerEmail: "eva@example.com",
      customerAddress: "222 Birch St, Meadowville",
      purchaseProducts: [
        {
          product: {
            id: 4,
            type: "ACCESSORY",
            name: "Plant Stand",
            title: "Wooden Plant Stand",
            description: "Stylish wooden stand for your plants.",
            price: 19.99,
            image: "wooden_stand.jpg",
            quantity: 20,
          },
          quantity: 2,
          price: 39.98,
        },
        {
          product: {
            id: 5,
            type: "PLANT",
            name: "Monstera Deliciosa",
            title: "Swiss Cheese Plant",
            description: "Iconic tropical plant with split leaves.",
            price: 34.99,
            image: "monstera_deliciosa.jpg",
            quantity: 15,
          },
          quantity: 1,
          price: 34.99,
        },
      ],
      total: 74.97,
      status: "delivered",
      note: "Leave the package by the doorstep.",
      purchaseAt: new Date("2023-11-03T09:15:00"),
      createBy: {
        id: "user3",
        name: "Maria Garcia",
        email: "maria@example.com",
        password: "mypass123",
        role: Role.STAFF,
        address: "789 Pine St, Villageton",
        phone: "555-6789",
      },
    },
    {
      id: "purchase5",
      customerName: "David Lee",
      customerMobile: "555-5678",
      customerEmail: "david@example.com",
      customerAddress: "333 Oak St, Hillside",
      purchaseProducts: [
        {
          product: {
            id: 6,
            type: "PLANT",
            name: "Spider Plant",
            title: "Chlorophytum Comosum",
            description: "Air-purifying hanging plant with arching leaves.",
            price: 15.99,
            image: "spider_plant.jpg",
            quantity: 25,
          },
          quantity: 3,
          price: 47.97,
        },
      ],
      total: 47.97,
      status: "processing",
      note: "Include care instructions in the package.",
      purchaseAt: new Date("2023-11-03T14:00:00"),
      createBy: {
        id: "user4",
        name: "Chris Wilson",
        email: "chris@example.com",
        password: "chrispass",
        role: Role.ADMIN,
        address: "555 Cedar St, Grovetown",
        phone: "555-7890",
      },
    },
    {
      id: "purchase1",
      customerName: "Alice Johnson",
      customerMobile: "555-7890",
      customerEmail: "alice@example.com",
      customerAddress: "789 Pine St, Villageton",
      purchaseProducts: [
        {
          product: {
            id: 1,
            type: "PLANT",
            name: "Snake Plant",
            title: "Sansevieria Trifasciata",
            description: "Oxygen-producing indoor plant.",
            price: 25.99,
            image: "snake_plant.jpg",
            quantity: 50,
          },
          quantity: 2,
          price: 25.99,
        },
        {
          product: {
            id: 2,
            type: "PLANT",
            name: "Fiddle Leaf Fig",
            title: "Ficus lyrata",
            description:
              "Popular indoor tree with large, fiddle-shaped leaves.",
            price: 45.99,
            image: "fiddle_leaf_fig.jpg",
            quantity: 30,
          },
          quantity: 1,
          price: 12.99,
        },
      ],
      total: 64.97,
      status: "pending",
      note: "Please deliver as soon as possible.",
      purchaseAt: new Date("2023-11-02T12:30:00"),
      createBy: {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: Role.ADMIN,
        address: "123 Main St, Cityville",
        phone: "555-1234",
      },
    },
    {
      id: "purchase2",
      customerName: "Bob Williams",
      customerMobile: "555-3456",
      customerEmail: "bob@example.com",
      customerAddress: "101 Maple St, Forestville",
      purchaseProducts: [
        {
          product: {
            id: 2,
            type: "PLANT",
            name: "Fiddle Leaf Fig",
            title: "Ficus lyrata",
            description:
              "Popular indoor tree with large, fiddle-shaped leaves.",
            price: 45.99,
            image: "fiddle_leaf_fig.jpg",
            quantity: 30,
          },
          quantity: 1,
          price: 45.99,
        },
        {
          product: {
            id: 3,
            type: "ACCESSORY",
            name: "Plant Pot",
            title: "Ceramic Flower Pot",
            description: "Beautiful ceramic pot for your plants.",
            price: 12.99,
            image: "ceramic_pot.jpg",
            quantity: 100,
          },
          quantity: 3,
          price: 12.99,
        },
      ],
      total: 137.95,
      status: "shipping",
      note: "Please call before delivery.",
      purchaseAt: new Date("2023-11-01T15:45:00"),
      createBy: {
        id: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "securepass",
        role: Role.STAFF,
        address: "456 Oak St, Townsville",
        phone: "555-5678",
      },
    },
    {
      id: "purchase3",
      customerName: "Charlie Brown",
      customerMobile: "555-2345",
      customerEmail: "charliebown@example.com ",
      customerAddress: "789 Pine St, Villageton",
      purchaseProducts: [],
      total: 0,
      status: "pending",

      note: "",
      purchaseAt: new Date("2023-11-02T12:30:00"),
      createBy: {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: Role.ADMIN,
        address: "123 Main St, Cityville",
        phone: "555-1234",
      },
    },
    {
      id: "purchase4",
      customerName: "Eva Rodriguez",
      customerMobile: "555-4567",
      customerEmail: "eva@example.com",
      customerAddress: "222 Birch St, Meadowville",
      purchaseProducts: [
        {
          product: {
            id: 4,
            type: "ACCESSORY",
            name: "Plant Stand",
            title: "Wooden Plant Stand",
            description: "Stylish wooden stand for your plants.",
            price: 19.99,
            image: "wooden_stand.jpg",
            quantity: 20,
          },
          quantity: 2,
          price: 39.98,
        },
        {
          product: {
            id: 5,
            type: "PLANT",
            name: "Monstera Deliciosa",
            title: "Swiss Cheese Plant",
            description: "Iconic tropical plant with split leaves.",
            price: 34.99,
            image: "monstera_deliciosa.jpg",
            quantity: 15,
          },
          quantity: 1,
          price: 34.99,
        },
      ],
      total: 74.97,
      status: "delivered",
      note: "Leave the package by the doorstep.",
      purchaseAt: new Date("2023-11-03T09:15:00"),
      createBy: {
        id: "user3",
        name: "Maria Garcia",
        email: "maria@example.com",
        password: "mypass123",
        role: Role.STAFF,
        address: "789 Pine St, Villageton",
        phone: "555-6789",
      },
    },
    {
      id: "purchase5",
      customerName: "David Lee",
      customerMobile: "555-5678",
      customerEmail: "david@example.com",
      customerAddress: "333 Oak St, Hillside",
      purchaseProducts: [
        {
          product: {
            id: 6,
            type: "PLANT",
            name: "Spider Plant",
            title: "Chlorophytum Comosum",
            description: "Air-purifying hanging plant with arching leaves.",
            price: 15.99,
            image: "spider_plant.jpg",
            quantity: 25,
          },
          quantity: 3,
          price: 47.97,
        },
      ],
      total: 47.97,
      status: "processing",
      note: "Include care instructions in the package.",
      purchaseAt: new Date("2023-11-03T14:00:00"),
      createBy: {
        id: "user4",
        name: "Chris Wilson",
        email: "chris@example.com",
        password: "chrispass",
        role: Role.ADMIN,
        address: "555 Cedar St, Grovetown",
        phone: "555-7890",
      },
    },
  ];
  const [currentPage, setCurrentPage] = useState(5);
  const [totalPages, setTotalPages] = useState(10);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsBody = data.map((purchase) => {
    return [
      purchase.customerName,
      purchase.customerEmail,
      purchase.customerMobile,
      purchase.customerAddress,
      "$" + purchase.total.toString(),
      purchase.status,
      purchase.purchaseAt.toLocaleTimeString() +
        "  " +
        purchase.purchaseAt.toLocaleDateString(),
    ];
  });
  const tableData = {
    itemsHeader: itemsHeader,
    itemsBody: itemsBody,
  };
  return (
    <main>
      <Header />
      <div>
        <div className="flex justify-between items-center">
          <div className="relative flex">
            <div className="flex items-center">
              <div className="relative">
                <SearchTextBox
                  checkFocus={() => checkFocusNameOrMail(!isFocusNameOrMail)}
                  placeHolder="Name or mail"
                  changeIcon={
                    <MagnifyingGlassIcon
                      className={`w-4 h-4 text-gray-500 ${
                        isFocusNameOrMail ? "hidden" : ""
                      }`}
                    />
                  }
                />
              </div>
              <div className="relative">
                <SearchTextBox
                  checkFocus={() => checkFocusPhone(!isFocusPhone)}
                  placeHolder="Phone number"
                  changeIcon={
                    <MagnifyingGlassIcon
                      className={`w-4 h-4 text-gray-500 ${
                        isFocusPhone ? "hidden" : ""
                      }`}
                    />
                  }
                />
              </div>
              <div className="relative">
                <select
                  title="StatusSearch"
                  onFocus={() => checkFocusPhone(!isFocusPhone)}
                  onBlur={() => checkFocusPhone(!isFocusPhone)}
                  className="w-full p-2 text-sm border rounded-lg bg-gray-50 outline-none"
                  placeholder="Status"
                >
                  <option value="" disabled selected hidden>
                    Choose order status
                  </option>
                  <option value="all">All</option>
                  <option value="pending">Processing</option>
                  <option value="shipping">Shipping</option>
                  <option value="done">Delivered</option>
                </select>
              </div>
            </div>
          </div>
          <ButtonWithIcon
            text="Add order"
            background="bg-cyan-500"
            hoverBackground="hover:bg-cyan-400"
            icon={<PlusIcon className="text-cyan-50 w-5 h-5" />}
          />
        </div>
      </div>

      <div className="">
        <Table item={tableData} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />{" "}
      </div>
    </main>
  );
};

export default OrdersManagement;
