import React, { useEffect, useState } from "react";
import { Navbar } from "./sheard/Navbar";
import Carosusl from "./carosuls";
import { auth, db } from "./Firbase/firbaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Productslider from "./sheard/productslider/Productslider";

export default function Home() {
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

   return (
      <div className="">
         <Navbar />
         <Carosusl />
         <div className="d-flex justify-content-center mt-3">
            {" "}
            <h1
               className=" "
               style={{
                  width: "600px",
                  height: "70px",
                  backgroundColor: "rgb(19, 34, 43)",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "10px",
                  padding: "12px",
                  fontWeight: "bold",
               }}>
               Limited Time Deals
            </h1>
         </div>

         <Productslider type={"Mobile"} />
         <Productslider type={"Laptop"} />
         <Productslider type={"Camera"} />
         <Productslider type={"Shoes"} />
      </div>
   );
}
