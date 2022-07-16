import CategoryItem from "../category-item/category-item.component";

import {Categories} from "./category-list.styles.jsx";

const CategoryList = ({ categories }) => {
  return (
    <Categories>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Categories>
  );
};

export default CategoryList;
