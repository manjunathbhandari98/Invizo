import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteCategory } from "../../service/categoryService.js";
import "./CategoryList.css";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDeleteCategory = async (id) => {
    try {
      const response = await deleteCategory(id);
      if (response.status === 204) {
        const updatedCategories = categories.filter(
          (category) => category.categoryId !== id
        );
        setCategories(updatedCategories);
        toast.success("Category deleted!");
      } else {
        toast.error("Category Cannot be Deleted");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ohh! Something went wrong");
    }
  };

  return (
    <div className="category-list-container">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by item name"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <div className="row g-2 p-2">
        {filteredCategories.map((category, index) => (
          <div className="" key={index}>
            <div
              className="card p-3"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={category.imgUrl}
                    alt={category.name}
                    className="category-img"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-white">
                    {" "}
                    {category.itemsCount == 0
                      ? "No Item"
                      : category.itemsCount == 1
                      ? category.itemsCount + " Item"
                      : category.itemsCount + " Items"}
                  </p>
                </div>
                <div
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteCategory(category.categoryId)}
                >
                  <i className="bi bi-trash"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
