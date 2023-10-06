import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./sheard/Navbar";
import Spinner from "./loader.gif";

export default function Login() {
   //hoks............
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [errorMsg, setErrorMsg] = useState("");
   const [successMsg, setSuccessMsg] = useState("");
   const auth = getAuth();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

   const handleLogin = async (e) => {
      setIsLoading(true);
      e.preventDefault();

      await signInWithEmailAndPassword(auth, email, password)
         .then(() => {
            setIsLoading(false);
            setSuccessMsg("You successfully Log in");
            setEmail(""),
               setPassword(""),
               setErrorMsg(""),
               setTimeout(() => {
                  setSuccessMsg("");

                  navigate("/home");
               }, 1200);
         })
         .catch((error) => {
            console.log(error);
            if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
               setErrorMsg("Please fill requires all fields ");
               setIsLoading(false);
            }
            if (error == "FirebaseError: Firebase: Error (auth/missing-password).")
               setErrorMsg("Email not found");
            setIsLoading(false);
            if (error == "FirebaseError: Firebase: Error (auth/invalid-login-credentials).") {
               setErrorMsg("Wrong Password");
               setIsLoading(false);
            }
         });
   };

   return (
      <div>
         <Navbar />
         <div>
            <div className="box-container">
               <div className="box-login box">
                  <span className="borderline-login"></span>
                  <form>
                     <h2>Log in</h2>
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
                        <span>Passwoard</span>
                        <i></i>
                     </div>
                     <div className="links">
                        <span>If you have no account</span>
                        <Link to="/signup">Sign Up</Link>
                     </div>
                     <div className="Submitsec">
                        <input type="submit" value="Log in" onClick={handleLogin} />
                        {isLoading && <img src={Spinner} alt="no img" />}
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
