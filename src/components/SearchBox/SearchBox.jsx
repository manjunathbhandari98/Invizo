import { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchKeyword(text);
    onSearch(text);
  };
  return (
    <div className="search-box">
      <div className="input-group mb-3">
        <input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search Items"
          className="form-control"
          onChange={handleInputChange}
          value={searchKeyword}
        />
        <span className="input-group-text bg-warning">
          <i className="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
};

export default SearchBox;
