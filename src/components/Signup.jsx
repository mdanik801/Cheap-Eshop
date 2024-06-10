import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./sheard/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./Firbase/firbaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from "./loader.gif";
import "./Login.css";

export default function Signup() {
   const [name, setName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [address, setAddress] = useState("");

   const [isLoading, setIsLoading] = useState(false);

   const usersclotion = collection(db, "users");
   console.log("===========", usersclotion);

   const [errorMsg, setErrorMsg] = useState("");
   const [successMsg, setSuccessMsg] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      setIsLoading(true);
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const initialcartvalue = 0;

            addDoc(collection(db, "users"), {
               name: name,
               email: email,
               phonenumber: phoneNumber,
               password: password,
               address: address,
               cart: initialcartvalue,
               uid: user.uid,
            })
               .then(() => {
                  setSuccessMsg("Your Account is Successfuly Created");
                  setName(""),
                     setPhoneNumber(""),
                     setEmail(""),
                     setPassword(""),
                     setErrorMsg(""),
                     setIsLoading(false);
                  setTimeout(() => {
                     setSuccessMsg("");
                     navigate("/login");
                  }, 1000);
               })
               .catch((error) => {
                  setErrorMsg(error);
                  // console.log(error, "Error1");
               });
         })
         .catch((error) => {
            console.log("s", error, "Error2");
            // if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
            //    setErrorMsg("Please fill requires all fields ");
            //    setIsLoading(false);
            // }
            if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
               setErrorMsg("Please fill requires all fields ");
               setIsLoading(false);
            }
            if (error == "FirebaseError: Firebase: Error (auth/missing-password).") {
               setErrorMsg("Please fill requires all fields ");
               setIsLoading(false);
            }

            if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
               setErrorMsg("User already exist");
               setIsLoading(false);
            }
         });
   };

   return (
      <div>
         <Navbar />
         <div>
            <div>
               <div className="box-container">
                  <div className="box">
                     <span className="borderline"></span>
                     <form>
                        <h2>Create Account</h2>

                        {successMsg && (
                           <>
                              <h6 className="successMsg">{successMsg}</h6>
                           </>
                        )}
                        {errorMsg && (
                           <>
                              <h6 className="errorMsg">{errorMsg}</h6>
                           </>
                        )}

                        <div className="inputbox">
                           <input
                              onChange={(e) => {
                                 setName(e.target.value);
                              }}
                              type="text"
                              required
                           />
                           <span>Your Name</span>
                           <i></i>
                        </div>
                        <div className="inputbox">
                           <input
                              onChange={(e) => {
                                 setPhoneNumber(e.target.value);
                              }}
                              type="tel"
                              required
                           />
                           <span>Mobile Number</span>
                           <i></i>
                        </div>
                        <div className="inputbox">
                           <input
                              onChange={(e) => {
                                 setEmail(e.target.value);
                              }}
                              type="email"
                              required
                           />
                           <span>Email</span>
                           <i></i>
                        </div>
                        <div className="inputbox">
                           <input
                              onChange={(e) => {
                                 setPassword(e.target.value);
                              }}
                              type="password"
                              required
                           />
                           <span>Password</span>
                           <i></i>
                        </div>
                        <div className="inputbox">
                           <input
                              onChange={(e) => {
                                 setAddress(e.target.value);
                              }}
                              type="text"
                              required
                           />
                           <span>Address</span>
                           <i></i>
                        </div>
                        <div className="links">
                           <span>If you have an account</span>
                           <Link to="/login">Login</Link>
                        </div>
                        <div className="Submitsec">
                           <input type="submit" value="Sign up" onClick={handleSubmit} />
                           {isLoading && <img src={Spinner} alt="no img" />}
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
