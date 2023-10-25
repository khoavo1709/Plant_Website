import { useState } from "react";

function Login() {
  const [errMsg] = useState("cc");

  return (
    <div>
      <section className="h-screen grid grid-cols-12">
        <img
          src="src/assets/plantsBackground.jpg"
          className="hidden md:block md:col-span-6 object-cover bg-no-repeat bg-center h-screen w-full"
        />
        <div className="md:px-[70px] md:py-[30px] p-[30px] col-span-12 md:col-span-6 h-full flex flex-col gap-4">
          <div className="flex justify-center items-center flex-1">
            <div className="bg-white shadow-2xl rounded-3xl p-[16px] md:py-[40px] md:px-[48px] w-[478px]">
              <img
                src="src/assets/plantsLogo.png"
                className="w-40 h-40 mx-auto"
              />
              <div className="text-center mb-[17px] h-[40px] flex justify-center text-4xl font-bold ">
                Login
              </div>
              <form action="" className="rounded-lg">
                {errMsg && (
                  <p className="text-red-500">Invalid email or password</p>
                )}
                <div className={`${errMsg === "" ? "mb-6" : "mb-3"}`}>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="h-10 w-full rounded-xl py-4 bg-transparent indent-4 text-base outline outline-1 outline-neutral-200 placeholder:text-neutral-600 placeholder:-translate-y-0.5 focus:bg-neutral-100 focus:outline-2 focus:outline-teal-500"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="h-10 w-full rounded-xl py-4 bg-transparent indent-4 text-base outline outline-1 outline-neutral-200 placeholder:text-neutral-600 placeholder:-translate-y-0.5 focus:bg-neutral-100 focus:outline-2 focus:outline-teal-500"
                    placeholder="Your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-teal-600 h-[46px] rounded-3xl w-full font-semibold text-[16px] text-white"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
