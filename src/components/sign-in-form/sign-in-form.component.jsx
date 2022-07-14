import { useState } from "react";

import "./sign-in-form.styles.scss";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const { email, password } = formValues;

  const resetFormValues = () => {
    setFormValues(defaultFormValues);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("Submitting form");
    if (!email || !password) {
      alert("Form input is invalid");
      return;
    }

    try {
      const res = await signInEmailAndPassword(email, password);
      console.log(res)
      resetFormValues();
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogleHandler = async (event) => {
    console.log("Sign in with google");

    try {
      const userRes = await signInWithGooglePopup();
      await createUserDocumentFromAuth(userRes);
      console.log(userRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          required
          onChange={changeHandler}
          type="email"
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          onChange={changeHandler}
          type="password"
          name="password"
          value={password}
        />
        <div className="actions">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogleHandler}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
