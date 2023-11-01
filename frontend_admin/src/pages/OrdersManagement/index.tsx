import { BiPlus } from "react-icons/bi";
import Header from "../../components/Header";
import Table from "../../components/Table";

function UserManagement() {
  return (
    <main className="col-span-4 grid grid-rows-6">
      <Header />
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
      <Table />
    </main>
  );
}

export default UserManagement;
