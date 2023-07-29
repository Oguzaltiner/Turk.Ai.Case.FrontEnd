import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import commonNetwork from "../../common/api/commonNetwork";
import Loading from "../components/Loading";

import { useEffect } from "react";
import { useState } from "react";
import Products from "./products";
import ProductDetail from "./productDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"

        element={<Products />}
      />
      <Route
        path="product-detail"
        element={<ProductDetail />}
      />
    </Routes>
  );
};



function Layout() {
  return (
    <>
      <div>
        <>
          <div className="m-0 p-0 bg-contrast-5">
            <div className="flex">
              <main className="w-full overflow-y-auto">
                {
                  AppRoutes()
                }
              </main>
            </div>
          </div>
        </>
      </div>
      <ToastContainer />
    </>
  );
}
export default Layout;
