
import { RecaptchaVerifier,signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { auth } from "../Config/FirebaseConfig";

 
  function setUpRecaptcha(number) {
    console.log(number,"Reached here in captcha")

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    
    recaptchaVerifier.render();
    console.log(number)
    console.log(auth)
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

 export const googleSignin = ()=>{
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider)
  }

export default setUpRecaptcha;