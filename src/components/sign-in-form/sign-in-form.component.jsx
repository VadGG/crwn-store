import { useState } from "react";

import {SignInContainer, Actions} from "./sign-in-form.styles.jsx";

import {
  signInWithGooglePopup,
  signInEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

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
      await signInEmailAndPassword(email, password);
      resetFormValues();
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogleHandler = async (event) => {
    console.log("Sign in with google");

    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignInContainer>
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
        <Actions>
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogleHandler}>
            GOOGLE SIGN IN
          </Button>
        </Actions>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
