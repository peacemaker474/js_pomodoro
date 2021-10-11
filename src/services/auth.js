import {auth} from "./firebase";

export function signUp(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function siginIn(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}
