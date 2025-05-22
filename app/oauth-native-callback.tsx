import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";


export default function OAuthCallback() {
	const { isSignedIn, isLoaded } = useUser();
	const [timedOut, setTimedOut] = useState(false);


	useEffect(() => {
		if (isLoaded && isSignedIn) {
			// Redirect as soon as user is signed in and data is loaded
			router.push("/home/homePage");
		}
	}, [isLoaded, isSignedIn]);
	useEffect(() => {
  const timer = setTimeout(() => setTimedOut(true), 15000); // 15 seconds
  return () => clearTimeout(timer);
}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" />
			<Text style={{ marginTop: 16 }}>Signing you in, please wait...</Text>
		</View>
	);
}
