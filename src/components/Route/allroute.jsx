import AddProduct from "../AddProduct";
import Allprodut from "../AllProduct/Allprodut";
import Specificproduct from "../AllProduct/Specificproduct";
import Cart from "../Cart";
import Home from "../Home";
import Login from "../Login";
import Profile from "../Profile";
import Signup from "../Signup";
import PgFOF from "../sheard/PgFOF";

export const allroute = [
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "/home",
      element: <Home />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/signup",
      element: <Signup />,
   },
   {
      path: "/cart",
      element: <Cart />,
   },
   {
      path: "/profile",
      element: <Profile />,
   },
   {
      path: "/sellproduct",
      element: <AddProduct />,
   },

   //---------------------------
   {
      path: "/product-type/mobile",
      element: <Allprodut type={"Mobile"} />,
   },
   {
      path: "/product-type/laptop",
      element: <Allprodut type={"Laptop"} />,
   },
   {
      path: "/product-type/camera",
      element: <Allprodut type={"Camera"} />,
   },
   {
      path: "/product-type/shoes",
      element: <Allprodut type={"Shoes"} />,
   },
   {
      path: "/product/:id/:type",
      element: <Specificproduct />,
   },
   {
      path: "*",
      element: <PgFOF />,
   },
];
