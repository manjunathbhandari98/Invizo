import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Login from "./pages/Login/Login.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";

const App = () =>{
    const location = useLocation();
    return(
        <div>
            {location.pathname !== '/login' && (
               <MenuBar/> 
            )}
            
            <Toaster/>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/manage-users' element={<ManageUsers />} />
                <Route path='/manage-categories' element={<ManageCategory />} />
                <Route path='/manage-items' element={<ManageItems />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/' element={<Dashboard />} />
            </Routes>

        </div>

    );
}

export default App;