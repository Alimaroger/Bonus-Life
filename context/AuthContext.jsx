import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Fonction pour comparer deux objets utilisateur
const isEqualUser = (a, b) => {
  if (!a || !b) return false;
  return (
    a.uid === b.uid &&
    a.email === b.email &&
    a.subscription === b.subscription &&
    a.joinDate === b.joinDate
  );
};

// Fournisseur de contexte
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setIsLoading(true);
        setError(null);

        if (!user) {
          setCurrentUser(null);
          setIsLoading(false);
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        const userData = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          ...(userSnap.exists()
            ? userSnap.data()
            : {
                subscription: "Free",
                joinDate: null,
              }),
        };

        // ⚠️ Met à jour seulement si les données ont réellement changé
        setCurrentUser((prev) => {
          if (!isEqualUser(prev, userData)) {
            return userData;
          }
          return prev;
        });
      } catch (error) {
        console.error("Auth state error:", error);
        setError(error);
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
          });
        }
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Méthode d'inscription
  const signup = async (email, password) => {
    try {
      setError(null);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  // Méthode de connexion
  const login = async (email, password) => {
    try {
      setError(null);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  // Méthode de déconnexion
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isLoading,
    error,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
