import React, { useEffect, useState } from "react";
import { Navbar } from "../sheard/Navbar";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../Firbase/firbaseconfig";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import "./Spacific.css";
//-----------imgim--------------
import spiner from "./img/loaders.gif";
import COD from "./img/cod.png";
import Warranty from "./img/warranty.gif";
import Replacement from "./img/replacement.png";
import Productslider from "../sheard/productslider/Productslider";
import { Link } from "react-router-dom";
export default function Specificproduct() {
   const { id, type } = useParams();
   const [product, setProduct] = useState("");
   const [successMsg, setSuccessMsg] = useState("");
   const [errorMsg, setErrorMsg] = useState("");

   const GetCurrentuserdata = () => {
      const [user, setUser] = useState("");
      const userCollactionRef = collection(db, "users");

      useEffect(() => {
         auth.onAuthStateChanged((userlogged) => {
            if (userlogged) {
               const getUsers = async () => {
                  const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                  // console.log(q);
                  const data = await getDocs(q);
                  setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
               };
               getUsers();
            } else {
               setUser(null);
            }
         });
      }, []);
      return user;
   };
   const loggeduser = GetCurrentuserdata();
   // if (loggeduser) {
   //    console.log(loggeduser[0].email);
   // }
   // const navigate = useNavigate();
   // const handleLogout = () => {
   //    auth.signOutt().then(() => {
   //       navigate("/login");
   //    });
   // };

   function GetCurrentCollection() {
      useEffect(() => {
         const getProduct = async () => {
            const docRef = doc(db, `products-${type.toUpperCase()}`, id);
            const docSnap = await getDoc(docRef);
            setProduct(docSnap.data());
         };
         getProduct();
      }, []);

      return product;
   }
   GetCurrentCollection();

   const addtocart = () => {
      if (loggeduser) {
         addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
            product,
            quantity: 1,
         })
            .then(() => {
               setSuccessMsg("Product add to cart");
            })
            .catch((error) => {
               setErrorMsg(error.massage);
            });
      } else {
         setErrorMsg("You need login first");
      }
   };

   return (
      <div>
         <Navbar />

         <div className="mainbody">
            {product ? (
               <div>
                  <div className="cardmain-body">
                     <div className="fcard d-flex">
                        {" "}
                        <div className="spacific-img">
                           <img src={product.productimg} alt="" />
                           {/* <hr /> */}
                           <div className="pro-data">
                              <p>{product.producttitle}</p>
                              <p>MRP : ৳{product.price}</p>
                           </div>
                           <div className="buy-cart  d-flex  justify-content-center ">
                              <button className="btn ">Buy Now</button>
                              <button className="btn " onClick={addtocart}>
                                 Add to Cart
                              </button>
                           </div>{" "}
                           <br />
                           {successMsg && (
                              <>
                                 <h6 className="successMsg">
                                    {successMsg}{" "}
                                    <Link to="/cart">
                                       <button>Go Cart</button>
                                    </Link>
                                 </h6>
                              </>
                           )}
                           {errorMsg && (
                              <>
                                 <h6 className="errorMsg">
                                    {errorMsg}{" "}
                                    <Link to="/login">
                                       <button className="btn">Login Here</button>
                                    </Link>
                                 </h6>
                              </>
                           )}
                        </div>{" "}
                        <div className="d-flex    data-cont">
                           <div className="pro-deatils ">
                              <h3>Details</h3>
                              <p>{product.description}</p>
                              <h3>Spacification</h3>
                              <p>{product.specification}</p>
                              <hr />
                              <div className="waranty-replace justify-content-center ">
                                 <div className="cod ">
                                    <div className="img-circle">
                                       <img src={COD} alt="" />
                                    </div>
                                    <p>Cash on Dalivery</p>
                                 </div>
                                 <div className="warranty cod">
                                    <div className="img-circle">
                                       <img src={Warranty} alt="" />
                                    </div>
                                    <p>Warranty</p>
                                 </div>

                                 <div className="replace cod">
                                    <div className="img-circle">
                                       <img src={Replacement} alt="" />
                                    </div>
                                    <p>10 Days Replacement</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row-cont d-flex justify-content-center mt-4"></div>{" "}
                  </div>
                  <div className="similar ">
                     <Productslider type={type}></Productslider>
                  </div>
               </div>
            ) : (
               <div>
                  {" "}
                  <div className="lodding">
                     <img src={spiner} alt="" /> Lodding...........
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
