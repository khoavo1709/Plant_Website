import { useAtom } from "jotai";
import { useState } from "react";
import { title } from "../../hooks/headerHooks";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [headerTitle] = useAtom(title);

  return (
    <nav className="flex items-center justify-between h-20 shadow-lg x-[-1000] relative top-0">
      <div className="font-bold text-xl mb-2 pl-4">{headerTitle}</div>
      <div className="flex cursor-pointer items-center m-2 mr-4  hover:text-cyan-500">
        <div
          className={`p-2 flex items-center font-normal`}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
        >
          <UserIcon
            className={`mr-2 h-6 w-6 ${
              isHovered ? "text-cyan-500" : "text-gray-500"
            }`}
          />{" "}
          KhoaVo
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </div>
    </nav>
  );
};

export default Index;
