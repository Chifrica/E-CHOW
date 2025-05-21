import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function OAuthCallback() {
	const { isSignedIn, isLoaded } = useUser();

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			// Redirect as soon as user is signed in and data is loaded
			router.replace("/home/homePage");
		}
	}, [isLoaded, isSignedIn]);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" />
		</View>
	);
}
