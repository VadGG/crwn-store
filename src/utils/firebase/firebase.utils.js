import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const emailPassProvider = new EmailAuthProvider();

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;

  const {user} = userAuth;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userDocRef;
  }

  const { displayName, email } = user;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
  } catch (error) {
    console.log(error);
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser =  async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);