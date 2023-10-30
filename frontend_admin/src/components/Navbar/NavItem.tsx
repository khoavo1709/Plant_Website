import { useSetAtom } from "jotai";
import { NavLink } from "react-router-dom";
import { title } from "../../hooks/test";

export interface Item {
  url: string;
  label: string;
  icon: JSX.Element;
}

const NavItem = ({ item }: { item: Item }) => {
  const { url, label, icon } = item;
  const setHeaderTitle = useSetAtom(title);
  const changeHeaderTitle = () => {
    setHeaderTitle(label);
  };

  return (
    <li>
      <NavLink
        to={url}
        onClick={changeHeaderTitle}
        className={({ isActive }) =>
          `flex mb-2 py-2 px-4 rounded-xl hover:shadow-transparent cursor-pointer ${
            isActive ? "bg-cyan-100" : ""
          }`
        }
      >
        {icon}
        <h4 className="ml-2">{label}</h4>
      </NavLink>
    </li>
  );
};

export default NavItem;
