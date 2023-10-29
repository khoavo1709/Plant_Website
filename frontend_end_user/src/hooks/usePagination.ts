import { useSearchParams } from 'react-router-dom';

const usePagination = (limit: number, total: number) => {
  const [params, setParams] = useSearchParams();

  const setPage = (p: number) => {
    if (p <= 0 || p > Math.ceil(total / limit)) return;

    setParams({ ...params, page: String(p) });
  };

  return setPage;
};

export default usePagination;
