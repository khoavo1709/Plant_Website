import { useAtom } from "jotai";
import { isNavOpenAtom, title } from "../../hooks/headerHooks";
import {
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Index = () => {
  const [headerTitle] = useAtom(title);
  const [isNavOpen, setIsNavOpen] = useAtom(isNavOpenAtom);

  return (
    <nav className="flex items-center justify-between h-20 shadow-md x-[-1000] relative top-0">
      <div className="font-bold text-xl mb-2 pl-4 flex">
        <div className="pt-1 mr-2">
          <ChevronRightIcon
            className={`h-6 w-6 ${isNavOpen ? "hidden" : ""}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          />
        </div>
        {headerTitle}
      </div>
      <div className="mr-6 flex items-center font-bold text-base hover:text-red-500">
        <ArrowRightOnRectangleIcon className="h-6 w-6 mr-1" /> Sign out
      </div>
    </nav>
  );
};

export default Index;
