import React from "react";
import Img1 from "./sheard/img/i7.jpg";
import Img2 from "./sheard/img/i3.jpg";
import Img5 from "./sheard/img/i6.jpg";
import "./Carosul.css";
export default function Carosusl() {
   return (
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
         <div className="carousel-inner rounded-1">
            <div className="carousel-item active">
               <img src={Img1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
               <img src={Img2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
               <img src={Img5} className="d-block w-100" alt="..." />
            </div>
         </div>
         <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
         </button>
         <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
         </button>
      </div>
   );
}
