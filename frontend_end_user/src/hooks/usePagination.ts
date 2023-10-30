import { useSearchParams } from 'react-router-dom';

const usePagination = (limit: number, total: number) => {
  const [params, setParams] = useSearchParams();

  const setPage = (p: number) => {
    if (p <= 0 || p > Math.ceil(total / limit)) return;

    params.set('page', String(p));
    setParams(params);
  };

  return setPage;
};

export default usePagination;
