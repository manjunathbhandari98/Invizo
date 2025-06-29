import CategoryComponent from "../../Category/Category";
import { assets } from "./../../../assets/assets";
import "./Categories.css";

const CategoryForm = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="row g-3" style={{ width: "100%", margin: 0 }}>
      <div className="col-md-3 col-sm-6" style={{ padding: "0 10px" }}>
        <CategoryComponent
          categoryName="All Items"
          imgUrl={assets.allCategory}
          numberOfItems={categories.reduce(
            (acc, cat) => acc + cat.itemsCount,
            0
          )}
          bgColor="#6c757d"
          isSelected={selectedCategory === ""}
          onClick={() => setSelectedCategory("")}
        />
      </div>

      {categories.map((category) => (
        <div
          className="col-md-3 col-sm-6"
          key={category.categoryId}
          style={{ padding: "0 10px" }}
        >
          <CategoryComponent
            categoryName={category.name}
            imgUrl={category.imgUrl}
            numberOfItems={category.itemsCount}
            bgColor={category.bgColor}
            isSelected={selectedCategory === category.categoryId}
            onClick={() => setSelectedCategory(category.categoryId)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryForm;
