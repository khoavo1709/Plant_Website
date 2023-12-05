import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import NavItem from "./NavItem";
import {
  ChartBarIcon,
  BugAntIcon,
  WalletIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { isNavOpenAtom } from "../../hooks/headerHooks";
import { useAtom, useAtomValue } from "jotai";
import { dataUser } from "../../hooks/dataUser";

const items = [
  {
    url: "",
    label: "Dash Board",
    roles: ["EMPLOYEE", "ADMIN"],
    icon: <ChartBarIcon className="w-6 h-6" />,
  },
  {
    url: "/users",
    label: "Users Management",
    roles: ["ADMIN"],
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    url: "/products",
    label: "Products Management",
    roles: ["EMPLOYEE", "ADMIN"],
    icon: <BugAntIcon className="w-6 h-6" />,
  },
  {
    url: "/orders",
    label: "Orders Management",
    roles: ["EMPLOYEE", "ADMIN"],
    icon: <WalletIcon className="w-6 h-6" />,
  },
];

const NavItemsContainer = () => {
  const user = useAtomValue(dataUser);
  return (
    <>
      {items.map((item, index) => (
        <>
          {user && item.roles.includes(user.role) && (
            <NavItem item={item} key={index} />
          )}
        </>
      ))}
    </>
  );
};

const Index = () => {
  const [isNavOpen, setIsNavOpen] = useAtom(isNavOpenAtom);

  return (
    <nav className={`w-96 overflow-none ${isNavOpen ? "" : "hidden"}`}>
      <div className="h-20 flex justify-between items-center">
        <div className="mx-4 flex items-center py-2">
          <img src="src/assets/plantsLogo.png" className="w-14 h-14 mr-4" />
          <div className="py-4 font-bold text-xl uppercase">Plant Store</div>
        </div>
        <div className="p-4">
          <ChevronLeftIcon
            className="h-6 w-6"
            onClick={() => setIsNavOpen(!isNavOpen)}
          />
        </div>
      </div>
      <ul className="mx-2 my-2 pt-2">
        <NavItemsContainer />
      </ul>
    </nav>
  );
};

export default Index;
