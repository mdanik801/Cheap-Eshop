import React, { useEffect, useState } from "react";
import { Navbar } from "./sheard/Navbar";
import { auth, db, storage } from "./Firbase/firbaseconfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import Spinner from "./loader.gif";
import "./AddProduct.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormAction, useNavigate } from "react-router-dom";

export default function AddProduct() {
   //from hoks
   const [producttitle, setProducttitle] = useState("");
   const [producttype, setProducttype] = useState("");
   const [description, setdescription] = useState("");
   const [brand, setBrand] = useState("");
   const [customersupport, setCustomersupport] = useState("");
   const [price, setPrice] = useState("");
   const [warranty, setWarranty] = useState("");
   const [productimg, setProductimg] = useState("");
   const [specification, setSpecification] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [imgError, setImgError] = useState("");
   const [successMsg, setSuccess] = useState("");
   const [uploadError, setUploadError] = useFormAction("");

   const navigate = useNavigate();

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

   const type = ["imge/jpg", "image/jpeg", "image/png", "image/PNG"];

   const handleProductImg = (e) => {
      e.preventDefault();
      let selectedFile = e.target.files[0];
      if (selectedFile) {
         if (selectedFile && type.includes(selectedFile.type)) {
            setProductimg(selectedFile);

            setImgError("");
         } else {
            setProductimg(null);
            setImgError("please select a valid image file type(png,jpg");
         }
      } else {
         setImgError("please select your file");
      }
   };

   const loggeduser = GetCurrentuserdata();
   // if (loggeduser) {
   //    console.log(loggeduser[0].email);
   //    console.log("Profile");
   // }
   const handleAddProduct = (e) => {
      setIsLoading(true);
      e.preventDefault();

      const storageRef = ref(storage, `product-image${producttype.toUpperCase()}/${Date.now()}`);
      // console.log(storageRef._location.path);
      // console.log("Datapasss");
      uploadBytes(storageRef, productimg).then(() => {
         getDownloadURL(storageRef)
            .then((url) => {
               addDoc(collection(db, `products-${producttype.toUpperCase()}`), {
                  producttitle,
                  producttype,
                  description,
                  brand,
                  customersupport,
                  price,
                  warranty,
                  specification,
                  productimg: url,
               });

               setSuccess("Your Product is Add");

               setIsLoading(false);
               navigate("/home");
            })
            .catch((error) => {
               setUploadError("Please Upload jpg or png file");
            });
      });
   };

   return (
      <div>
         <Navbar />

         {loggeduser && loggeduser[0].email ? (
            <div>
               <div>
                  <div className="boxsell-container">
                     <div className="box-sell">
                        <span className="borderline-sell"></span>
                        <form className="add-productfrom text-center" onSubmit={handleAddProduct}>
                           <h2>Add Product for Sell</h2>

                           {successMsg && <div className="success-msg">{successMsg}</div>}

                           {uploadError && <div className="error-msg">{uploadError}</div>}
                           {imgError && (
                              <>
                                 <div>{imgError}</div>
                              </>
                           )}
                           <div className="inputFildes">
                              {/* -----------------title--------------------------- */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setProducttitle(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Product Title</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}

                              {/* --------------------type------------------------ */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setProducttype(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Product Type</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}
                              {/* -------------------brand name------------------------- */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setBrand(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Brand Name</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}
                              {/* ------------------warranty------------------------- */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setWarranty(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Warranty</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}

                              {/* -------------------description------------------------- */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setdescription(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Description</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}
                              {/* ------------------price-------------------------- */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Price Without Tax -</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}
                              {/* ------------------Specification-------------------------- */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setSpecification(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Specification -</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}
                              {/* ------------------img-------------------------- */}
                              <div className="inputbox">
                                 <input type="file" onChange={handleProductImg} required />

                                 <span>Image </span>
                              </div>
                              {/* -------------------------------------------- */}
                              {/* -----------------support-------------------------- */}
                              <div className="inputbox">
                                 <input
                                    onChange={(e) => setCustomersupport(e.target.value)}
                                    type="text"
                                    required
                                 />
                                 <span>Customersupport</span>
                                 <i></i>
                              </div>
                              {/* -------------------------------------------- */}
                              <div className="Submitsec">
                                 <input type="submit" value="Add" />

                                 {isLoading && <img src={Spinner} alt="no img" />}
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <div>
               <div>
                  <div className="boxsell-container">
                     <div className="box-sell">
                        <span className="borderline-sell"></span>
                        <form className="add-productfrom text-center">
                           <div>
                              <h1 className="error-msg">You don't have access to add product</h1>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
