import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
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
		const timer = setTimeout(() => setTimedOut(true), 5000); // 5 seconds
		return () => clearTimeout(timer);
	}, []);

	// return (
	// 	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
	// 		<ActivityIndicator size="large" />
	// 		<Text style={{ marginTop: 16 }}>Signing you in, please wait...</Text>
	// 	</View>
	// );
	return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!timedOut ? (
            <>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 16 }}>Signing you in, please wait...</Text>
            </>
        ) : (
            <>
                <Text style={{ marginTop: 16 }}>Still signing you in...</Text>
                <TouchableOpacity onPress={() => {
                    // This will reload the app
                    if (typeof window !== "undefined") {
                        window.location.reload();
                    }
                }}>
                    <Text style={{ color: "blue", marginTop: 16 }}>Restart the app</Text>
                </TouchableOpacity>
            </>
        )}
    </View>
);
}
