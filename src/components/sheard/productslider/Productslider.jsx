import React, { useEffect, useState } from "react";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../../Firbase/firbaseconfig";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductcarosulCard from "./ProductcarosulCard";

export default function Productslider(Props) {
   const [products, setProducts] = useState([]);
   const path = `products-${Props.type.toUpperCase()}`;
   useEffect(() => {
      const getProducts = () => {
         const productsArry = [];

         getDocs(collection(db, path))
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  productsArry.push({ ...doc.data(), id: doc.id });
                  // console.log(productsArry);
               });
               setProducts(productsArry);
            })
            .catch((error) => {
               console.error(error);
            });
      };
      getProducts();
   }, [path]);

   // console.log(tt.toLocaleUpperCase());
   //csss
   const responsive = {
      superLargeDesktop: {
         // the naming can be any, depends on you.
         breakpoint: { max: 4000, min: 3000 },
         items: 5,
      },
      desktop: {
         breakpoint: { max: 3000, min: 1024 },
         items: 5,
      },
      tablet: {
         breakpoint: { max: 1024, min: 464 },
         items: 3,
      },
      mobile: {
         breakpoint: { max: 464, min: 0 },
         items: 3,
      },
   };

   return (
      <div className="mt-3 mx-2">
         {/* <h4 className="m-3">{Props.type}</h4> */}
         <Carousel responsive={responsive}>
            {products.map((product) => (
               <ProductcarosulCard key={product.id} product={product} />
            ))}
         </Carousel>
      </div>
   );
}
