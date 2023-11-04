import { atom, useAtom } from 'jotai';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategories } from '../api/get-categories';
import { objectToCamel } from 'ts-case-convert';

const categoriesAtom = atom([] as Category[]);
const filteredCategoriesAtom = atom([] as Category[]);

export const useCategories = (type: 'PLANT' | 'ACCESSORY') => {
  const [params, setPrams] = useSearchParams();
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [filteredCategories, setFilterdCategoreis] = useAtom(
    filteredCategoriesAtom
  );

  useEffect(() => {
    const IDsString = params.get('categories');
    const filteredIDs = JSON.parse(IDsString ? IDsString : '[]') as string[];

    getCategories(type).then((data) => {
      const categories = objectToCamel(data) as Category[];
      const temp = [] as Category[];

      filteredIDs.forEach((id) => {
        categories.forEach((c) => {
          if (String(c.id) == id) {
            temp.push(c);
          }
        });
      });

      setCategories(categories);
      setFilterdCategoreis(temp);
    });
  }, [params, setCategories, setFilterdCategoreis, type]);

  const removeCategory = (category: Category) => {
    if (filteredCategories.some((c) => c.id === category.id)) {
      params.delete('page');
      params.set(
        'categories',
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
        'categories',
        JSON.stringify([...filteredCategories.map((c) => c.id), category.id])
      );

      setPrams(params);
    }
  };

  return {
    categories,
    filteredCategories,
    removeCategory,
    addCategory,
  };
};
