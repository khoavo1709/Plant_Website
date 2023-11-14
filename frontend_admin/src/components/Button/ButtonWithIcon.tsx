import { useAtom } from "jotai";
import { addNewMember } from "../../hooks/headerHooks";

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
    <button
      onClick={openAddMemberPopup}
      className={`h-10 rounded-full flex items-center gap-2 pl-4 pr-6 font-medium text-sm ${background} ${hoverBackground}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default ButtonWithIcon;
