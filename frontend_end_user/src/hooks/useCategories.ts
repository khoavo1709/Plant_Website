import { atom, useAtom } from 'jotai';
import { convertKeysToCamelCase } from '../../utils';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const fetchCategoreis = async () => {
  const jsonFile = '/mocks/categories.json';
  const response = await fetch(jsonFile);
  const data = (await response.json()) as Category[];
  const categories = convertKeysToCamelCase(data) as Category[];

  return categories;
};

export const categoriesAtom = atom(fetchCategoreis);

export const filteredCategoriesAtom = atom([] as Category[]);

export const useCategories = () => {
  const [params, setPrams] = useSearchParams();
  const [filteredCategories, setFilterdCategoreis] = useAtom(
    filteredCategoriesAtom
  );

  useEffect(() => {
    const IDsString = params.get('categories');
    if (IDsString) {
      const filteredIDs = JSON.parse(IDsString) as string[];
      fetchCategoreis().then((categories) => {
        const temp = [] as Category[];
        filteredIDs.forEach((id) => {
          categories.forEach((c) => {
            if (c.id == id) {
              temp.push(c);
            }
          });
        });
        console.log(JSON.stringify(temp));
        setFilterdCategoreis(temp);
      });
    }
  }, [params, setFilterdCategoreis]);

  const removeCategory = (category: Category) => {
    if (filteredCategories.some((c) => c.id === category.id)) {
      params.delete('page');
      params.set(
        'category',
        JSON.stringify(
          filteredCategories
            .filter((c) => c.id !== category.id)
            .map((c) => c.id)
        )
      );

      setPrams(params);
    }
  };

  const addCategory = (category: Category) => {
    if (filteredCategories.every((c) => c.id !== category.id)) {
      params.delete('page');
      params.set(
        'category',
        JSON.stringify([...filteredCategories.map((c) => c.id), category.id])
      );

      setPrams(params);
    }
  };

  return {
    filteredCategories,
    removeCategory,
    addCategory,
  };
};
