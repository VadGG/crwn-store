import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCategories } from '../../store/categories/category.action';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase-collections.utils";

import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect( () => {
    const getCategories = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch( setCategories(categories) );
    } 

    getCategories();
  }, [] );

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<Category/>}/>
    </Routes>
  );
};

export default Shop;
