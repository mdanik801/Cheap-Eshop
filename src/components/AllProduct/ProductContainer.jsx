import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

export default function ProductContainer(product) {
   //    console.log("Productcontainer", product);
   let p = product.product;
   // console.log("prcImage", p);

   let mrp = parseInt(p.price);

   return (
      <div className="card m-1" style={{ width: " 18rem" }}>
         <div className="cardimg">
            <img src={p.productimg} className="card-img-top" alt="..." />
         </div>

         <hr />
         <div className="card-body">
            <Link src={`/product/${p.id}/${p.producttype}`}>
               <button className="card-title">{p.producttitle}</button>
            </Link>
         </div>
         <h6 className="d-flex justify-content-center">
            MRP: <p>৳{mrp}</p>{" "}
         </h6>
         <div className="btn  ">
            <a href={`/product/${p.id}/${p.producttype}`}>
               <button>More Details &gt;...</button>
            </a>
         </div>
      </div>
   );
}
