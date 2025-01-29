import {
    auth,
    getLoginGoogle,
    postLoginEmail,
} from "@/core/infra/auth.repository";
import { Person } from "../domain/Person";

export const authService = {
    loginEmail,
    loginGoogle,
    getAuthUser,
};

async function loginEmail(email: string, password: string) {
    return await postLoginEmail(email, password)
        .then(res => {
            const user = res.user;
            return <Person>{
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
            };
        })
        .catch(error => {
            console.error(">>> error:", error);
            throw new Error("Email ou senha inválidos!");
        });
}

async function loginGoogle() {
    return await getLoginGoogle()
        .then(res => {
            const user = res;
            const person = <Person>{
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
            };
        })
        .catch(error => {
            console.error(">>> error:", error);
            throw new Error("Email ou senha inválidos!");
        });
}

function getAuthUser() {
    auth.currentUser;
    const user = auth.currentUser;
    return <Person>{
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
    };
}
