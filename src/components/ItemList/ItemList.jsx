import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../service/itemService";
import "./ItemList.css";

const ItemList = () => {
  const { items, setItems } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDeleteItems = async (id) => {
    try {
      const response = await deleteItem(id);
      if (response.status === 204) {
        const updatedItems = items.filter((item) => item.itemId !== id);
        setItems(updatedItems);
        toast.success("Item deleted!");
      } else {
        toast.error("Item Cannot be Deleted");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ohh! Something went wrong");
    }
  };

  return (
    <div className="item-list-container">
      {/* 🔍 Search Box */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by item name"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {/* 🧾 Item Cards */}
      <div className="item-cards">
        {filteredItems.map((item, index) => (
          <div className="item-card card p-3" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              {/* Left Side */}
              <div className="d-flex align-items-center">
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="item-img me-3"
                />
                <div className="item-details">
                  <h5 className="mb-1 text-white">{item.name}</h5>
                  <div className="text-white small">
                    Category: {item.categoryName}
                  </div>
                  <div className="price-card mt-1">&#8377;{item.price}</div>
                </div>
              </div>

              {/* Right Side - Delete */}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDeleteItems(item.itemId)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
