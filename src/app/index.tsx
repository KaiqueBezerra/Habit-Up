import { Redirect } from "expo-router";

import { Loading } from "@/components/ui/loading/loading";
import { useAuth } from "@/context/auth-context";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading text="Carregando..." />;
  }

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
