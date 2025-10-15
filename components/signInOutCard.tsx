import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from "react-native";
import React from "react";
import { useRouter, Redirect } from "expo-router";
import { useGlobalContext } from "../lib/global-provider";


const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const SignInOutCard = () => {
	const router = useRouter();
	const {isLoggedIn, loading} = useGlobalContext();

	const handleLogin = () => {
		router.push("/(auth)/signup/registration");
	};

	const handleGetStarted = () => {
		if (loading) {
				return (
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<ActivityIndicator size="large" />
					</View>
				);
			}
		
			if (isLoggedIn) {
				return <Redirect href="/home/homePage" />;
			} else {
				Alert.alert(
					"Login Required",
					"Please login to continue",
				[{ text: "OK", onPress: () => router.push("/(auth)/login/savedNumber") }]
			);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.getStarted}
				onPress={handleGetStarted}
			>
				<Text style={styles.getStartedTxt}>Order Now</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.signin}
				onPress={handleLogin}>
				<Text style={styles.signinTxt}>Login</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: height,
		width: width,
	},
	getStarted: {
		backgroundColor: "#E58945",
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 8,
	},
	getStartedTxt: {
		fontWeight: "500",
		fontFamily: "sans",
		textAlign: "center",
		fontSize: 25,
		padding: 10,
		color: "#FFFFFF",
	},
	signin: {
		margin: 10,
		marginTop: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#FFFFFF",
		backgroundColor: "#FFFFFF",
		elevation: 0.5,
	},
	signinTxt: {
		fontWeight: "500",
		fontFamily: "sans",
		textAlign: "center",
		color: "#667085",
		fontSize: 25,
		padding: 10,
	},
});
