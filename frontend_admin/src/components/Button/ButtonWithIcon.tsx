import { useAtom } from "jotai";
import { addNewMember } from "../../hooks/headerHooks";
import { Link } from "react-router-dom";

export interface Item {
  text: string;
  background: string;
  hoverBackground: string;
  icon: JSX.Element;
}

const ButtonWithIcon = ({ text, background, hoverBackground, icon }: Item) => {
  const [isOpenAddMemberPopup, setIsOpenAddNewMemberPopup] =
    useAtom(addNewMember);
  const openAddMemberPopup = () => {
    if (text == "Add member") {
      setIsOpenAddNewMemberPopup(!isOpenAddMemberPopup);
    }
  };
  return (
    <Link to="/users/new">
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
