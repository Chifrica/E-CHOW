import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function OAuthCallback() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/home/homePage");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>Signing you in...</Text>
    </View>
  );
}
