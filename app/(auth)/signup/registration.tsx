import GoogleAppleSignup from "../../../components/googleAppleSignup";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Alert,
	Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { registerURL } from "@/app/utils/api";

const Registration = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [otpModalVisible, setOtpModalVisible] = useState(false);

	const router = useRouter();

	const handleContinue = async () => {
		const url = registerURL;
		// Password confirmation check
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match. Please try again.");
			return;
		}

		if (!email || !fullName || !password || !phoneNumber) {
			Alert.alert("Error", "Please fill in all fields.");
			return;
		}

		try {
			const response = await axios.post(
				url,
				{
					fullName,
					email,
					password,
					phoneNumber,
				}
			);

			console.log("Registration response:", response.data);
			const { success, message } = response.data;

			if (success) {
				Alert.alert("Success", message);
				setOtpModalVisible(true);
			} else {
				Alert.alert("Error", message || "Registration failed.");
			}
		} catch (error: any) {
			console.error("Registration error:", error.response?.data || error.message);
			Alert.alert(
				"Error",
				error.response?.data?.message ||
					"An error occurred. Please check your network and try again."
			);
		}
	};

	const handleVerifyOtp = () => {
		if (!otp.trim()) {
			Alert.alert("Error", "Please enter the OTP sent to your email.");
			return;
		}

		// TODO: Add API call for OTP verification once endpoint is ready
		setOtpModalVisible(false);
		Alert.alert("Success", "Email verified successfully!");
		router.push("/(root)/profile/profile");
	};

	const handleSignIn = () => {
		router.push("/login/savedNumber");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Registration</Text>
					<Text style={styles.subHeaderText}>
						You are welcome, kindly set up your account
					</Text>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Phone number</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g 08139684024"
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						keyboardType="phone-pad"
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g name@gmail.com"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Password</Text>
					<TextInput
						style={styles.input}
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Confirm Password</Text>
					<TextInput
						style={styles.input}
						placeholder="Confirm Password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Full name</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g Promise Isreal"
						value={fullName}
						onChangeText={setFullName}
						keyboardType="default"
					/>
				</View>

				<GoogleAppleSignup />

				<TouchableOpacity style={styles.button} onPress={handleContinue}>
					<Text style={styles.buttonText}>Continue</Text>
				</TouchableOpacity>

				<Text style={styles.signupText}>
					Already have an account?
					<TouchableOpacity onPress={handleSignIn}>
						<Text style={{ color: "#E58945", fontWeight: "bold", fontSize: 18 }}>
							{" "}
							Login Here{" "}
						</Text>
					</TouchableOpacity>
				</Text>
			</ScrollView>

			{/* ✅ OTP Modal */}
			<Modal visible={otpModalVisible} transparent animationType="slide">
				<View style={styles.modalOverlay}>
					<View style={styles.modalBox}>
						<Text style={styles.modalTitle}>Verify Your Email</Text>
						<Text style={styles.modalSubtitle}>
							Enter the OTP sent to your email address
						</Text>

						<TextInput
							style={styles.modalInput}
							placeholder="Enter OTP"
							value={otp}
							onChangeText={setOtp}
							keyboardType="number-pad"
						/>

						<TouchableOpacity style={styles.modalButton} onPress={handleVerifyOtp}>
							<Text style={styles.modalButtonText}>Verify OTP</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => setOtpModalVisible(false)}>
							<Text style={styles.modalCancelText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default Registration;

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
		marginBottom: 50,
		marginTop: 15,
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
		lineHeight: 20,
		letterSpacing: -0.41,
		fontFamily: "Switzerland",
	},
	input: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 50,
		padding: 12,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#E58945",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 50,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	signupText: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: 400,
		color: "#667085",
		textAlign: "center",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalBox: {
		backgroundColor: "#fff",
		padding: 25,
		borderRadius: 20,
		width: "85%",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
		color: "#333",
	},
	modalSubtitle: {
		fontSize: 14,
		color: "#555",
		marginBottom: 20,
		textAlign: "center",
	},
	modalInput: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 10,
		textAlign: "center",
		fontSize: 16,
		marginBottom: 20,
	},
	modalButton: {
		backgroundColor: "#E58945",
		paddingVertical: 12,
		paddingHorizontal: 40,
		borderRadius: 10,
	},
	modalButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	modalCancelText: {
		color: "#E58945",
		fontWeight: "600",
		marginTop: 15,
	},
});