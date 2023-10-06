import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Navbar } from "./sheard/Navbar";
import { auth, db } from "./Firbase/firbaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Profilepic from "../components/sheard/img/profilepic.png";

export default function Profile() {
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
   //    console.log("Profile");
   // }
   return (
      <div>
         <Navbar />
         <div className="box-container-pro">
            <div className="box-profile box">
               <span className="borderline-profile"></span>

               <div className="datasection">
                  {loggeduser ? (
                     <div className="user-data">
                        <h1 className="text-center mt-2 "> Your Profile</h1>
                        <div className=" text-center mt-5 ">
                           <img className=" rounded-circle" src={Profilepic} alt="" />
                        </div>
                        <div className="d-flex mt-3 mx-2">
                           <h5>
                              Your Name <span>: </span>{" "}
                           </h5>
                           <h5>{loggeduser[0].name}</h5>
                        </div>
                        <div className="d-flex mx-2">
                           <h5>
                              Email <span>: </span>{" "}
                           </h5>
                           <h5>{loggeduser[0].email}</h5>
                        </div>{" "}
                        <div className="d-flex mx-2">
                           <h5>
                              Phone Number <span>: </span>{" "}
                           </h5>
                           <h5>{loggeduser[0].phonenumber}</h5>
                        </div>{" "}
                        <div className="d-flex mx-2">
                           <h5>
                              Address <span>: </span>{" "}
                           </h5>
                           <h5>{loggeduser[0].address}</h5>
                        </div>{" "}
                        <div className="d-flex mx-2">
                           <h5>
                              Your Cart <span>: </span>{" "}
                           </h5>
                           <h5>{loggeduser[0].cart}</h5>
                        </div>{" "}
                     </div>
                  ) : (
                     <div className="Erorre">
                        <h2>You Are Not Login</h2>
                        <h2>Please Login</h2>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
