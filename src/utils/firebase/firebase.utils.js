import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9iDcRLQCWtNnwb54rOzElxiecy4VM-r4",
  authDomain: "crwn-shop-94d18.firebaseapp.com",
  projectId: "crwn-shop-94d18",
  storageBucket: "crwn-shop-94d18.appspot.com",
  messagingSenderId: "99622844107",
  appId: "1:99622844107:web:79593078eca989bca8cd4e",
};

const filebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userDocRef;
  }

  const { displayName, email } = userAuth.user;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, { displayName, email, createdAt });
  } catch (error) {
    console.log(error);
  }

  return userDocRef;
};
