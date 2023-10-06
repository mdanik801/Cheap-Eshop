import React, { useState } from "react";
import Delete from "../components/AllProduct/img/delete.gif";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firbase/firbaseconfig";
export default function CartCard(props) {
   let i = props.item;
   let p = i.product;
   //-----------mrpsection----------//
   let overalltax = 10 / 100;
   let overallcommision = 10 / 100;
   let extraforfun = 10 / 100;
   let m = p.price;
   let mrp = parseInt(m);
   //-----------mrpsection----------//

   //incrementor decriment//
   const [productquantity, setProductquantity] = useState(i.quantity);
   const increasequntity = async () => {
      setProductquantity(productquantity + 1);
      const itemref = doc(db, `cart-${props.userid}`, `${i.id}`);
      await updateDoc(itemref, {
         quantity: productquantity + 1,
      }).then(() => {
         // console.log("quantity update");
         // console.log("==", i.id);
      });
   };
   const decreasequantity = async () => {
      if (productquantity >= 1) {
         setProductquantity(productquantity - 1);

         const itemRef = doc(db, `cart-${props.userid}`, `${i.id}`);
         await updateDoc(itemRef, {
            quantity: productquantity - 1,
         });
      }
   };

   mrp = mrp + overalltax * mrp + overallcommision * mrp + extraforfun * mrp;
   const sellprice = mrp - extraforfun * mrp;

   const deletcartitem = async () => {
      await deleteDoc(doc(db, `cart-${props.userid}`, `${props.item.id}`)).then(() => {
         const succdelete = `Cart Deleted`;
      });
   };
   return (
      <div className="cardbody">
         <div className="cardcont  ">
            <div className="cart-img ">
               <img src={p.productimg} alt="" />
            </div>
            <div className="cart-title">
               <h4>{p.producttitle}</h4>
               <h5>Sell Price : ৳{sellprice}</h5>
               <h5>Total Price : ৳{sellprice * productquantity}</h5>
            </div>
         </div>
         <div className="incridicri">
            <button onClick={increasequntity}>+</button>
            <p className="quantity">{productquantity}</p>
            <button onClick={decreasequantity}>-</button>
         </div>
         <button onClick={deletcartitem} className="delete">
            <img src={Delete} alt="" />
         </button>
      </div>
   );
}
