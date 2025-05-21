import {
	View,
	Text,
	StyleSheet,
	Image,
	Alert,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import { useGlobalContext } from "@/lib/global-provider";

const GoogleAppleSignup = () => {
	const { refetch, loading, isLoggedIn } = useGlobalContext();

	// Clerk's OAuth hook
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	if (!loading && isLoggedIn) return <Redirect href="/home/homePage" />;

	const handleGoogleLogin = async () => {
		try {
			const result = await startOAuthFlow();

			if (result?.createdSessionId) {
				// No need to call setActive
				refetch();
			} else {
				Alert.alert("Error", "Google login failed");
			}
		} catch (error) {
			console.error("Google login error:", error);
			Alert.alert("Error", "Something went wrong during Google login");
		}
	};

	const handleAppleDemo = () => {
		Alert.alert("Info", "Apple login is just a demo.");
	};

	return (
		<View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<View style={styles.horizontalLine} />
				<Text style={styles.horizontalLineText}>Or sign up with</Text>
				<View style={styles.horizontalLine} />
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					marginTop: 20,
				}}>
				{/* Google Sign In */}
				<TouchableOpacity
					onPress={handleGoogleLogin}
					style={styles.buttonContainer}>
					<Image
						source={require("../assets/icons/google.png")}
						style={styles.icon}
					/>
				</TouchableOpacity>

				{/* Apple Demo */}
				<TouchableOpacity
					onPress={handleAppleDemo}
					style={styles.buttonContainer}>
					<Image
						source={require("../assets/icons/apple.png")}
						style={{ width: 24, height: 30, margin: 8 }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default GoogleAppleSignup;

const styles = StyleSheet.create({
	horizontalLine: {
		flex: 1,
		height: 1,
		backgroundColor: "#6D6C69",
	},
	horizontalLineText: {
		width: 100,
		textAlign: "center",
		color: "#6D6C69",
		lineHeight: 24,
		letterSpacing: -0.41,
		fontSize: 16,
		fontWeight: "400",
		fontFamily: "Switzerland",
	},
	buttonContainer: {
		marginRight: 20,
		backgroundColor: "#D6D6D6",
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#D6D6D6",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		width: 24,
		height: 24,
		margin: 5,
		padding: 8,
	},
});
