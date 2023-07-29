import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OrderInformation from "./features/pages/products";
import Layout from "./features/pages/Layout";

const App = () => {


  const dispatch = useDispatch();




 
  const getLayout = () => {

    
      return (
        <Layout className="min-h-screen" />
      );
   
  }

  return (
    <div className="App">
      {getLayout()}
    </div>
  );
};

export default App;
