import { useAtom } from "jotai";
import { addNewMember } from "../../hooks/headerHooks";
import Button from "../Button/Button";

const AddNewMember = () => {
  const [isOpenAddMemberPopup, setIsOpenAddNewMemberPopup] =
    useAtom(addNewMember);
  const openAddMemberPopup = () => {
    setIsOpenAddNewMemberPopup(!isOpenAddMemberPopup);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
      <div className="bg-white rounded-2xl w-4/5 h-fit p-4">
        <div className="text-xl font-bold m-2">Create new member</div>
        <form className="p-4">
          <div className="grid gap-4 mb-6 grid-cols-2">
            <div>
              <label htmlFor="" className="mb-2 text-sm font-medium">
                User name
              </label>
              <input
                type="text"
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5"
                placeholder="abc"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="mb-2 text-sm font-medium">
                Phone number
              </label>
              <input
                type="tel"
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="0900200800"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="mb-2 text-sm font-medium">
                Full name
              </label>
              <input
                type="text"
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="Nguyen Van A"
                required
              />
            </div>
            <div>
              <label htmlFor="" className="mb-2 text-sm font-medium">
                Position
              </label>
              <input
                type="text"
                className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
                placeholder="Staff"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="mb-2 text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
              placeholder="Ward 12, Go Vap District, Ho Chi Minh City, Vietnam"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="mb-2 text-sm font-medium">
              Confirm password
            </label>
            <input
              type="password"
              className="mt-2 bg-gray-50 border border-gray-300 text-sm rounded-xl outline-none w-full p-2.5 "
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded-xl outline-none"
                required
              />
            </div>
            <label htmlFor="" className="ml-4 text-sm font-medium">
              I agree with the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                terms and conditions
              </a>
              .
            </label>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button
              text="Save"
              onclickFunc={() => {}}
              background="bg-cyan-500"
              hoverBackground="hover:bg-cyan-400"
            />
            <Button
              text="Cancel"
              onclickFunc={openAddMemberPopup}
              background="bg-cyan-500"
              hoverBackground="hover:bg-cyan-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewMember;
