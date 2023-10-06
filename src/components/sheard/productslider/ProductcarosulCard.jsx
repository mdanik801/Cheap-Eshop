import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
export default function ProductcarosulCard(product) {
   let p = product.product;

   // let overalltaxt = 10 / 100;
   // let overallcommision = 10 / 100;
   // let extraforfun = 10 / 100;
   // let mrp = parseInt(p.price);
   // mrp = mrp + overalltaxt * mrp + overallcommision * mrp + extraforfun * mrp;
   // const selprice = mrp - extraforfun;
   return (
      <div className="mini-product-container">
         <div className="cards">
            <div className="d-flex justify-content-center">
               <img src={p.productimg} className="imgs card-img-top" alt="..." />
            </div>
            <hr />
            <div className="cards-body ">
               <p className="cards-title d-flex justify-content-center">{p.producttitle}</p>
            </div>
            <h6 className="d-flex justify-content-center ">
               MRP: <p>৳{p.price}</p>
            </h6>
            <div className="cards-footer d-flex justify-content-center">
               <a href={`/product/${p.id}/${p.producttype}/`}>
                  <button className="showmore">More Details &gt;...</button>
               </a>
            </div>
         </div>
      </div>
   );
}
