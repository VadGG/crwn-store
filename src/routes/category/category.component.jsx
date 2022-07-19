import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

import { Fragment, useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCategoryMap,
  selectCategoryIsLoading,
} from "../../store/categories/category.selector.js";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoryMap);
  const isLoading = useSelector(selectCategoryIsLoading);

  const [products, SetProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    SetProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
