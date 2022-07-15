import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import "./sign-up-form.styles.scss";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFeilds] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFeilds(defaultFormFields);
  };

  const changeHanlder = (event) => {
    const { name, value } = event.target;
    setFormFeilds((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!displayName || !email || !password || password !== confirmPassword) {
      alert("Form input is invalid");
      return;
    }

    try {
      const res = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(res, { displayName });

      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
            label="Display Name"
          required
          onChange={changeHanlder}
          type="text"
          name="displayName"
          value={displayName}
        />
        <FormInput
            label="Email"
          required
          onChange={changeHanlder}
          type="email"
          name="email"
          value={email}
        />
        <FormInput
        label="Password"
          required
          onChange={changeHanlder}
          type="password"
          name="password"
          value={password}
        />
        <FormInput
          label="Confrim Password"
          required
          onChange={changeHanlder}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
