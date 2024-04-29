import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import store from "./redux/features/store.js";
import { Provider } from "react-redux";

//Private Route

import PrivateRoute from "./components/PrivateRoute.jsx";

// Auth
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/User/Profile.jsx";

import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Home from "./pages/Home.jsx";


import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";


import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserOrder from "./pages/User/UserOrder.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route index={true} path="/" element={<Home />}/>
    <Route path="/favorites" element={<Favorites />}/>
    <Route path="/product/:id" element={<ProductDetails />}/>
    <Route path="/cart" element={<Cart />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/user-orders" element={<UserOrder />} />
    
    


    <Route path="" element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/shipping" element={<Shipping />} />
    <Route path="/placeorder" element={<PlaceOrder />} />
    <Route path="/order/:id" element={<Order />} />
      </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />}></Route>
        <Route path="categorylist" element={<CategoryList />}></Route>
        <Route path="productlist" element={<ProductList />}></Route>
        <Route path="allproductslist" element={<AllProducts />}></Route>
        <Route path="orderlist" element={<OrderList />}></Route>
        <Route path="product/update/:_id" element={<ProductUpdate />}></Route>
        <Route path="dashboard" element={<AdminDashboard />}></Route>

      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
    <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
