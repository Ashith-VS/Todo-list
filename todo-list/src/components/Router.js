import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Listing from "./Listing";
import Create from "./Create";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listing />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/update/:id" element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
