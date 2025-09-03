import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Image,
	Dimensions,
	Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";

const { width } = Dimensions.get("window");

const SavedNumber = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);

	const router = useRouter();

	const fallBackToDefaultAuth = () => {
		console.log("fall back to password authentication");
	};

	const alertComponent = (
		title: string,
		mess: string | undefined,
		btnTxt: string,
		btnFunc: () => void
	) => {
		return Alert.alert(title, mess, [
			{
				text: btnTxt,
				onPress: btnFunc,
			},
		]);
	};

	const handleBiometric = async () => {
		const hasHardware = await LocalAuthentication.hasHardwareAsync();
		if (!hasHardware) {
			return alertComponent(
				"Please enter your password",
				"Biometric not supported",
				"OK",
				() => fallBackToDefaultAuth()
			);
		}

		const enrolled = await LocalAuthentication.isEnrolledAsync();
		if (!enrolled) {
			return alertComponent(
				"Biometric record not found",
				"Please login with your password",
				"OK",
				() => fallBackToDefaultAuth()
			);
		}

		const result = await LocalAuthentication.authenticateAsync({
			promptMessage: "Authenticate to continue",
			cancelLabel: "Cancel",
			disableDeviceFallback: true,
		});

		if (result.success) {
			router.push("/(root)/src/location/currentLocation");
		} else {
			Alert.alert("Authentication Failed", "Please try again.");
		}
	};

	useEffect(() => {
		(async () => {
			const supported = await LocalAuthentication.hasHardwareAsync();
			setIsBiometricSupported(supported);
		})();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollView}
				keyboardDismissMode="on-drag">
				<View style={styles.header}>
					<Text style={styles.headerText}>Welcome back</Text>
					<Text style={styles.subHeaderText}>Log in to your account</Text>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Enter your phone number</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g 08139684024"
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						keyboardType="phone-pad"
					/>
				</View>

				<View style={styles.checkboxContainer}>
					<Checkbox
						value={isChecked}
						onValueChange={setIsChecked}
						style={[
							styles.checkbox,
							{ backgroundColor: isChecked ? "blue" : "white" },
						]}
					/>
					<Text style={styles.checkboxLabel}>Save Phone Number</Text>
				</View>

				<TouchableOpacity
					onPress={handleBiometric}
					style={styles.fingerprintButton}>
					<Entypo
						name="fingerprint"
						size={50}
						color="#E58945"
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, !isChecked && styles.buttonDisabled]}
					onPress={() => console.log("Continue pressed")}
					disabled={!isChecked}>
					<Text style={styles.buttonText}>Continue</Text>
				</TouchableOpacity>

				<View style={styles.signupContainer}>
					<Text style={styles.signupText}>Don't have an account?</Text>
					<TouchableOpacity
						onPress={() => router.push("../signup/registration")}>
						<Text style={styles.signupLink}> Sign Up</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SavedNumber;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#F9FAFB",
	},
	scrollView: {
		flexGrow: 1,
	},
	header: {
		marginTop: 15,
		marginBottom: 50,
	},
	headerText: {
		fontSize: 30,
		fontWeight: "bold",
	},
	subHeaderText: {
		fontSize: 18,
		color: "#666",
	},
	inputContainer: {
		marginBottom: 24,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		color: "#6B7280",
	},
	input: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 50,
		padding: 12,
		fontSize: 16,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 24,
	},
	checkbox: {
		borderRadius: 4,
		borderColor: "gray",
	},
	checkboxLabel: {
		fontSize: 18,
		fontWeight: "400",
		paddingLeft: 5,
	},
	fingerprintButton: {
		alignSelf: "center",
		marginTop: "50%",
		marginBottom: 40,
	},
	button: {
		backgroundColor: "#E58945",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonDisabled: {
		backgroundColor: "#ccc",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	signupContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	signupText: {
		fontSize: 18,
		fontWeight: "400",
		color: "#667085",
	},
	signupLink: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#E58945",
	},
});
