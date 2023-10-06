import "./Cart.css";
import CartCard from "./CartCard";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./Firbase/firbaseconfig";
import { Navbar } from "./sheard/Navbar";

export default function Cart() {
   function GetCurrentuserdata() {
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
   }
   const loggeduser = GetCurrentuserdata();

   const [cartdata, setCartData] = useState([]);
   if (loggeduser) {
      const getcartdata = async () => {
         const cartArray = [];
         const path = `cart-${loggeduser[0].uid}`;
         getDocs(collection(db, path))
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  cartArray.push({ ...doc.data(), id: doc.id });
               });
               setCartData(cartArray);
            })
            .catch("Error");
      };
      getcartdata();
   }

   return (
      <div>
         <Navbar />

         {cartdata.length != 0 ? (
            <div className="cartcard">
               <div className="carthead">
                  <h3>Your Cart Iteam</h3>
               </div>
               <div className="allcartitems">
                  {cartdata.map((item) => (
                     <CartCard key={item.id} item={item} userid={loggeduser[0].uid} />
                  ))}
                  <div className="proceed">
                     <button>Proceed</button>
                  </div>
               </div>
            </div>
         ) : (
            <div className="empty">
               <p>Your Cart is empty</p>
            </div>
         )}
      </div>
   );
}
