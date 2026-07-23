import { Redirect } from "expo-router";

import { Loading } from "@/components/loading/loading";
import { useAuth } from "@/context/auth-context";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading text="Carregando..." />;
  }

  if (user) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
