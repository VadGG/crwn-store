import { BackgroundImage, Body, Container } from "./category-item.styles.jsx";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();

  const goToCategoryHandler = () => {
    navigate(`shop/${title}`);
  }

  return (
    <Container onClick={goToCategoryHandler}>
      <BackgroundImage imageUrl={imageUrl}/>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </Container>
  );
};

export default CategoryItem;
