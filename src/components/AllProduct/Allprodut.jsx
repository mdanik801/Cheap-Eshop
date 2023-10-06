import React, { useEffect, useState } from "react";
import { Navbar } from "../sheard/Navbar";
import { collection, getDocs } from "firebase/firestore";
import "./Allproduct.css";
import { db } from "../Firbase/firbaseconfig";
import ProductContainer from "./ProductContainer";

// import { collection, query, onSnapshot, getDocs } from "../Firbase/firbaseconfig";

export default function Allprodut(Props) {
   const [products, setProducts] = useState([]);
   const path = `products-${Props.type.toUpperCase()}`;
   useEffect(() => {
      const getProducts = () => {
         const productsArry = [];

         //  console.log("path");
         // console.log(path);

         getDocs(collection(db, path))
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  productsArry.push({ ...doc.data(), id: doc.id });
                  // console.log(doc.id, "=>", doc.data());
                  // console.log(productsArry);
               });
               setProducts(productsArry);
            })
            .catch((error) => {
               console.log("Error");
            });
      };
      getProducts();
   }, [path]);
   // console.log("Mpath", path);
   // console.log("Product type", Props.type);
   // console.log("Product proparty", products);
   return (
      <div>
         {" "}
         <Navbar />
         <div className="AllProduct text-center d-flex">
            <h1>Top Result for {Props.type}</h1>

            <div className="allproduct ">
               <div className=" row row-cols-2 row-cols-md-4 m-1  g-2 p-2  d-flex justify-content-center">
                  {products.map((product) => (
                     <ProductContainer key={product.id} product={product} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
