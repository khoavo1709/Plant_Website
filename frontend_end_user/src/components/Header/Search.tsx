import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [params, setPrams] = useSearchParams();
  const [search, setSearch] = useState(params.get('search') || '');
  const navigate = useNavigate();

  const onSearch = () => {
    params.set('search', search.trim());
    setPrams(params);
    navigate(`search?search=${search.trim()}`);
  };

  return (
    <input
      className={`bg-transparent rounded-none boder border-transparent border-b-[1.5px] md:text-right md:focus:text-left focus:border-green-900/60 focus:outline-none placeholder:text-neutral-800 md:placeholder:text-righti ${
        search != '' ? 'border-b-green-600' : ''
      }`}
      placeholder="Search"
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearch();
        }
      }}
    />
  );
};

export default Search;
