//https://firebase.google.com/docs/auth/web/start?hl=pt&authuser=0#web-namespaced-api_1

import { app } from "./firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";

export const auth = getAuth(app);

export function addAuth(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function removeAuth() {
    return auth.currentUser?.delete();
}

export function postLoginEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function getLoginGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            return user;
        })
        .catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            throw new Error(error);
        });
}

export function getLogoff() {
    return signOut(auth);
}
