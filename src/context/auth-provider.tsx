import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  reloadUser(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  async function reloadUser() {
    await auth.currentUser?.reload();
    setUser(auth.currentUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        reloadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
