import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface InstructionItemProps {
  number: string;
  title: string;
  description: string;
}

const InstructionItem = ({
  number,
  title,
  description,
}: InstructionItemProps) => {
  return (
    <div className="flex">
      <div className="min-w-min min-h-min">
        <p className="h-10 w-10 bg-green-900/5 text-green-900/70 flex justify-center items-center rounded-full m-2">
          {number}
        </p>
      </div>
      <div>
        <h3 className="text-xl text-green-900/70">{title}</h3>
        <p className="text-sm text-neutral-700 mt-1 leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-sm px-4">
      <h2 className="text-2xl font-medium text-green-900/60">
        Here is how can you order
      </h2>
      <InstructionItem
        number="1"
        title="Choose products"
        description="Choose the product you want by adding to cart"
      />
      <InstructionItem
        number="2"
        title="Place an order"
        description="Place an order by the product you choose"
      />
      <InstructionItem
        number="3"
        title="Confirm order"
        description="We will contact you to confirm you order"
      />
      <InstructionItem
        number="4"
        title="Receive your order"
        description="Your order will be ship out as soon as possible"
      />
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col gap-12">
      <div className="flex flex-col md:flex-row gap-12 md:gap-0 mt-6">
        <div className="md:px-4 md:w-1/2">
          <img
            className="w-full h-full md:rounded-sm md:ring-1 md:ring-black md:ring-opacity-5"
            src="../../../public/zz-plant-gray-pot.jpg"
          />
        </div>
        <div className="md:w-1/2 px-4 flex flex-col gap-y-4">
          <h2 className="text-2xl font-medium text-green-900/60">
            Bring Nature Home with Our Plants
          </h2>
          <p className="text-neutral-700 text-base leading-relaxed">
            Plants are a beautiful and beneficial addition to any home. They can
            improve air quality, reduce stress levels, and boost mood. We have a
            wide selection of plants to choose from, so you're sure to find the
            perfect one for your needs.
          </p>
          <p className="text-neutral-700 text-base leading-relaxed">
            Shop our collection of plants today and start enjoying the benefits
            of bringing nature home!
          </p>
          <Link
            to="/plants"
            className="text-sm font-medium text-green-900/80 hover:bg-green-900/5 rounded-full h-10 px-4 py-auto flex items-center justify-center gap-2 hover:scale-105 transition-all"
          >
            Find new plants for your collection
            <ArrowLongRightIcon className="h-5 w-5 stroke-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-0">
        <div className="md:px-4 md:w-1/2">
          <img
            className="w-full h-full md:rounded-sm md:ring-1 md:ring-black md:ring-opacity-5"
            src="../../../public/monstera-plant-white-pot.jpg"
          />
        </div>
        <div className="md:w-1/2 px-4 flex flex-col gap-y-4">
          <h2 className="text-2xl font-medium text-green-900/60">
            Plant accessories are a great way to show your love for plants
          </h2>
          <p className="text-neutral-700 text-base leading-relaxed">
            No matter what your budget or style, there are plant accessories out
            there that you can use to show your love for plants and add
            personality to your home.
          </p>
          <p className="text-neutral-700 text-base leading-relaxed">
            So start shopping today and find the perfect plant accessories for
            your needs!
          </p>
          <Link
            to="/plants"
            className="text-sm font-medium text-green-900/80 hover:bg-green-900/5 rounded-full h-10 px-4 py-auto flex items-center justify-center gap-2 hover:scale-105 transition-all"
          >
            Get new accessories for your plants
            <ArrowLongRightIcon className="h-5 w-5 stroke-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12 md:gap-0">
        <div className="md:px-4 md:w-1/2">
          <img
            className="w-full h-full md:rounded-sm md:ring-1 md:ring-black md:ring-opacity-5"
            src="../../../public/peace-lily-plant-white-pot.jpg"
          />
        </div>
        <div className="md:w-1/2">
          <Instructions />
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center gap-4 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-green-900/60">
            Want to know more about us?
          </h2>
          <p className="text-neutral-700 text-base leading-relaxed">
            Check out our soical medias
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL8dZXjD8meS_WZzEKSReIBPLzKaW3HboH&index=1"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-900/50 transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="background"
              viewBox="0 0 16 16"
            >
              {' '}
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />{' '}
            </svg>
          </Link>
          <Link
            to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL8dZXjD8meS_WZzEKSReIBPLzKaW3HboH&index=1"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-900/50 transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="background"
              viewBox="0 0 16 16"
            >
              {' '}
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />{' '}
            </svg>
          </Link>
          <Link
            to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL8dZXjD8meS_WZzEKSReIBPLzKaW3HboH&index=1"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-900/50 transition-all hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="background"
              viewBox="0 0 16 16"
            >
              {' '}
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />{' '}
            </svg>
          </Link>
          <Link
            to="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL8dZXjD8meS_WZzEKSReIBPLzKaW3HboH&index=1"
            className="flex items-center justify-center w-10 h-10 rounded-full fill-green-900/50 transition-all hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              {' '}
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />{' '}
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
