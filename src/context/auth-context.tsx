import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login(email: string, password: string): Promise<void>;
  register(email: string, password: string, name?: string): Promise<void>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  verifyEmail(): Promise<void>;
  updateUserProfile(displayName: string): Promise<void>;
  deleteUserProfile(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function register(email: string, password: string, name?: string) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (name?.trim()) {
      await updateProfile(user, {
        displayName: name,
      });
    }
  }

  async function updateUserProfile(displayName: string) {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName,
    });
  }

  async function deleteUserProfile() {
    if (!auth.currentUser) return;

    await deleteUser(auth.currentUser);
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Falha ao sair: ", error);
    }
  }

  async function verifyEmail() {
    if (!auth.currentUser) return;

    await sendEmailVerification(auth.currentUser);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        resetPassword,
        verifyEmail,
        updateUserProfile,
        deleteUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
