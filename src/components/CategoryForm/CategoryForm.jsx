import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import { addCategory } from "../../service/categoryService.js";

const CategoryForm = () =>{
    const {categories, setCategories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [data, setData] = useState({
        name:'',
        description:'',
        bgColor:'#fffff'
    });

    // Handles input field changes (name, description, bgColor)
    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        // Update the 'data' state with the changed field value
        setData((data) => ({ ...data, [name]: value }));
    };

// Handles form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // If image is not selected, show error and stop submission
        if (!image) {
            toast.error("Image can't be Empty");
            return;
        }

        setLoading(true); // Start loader

        // Prepare form data to send as multipart/form-data
        const formData = new FormData();
        formData.append('category', JSON.stringify(data)); // Convert JS object to JSON string
        formData.append('file', image); // Add image file to form data

        try {
            // Send API request to add the category
            const response = await addCategory(formData);

            // If API returns HTTP 201 Created
            if (response.status === 201) {
                setLoading(false); // Stop loader

                toast.success("Category Added Successfully");

                // Update context with new category
                setCategories([...categories, response.data]);

                // Reset the form fields and image state
                setData({
                    name: '',
                    description: '',
                    bgColor: '#000000' 
                });
                setImage(null);
            } else {
                setLoading(false); // Stop loader on unexpected response
                toast.error("Ohh! Something went wrong");
            }
        } catch (e) {
            // Handle error during API request
            console.error(e);
            toast.error("An Error Occurred");
        } finally {
            // Always stop loading spinner, whether success or failure
            setLoading(false);
        }
    };


    return(
        <div className="mx-2 my-2">
            <div className="row">
                <div className="card form-container">
                    <div className="card-body">
                        <form action="" onSubmit={onSubmitHandler}>
                            <div className="mb-3">
                                {/* Link label to input by setting htmlFor to the input's ID */}
                                <label htmlFor="image" className="form-label" style={{ cursor: 'pointer' }}>
                                    <img
                                        src={image ? URL.createObjectURL(image) : assets.upload}
                                        alt="img"
                                        width={48}
                                    />
                                </label>

                                {/* Hidden file input - triggered by clicking the label above */}
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    className="form-control"
                                    hidden
                                    onChange={(e) => {
                                        const selectedFile = e.target.files[0];
                                        setImage(selectedFile); // ← You'll need this state
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" id="name" onChange={onChangeHandler} value={data.name} placeholder="Category Name" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea name="description" className="form-control" id="description" rows={3} onChange={onChangeHandler} value={data.description} placeholder="Category Description" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgColor" className="form-label">Background Colour</label>
                                <br/>
                                <input
                                    type="color" id="bgColor" name="bgColor" placeholder="#ffffff" value={data.bgColor} onChange={onChangeHandler}/></div>
                            <button type="submit" className="btn btn-warning w-100">
                                {loading? 'Loading...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;