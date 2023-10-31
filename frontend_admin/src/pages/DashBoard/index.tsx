import { BiPlus } from "react-icons/bi";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { MdOutlineSearch, MdOutlineExpandMore } from "react-icons/md";
import { useState } from "react";

function DashBoard() {
  const [isFocusUser, checkFocusUser] = useState(false);
  const [isFocusPosition, checkFocusPosition] = useState(false);
  return (
    <main className="col-span-4 grid grid-rows-6">
      <Header />
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="flex items-center">
            <div className="relative m-4">
              <input    
                onFocus={() => checkFocusUser(!isFocusUser)}
                onBlur={() => checkFocusUser(!isFocusUser)}
                type="search"
                className="w-full p-2 text-sm border rounded-lg bg-gray-50 outline-none"
                placeholder="User name"
              />
              <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                <MdOutlineSearch
                  className={`w-5 h-5 ${
                    isFocusUser ? "hidden" : "block"
                  } text-gray-500`}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative m-4">
              <input
                onFocus={() => checkFocusPosition(!isFocusPosition)}
                onBlur={() => checkFocusPosition(!isFocusPosition)}
                type="search"
                className="w-full p-2 text-sm border rounded-lg bg-gray-50 outline-none"
                placeholder="Position"
              />
              <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                <MdOutlineExpandMore
                  className={`w-6 h-6 ${
                    isFocusPosition ? "hidden" : "block"
                  } text-gray-500`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center">
            <div className="relative m-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <BiPlus className="text-cyan-50 w-6 h-6" />
              </div>
              <button className="w-full p-2 pl-8 text-sm font-medium border rounded-lg bg-cyan-500 hover:bg-cyan-400">
                Add member
              </button>
            </div>
          </div>
        </div>
      </div>
      <Table />
    </main>
  );
}

export default DashBoard;
