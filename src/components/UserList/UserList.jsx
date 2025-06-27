/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { deleteUser } from "../../service/userService";
import "./UserList.css"; // make sure you create this for styles

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { users, setUsers } = useContext(AppContext);

  const onDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 204) {
        const updatedUsers = users.filter((user) => user.userId !== userId);
        setUsers(updatedUsers);
        toast.success("User Deleted Successfully..");
      } else {
        toast.error("Can't Delete User");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="user-list-container">
      {/* 🔍 Search Bar */}
      <div className="search-box">
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by name or email"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* User Carrds */}
      <div className="user-cards">
        {users
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user, index) => (
            <div className="user-card card p-3 mb-1" key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="user-details">
                  <h5 className="mb-1 text-white">{user.name}</h5>
                  <div className="text-white">{user.email}</div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteUser(user.userId)}
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

export default UserList;
