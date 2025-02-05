//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt&authuser=0

import { Person } from "../domain/Person";
import { addAuth, removeAuth } from "./auth.repository";
import { app } from "./firebase";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore/lite";

const db = getFirestore(app);

export async function addPerson(person: Person) {
    return addAuth(person.email, person.password)
        .then(async userCredential => {
            // Signed up
            const user = userCredential.user;
            //person.auth = user.uid;
            person.password = "";

            return await setDoc(doc(db, "person", user.uid), {
                ...person,
            });
            // ...
        })
        .catch(error => {
            removeAuth();
            const errorCode = error.code;
            const errorMessage = error.message;
            throw new Error(error);

            // ..
        });
}

export async function queryPerson() {
    const q = query(collection(db, "person"), where("isActive", "==", true));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

    return querySnapshot;
}

export async function getPerson(idDoc: string) {
    const docRef = doc(db, "person", idDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    return docSnap;
}
