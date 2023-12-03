import { useAtom } from "jotai";
import { addEditMember } from "../../hooks/headerHooks";
import { Link } from "react-router-dom";

export interface Item {
  text: string;
  background: string;
  hoverBackground: string;
  icon: JSX.Element;
}

const ButtonWithIcon = ({ text, background, hoverBackground, icon }: Item) => {
  const [isOpenAddMemberPopup, setIsOpenAddEditMemberPopup] =
    useAtom(addEditMember);
  const openAddMemberPopup = () => {
    if (text == "Add member") {
      setIsOpenAddEditMemberPopup(!isOpenAddMemberPopup);
    }
  };
  return (
    <Link to="/users/createUser">
      <button
        onClick={openAddMemberPopup}
        className={`h-10 rounded-full flex items-center gap-2 pl-4 pr-6 font-medium text-sm text-white ${background} ${hoverBackground}`}
      >
        {icon}
        {text}
      </button>
    </Link>
  );
};

export default ButtonWithIcon;
