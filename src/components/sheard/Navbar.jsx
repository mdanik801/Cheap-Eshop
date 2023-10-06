import { Link, useNavigate } from "react-router-dom";
import Cartlogo from "./carti.gif";
import profilelogo from "./profail.gif";
import Navlogo from "./navlogo.png";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../Firbase/firbaseconfig";
export const Navbar = () => {
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
   const navigate = useNavigate();
   const handleLogout = () => {
      auth.signOut().then(() => {
         navigate("/login");
      });
   };

   const [cartData, setCartData] = useState([]);
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
         <div className="nav ">
            <Link to="/home">
               <div className="Leftcontainer">
                  <img src={Navlogo} alt="" />
               </div>
            </Link>

            <div className="Rightcontainer">
               {!loggeduser && (
                  <nav>
                     <Link to="/">
                        <button>Home</button>
                     </Link>
                     <Link to="/signup">
                        <button>Register</button>
                     </Link>
                     <Link to="/login">
                        <button>Login</button>
                     </Link>
                     <Link to="">
                        <div className="cart-btn">
                           <span className="cart-icon-css">0</span>
                           <img src={Cartlogo} alt="no img" />
                        </div>
                     </Link>
                     <Link to="/profile">
                        <img src={profilelogo} className="profile-icon" />
                     </Link>
                  </nav>
               )}
               {loggeduser && (
                  <nav>
                     <Link to="/home">
                        <button>Home</button>
                     </Link>
                     <Link to="/sellproduct">
                        <button>Sell</button>
                     </Link>

                     <Link to="">
                        <button onClick={handleLogout}>Logout</button>
                     </Link>
                     <Link to="/cart">
                        <div className="cart-btn">
                           <span className="cart-icon-css">{cartData.length}</span>
                           <img src={Cartlogo} alt="no img" />
                        </div>
                     </Link>
                     <Link to="/profile">
                        <img src={profilelogo} className="profile-icon" />
                     </Link>
                  </nav>
               )}
            </div>
         </div>
         <div className="sm-nav ">
            <nav>
               <Link to="/product-type/mobile">
                  <button className="fw-bold">Mobile</button>
               </Link>
               <Link to="/product-type/laptop">
                  <button className="fw-bold">Laptops</button>
               </Link>
               <Link to="/product-type/camera">
                  <button className="fw-bold">Camera</button>
               </Link>
               <Link to="/product-type/shoes">
                  <button className="fw-bold">Shoes</button>
               </Link>
            </nav>
         </div>
      </div>
   );
};
{
   /**

 <div className="mainnav">

      </div>

*/
}
