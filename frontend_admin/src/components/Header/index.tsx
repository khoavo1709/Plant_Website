import { useAtom } from "jotai";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdOutlineExpandMore } from "react-icons/md";
import { title } from "../../hooks/test";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [headerTitle] = useAtom(title);

  return (
    <nav className="bg-cyan-100 flex items-center justify-between">
      <h3 className="mb-2 pl-4">{headerTitle}</h3>
      <div className="flex cursor-pointer items-center m-2 mr-4  hover:text-cyan-500">
        <h4
          className={`p-2 flex items-center font-normal`}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
        >
          <FaUser
            className={`mr-2 ${isHovered ? "text-cyan-500" : "text-gray-500"}`}
          />{" "}
          KhoaVo
        </h4>
        <MdOutlineExpandMore className="w-5 h-5" />
      </div>
    </nav>
  );
};

export default Index;
