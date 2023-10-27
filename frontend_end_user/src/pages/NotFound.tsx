import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-full p-8 text-center">
      <h1 className="text-2xl mb-4">
        Sorry, the page you were looking for was not found.
      </h1>
      <Link
        to="/"
        className="border-none text-center px-3 py-2 inline-block rounded-sm bg-rose-800 text-white"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
