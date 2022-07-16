import {
  PreviewContainer,
  PreviewTitleLink,
  PreviewProducts,
} from "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
  console.log(title);
  console.log(products);
  return (
    <PreviewContainer>
      <h2>
        <PreviewTitleLink to={title}>{title.toUpperCase()}</PreviewTitleLink>
      </h2>
      <PreviewProducts>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </PreviewProducts>
    </PreviewContainer>
  );
};

export default CategoryPreview;
