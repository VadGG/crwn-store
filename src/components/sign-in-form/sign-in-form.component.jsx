import { useState } from "react";

import {SignInContainer, Actions} from "./sign-in-form.styles.jsx";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action.js";

const defaultFormValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();

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
      dispatch(emailSignInStart(email, password));
      resetFormValues();
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogleHandler = async (event) => {
    console.log("Sign in with google");
    dispatch(googleSignInStart());
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
