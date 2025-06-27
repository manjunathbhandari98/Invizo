import { useContext, useState } from "react";
import ItemComponent from "../../ItemComponent/ItemComponent";
import SearchBox from "../../SearchBox/SearchBox";
import { AppContext } from "./../../../context/AppContext";
import "./Items.css";

const Items = ({ selectedCategory }) => {
  const { items } = useContext(AppContext);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Filtering the list of items based on selected category and search keyword
  const filteredItems = items
    // First filter: check if the item's category matches the selected one
    .filter((item) => {
      // If no category is selected, include all items
      if (!selectedCategory) return true;
      return item.categoryId === selectedCategory;
    })
    // Second filter: search by item name (case-insensitive)
    .filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <div>
          <SearchBox onSearch={setSearchKeyword} />
        </div>
      </div>
      <div className="row g-3">
        {filteredItems.map((item, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <ItemComponent
              itemName={item.name}
              itemPrice={item.price}
              itemImage={item.imgUrl}
              itemId={item.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
