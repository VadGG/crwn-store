import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Shop from "./components/shop/shop.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./components/checkout/checkout.component";

import { checkUserSession } from "./store/user/user.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // const unsub = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch( setCurrentUser(user) );
    // });

    // return unsub;
  }, []);



  return (
    <Routes>
      <Route path='/' element={<Navigation/>} >
         <Route index element={<Home/>} />
         <Route path='shop/*' element={<Shop/>} />
         <Route path='auth' element={<Authentication/>} />
         <Route path='checkout' element={<Checkout/>} />
      </Route>
    </Routes>
  );
}

export default App;
