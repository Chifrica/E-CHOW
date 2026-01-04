import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../lib/global-provider";

export default function AuthRoutesLayout() {
  const { isLoggedIn } = useGlobalContext();

  if (isLoggedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
