import { BiHomeAlt } from "react-icons/bi";
import NavItem from "./NavItem";
import { MdOutlineChevronLeft } from "react-icons/md";

const iconSize = "w-6 h-6";

const items = [
  {
    url: "/dashboard",
    label: "Dash Board",
    icon: <BiHomeAlt className={`${iconSize}`} />,
  },
  {
    url: "/users",
    label: "User Management",
    icon: <BiHomeAlt className={`${iconSize}`} />,
  },
  {
    url: "/products",
    label: "Product Management",
    icon: <BiHomeAlt className={`${iconSize}`} />,
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
  // const [isActive, setIsActive] = useAtom(active);
  return (
    <nav className="col-span-1 grid grid-rows-6 border-r-2">
      <div className="row-span-1 flex justify-between items-center border-b-2">
        <div className="mx-4 flex items-center py-2">
          <img src="src/assets/plantsLogo.png" className="w-14 h-14 mr-4" />
          <h3 className="py-4 uppercase">Plant Store</h3>
        </div>
        <div className="p-4">
          <MdOutlineChevronLeft className="w-8 h-8" />
        </div>
      </div>
      <ul className="row-span-5 mx-2 my-2 pt-2">
        <NavItemsContainer />
      </ul>
    </nav>
  );
};

export default Index;
