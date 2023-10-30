import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { objectToCamel } from 'ts-case-convert';

export interface PlantsReponse {
  page: number;
  limit: number;
  total: number;
  data: Product[];
}

export const plantsReponseAtom = atom<PlantsReponse>({
  page: 1,
  limit: 20,
  total: 0,
  data: [],
});

export const useGetPlants = () => {
  const [plantsReponse, setPlantResponse] = useAtom(plantsReponseAtom);
  const [params] = useSearchParams();

  useEffect(() => {
    const fetchPlants = async () => {
      const pageParam = params.get('page');
      let page = 1;

      if (pageParam) {
        const i = parseInt(pageParam);
        if (i > 0) {
          page = i;
        }
      }
      console.log(page);

      const jsonFile = '/mocks/plants.json';
      const response = await fetch(jsonFile);
      const data = await response.json();

      console.log(JSON.stringify(data));
      setPlantResponse(objectToCamel(data) as PlantsReponse);
    };

    fetchPlants();
  }, [params, setPlantResponse]);

  return plantsReponse;
};
