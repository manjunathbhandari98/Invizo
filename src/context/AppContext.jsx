import { createContext, useEffect, useState } from "react";
import { getCategories } from "../service/categoryService.js";
import { getItems } from "../service/itemService.js";
import { getUsers } from "../service/userService.js";

// Creating a React context with initial value `null`
// This context will be used to share global app state (like categories, auth data) without prop drilling

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

// Creating a context provider component
// This wraps around your application and provides access to shared global state
export const AppContextProvider = ({ children }) => {
  //  State to hold categories fetched from the backend
  const [categories, setCategories] = useState([]);

  const [items, setItems] = useState([]);

  const [users, setUsers] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  //  State to hold authentication data (token and user role)
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });

  //  Function to add an item to cart (or increase quantity if already exists)
  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItem) {
      // If item already exists, increment its quantity
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If new item, add it to cart with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromTheCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updatedCartQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    console.log(cartItems);
  };

  // useEffect hook runs once when the component mounts
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      setAuthData(localStorage.getItem("token"), localStorage.getItem("role"));
    }
    const loadData = async () => {
      const response = await getCategories(); // Fetch categories from backend
      setCategories(response); // Update the category state
    };

    const loadItems = async () => {
      const response = await getItems();
      setItems(response.data);
    };

    const loadUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };

    loadData(); // Initial category load
    loadItems();
    loadUsers();
  }, []);

  // Function to update authentication state from anywhere in the app
  // Used after login/logout to set token and role
  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Value object that will be shared across all components using AppContext
  const contextValue = {
    categories, // List of all categories
    setCategories, // Function to update categories
    auth, // Authentication data (token and role)
    setAuthData, // Function to update authentication data,
    items, // List of all items
    setItems, //Function to update items
    users, //List of all users
    setUsers, // Function to update users
    addToCart,
    cartItems,
    removeFromTheCart,
    updatedCartQuantity,
    clearCart,
  };

  // Providing the context value to all children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
