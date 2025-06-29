import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { addUser } from "../../service/userService";

const UserForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });
  const { users, setUsers } = useContext(AppContext);

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addUser(data);
      if (response.status === 201) {
        toast.success("User Registered Successfully");
        setLoading(false);
        setUsers([...users, response.data]);
        setData({
          name: "",
          email: "",
          password: "",
          role: "ROLE_USER",
        });
      } else {
        toast.error("User cannot be registered");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
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
            <form action="" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  onChange={onChangeHandle}
                  value={data.name}
                  placeholder="Ramesh Tripati"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  onChange={onChangeHandle}
                  value={data.email}
                  placeholder="yourname@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  onChange={onChangeHandle}
                  value={data.password}
                  placeholder="*********"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {loading ? (
                  <div
                    className="spinner-grow spinner-grow-sm text-center"
                    role="status"
                  ></div>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
