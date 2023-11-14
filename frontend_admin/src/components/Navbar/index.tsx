import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import NavItem from "./NavItem";
import {
  ChartBarIcon,
  BugAntIcon,
  WalletIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const items = [
  {
    url: "",
    label: "Dash Board",
    icon: <ChartBarIcon className="w-6 h-6" />,
  },
  {
    url: "/users",
    label: "Users Management",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    url: "/products",
    label: "Products Management",
    icon: <BugAntIcon className="w-6 h-6" />,
  },
  {
    url: "/orders",
    label: "Orders Management",
    icon: <WalletIcon className="w-6 h-6" />,
  },
];

const NavItemsContainer = () => (
  <>
    {items.map((item, index) => (
      <NavItem item={item} key={index} />
    ))}
  </>
);

const Index = () => {
  return (
    <nav className="w-96 overflow-none">
      <div className="h-20 flex justify-between items-center">
        <div className="mx-4 flex items-center py-2">
          <img src="src/assets/plantsLogo.png" className="w-14 h-14 mr-4" />
          <div className="py-4 font-bold text-xl uppercase">Plant Store</div>
        </div>
        <div className="p-4">
          <ChevronLeftIcon className="w-6 h-6" />
        </div>
      </div>
      <ul className="mx-2 my-2 pt-2">
        <NavItemsContainer />
      </ul>
    </nav>
  );
};

export default Index;
