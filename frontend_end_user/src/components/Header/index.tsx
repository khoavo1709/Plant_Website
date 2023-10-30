import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import { useState } from 'react';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((v) => !v);
  };

  return (
    <header className="flex items-center px-4 text-lg w-full max-w-screen-xl flex-wrap justify-between mx-auto p-4">
      <Link to="/" className="text-xl font-bold text-green-900/70">
        #PLANT STORE
      </Link>

      <button
        className="inline-flex items-center p-2 w-10 h-10 justify-center md:hidden stroke-2"
        onClick={toggleNav}
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      <div className={`${isNavOpen ? '' : 'hidden'} w-full md:block md:w-auto`}>
        <ul className="flex flex-col p-4 space-y-2 md:p-0 md:flex-row md:space-x-4 md:space-y-0">
          <HeaderLink to="/plants" text="Plants" />
          <HeaderLink to="/accessories" text="Accessories" />
          <HeaderLink to="/carts" text="Your items" />
        </ul>
      </div>
    </header>
  );
};

export default Header;
