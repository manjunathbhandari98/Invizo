/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { addItems } from "../../service/itemService";

const ItemForm = () => {
  //  Access categories and items from AppContext
  const { categories, items, setItems } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  // Local state for image and item form fields
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
  });

  //  Generic input change handler
  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    // Update the 'data' state with the changed field value
    setData((data) => ({ ...data, [name]: value }));
  };

  //  Form submission handler
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate image before submission
    if (!image) {
      toast.error("Image can't be empty");
      return;
    }
    setLoading(true);
    // Prepare FormData with image and item data
    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addItems(formData);
      if (response.status === 201) {
        toast.success("Item added successfully");
        setLoading(false);
        //  Update global item list
        setItems([...items, response.data]);

        //  Reset form state
        setData({
          name: "",
          categoryId: "",
          description: "",
          price: "",
        });
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong...");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 my-2">
      <div className="row">
        <div className="card form-container">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              {/* 📷 Image Upload */}
              <div className="mb-3">
                <label
                  htmlFor="image"
                  className="form-label"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="img"
                    width={48}
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setImage(selectedFile);
                  }}
                />
              </div>

              {/* 🏷️ Name Input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  placeholder="Item Name"
                />
              </div>

              {/* Category Select */}
              <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">
                  Category
                </label>
                <select
                  name="categoryId"
                  className="form-control"
                  id="categoryId"
                  onChange={onChangeHandler}
                  value={data.categoryId}
                >
                  <option value="">--SELECT CATEGORY--</option>

                  {categories.map((category, index) => (
                    <option value={category.categoryId} key={index}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*  Price Input */}
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  id="price"
                  onChange={onChangeHandler}
                  value={data.price}
                  placeholder="₹ 200.00"
                />
              </div>

              {/*Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  rows={3}
                  onChange={onChangeHandler}
                  value={data.description}
                  placeholder="Item Description"
                />
              </div>

              {/*  Submit Button */}
              <button type="submit" className="btn btn-warning w-100">
                {loading ? (
                  <div
                    className="spinner-grow spinner-grow-sm text-center"
                    role="status"
                  ></div>
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
