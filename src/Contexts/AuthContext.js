import React, { createContext, useContext, useEffect, useState } from 'react'
import '../FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext();

// to consume context
export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [currUser, setCurrUser] = useState()

    const auth = getAuth();

    async function signup(email, password, username) {

        await createUserWithEmailAndPassword(auth, email, password);

        // update profile
        await updateProfile(auth.currentUser, {
            displayName: username
        })

        const user = auth.currentUser
        setCurrUser({
            ...user
        })
    }


    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }


    function logout() {
        return signOut(auth)
    }

    const value = {
        currUser,
        signup,
        login,
        logout
    }

    // track state change -- handle loading
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrUser(user);
            setLoading(false);
        })
    }, [auth])

    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    )
}


