import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response);
    }
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        </div>
    );
}

export default SignIn;