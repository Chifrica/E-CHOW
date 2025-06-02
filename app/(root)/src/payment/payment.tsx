import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	Dimensions,
	Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { usePaystack } from "react-native-paystack-webview";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const Payment = () => {
	const { popup } = usePaystack();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const confettiAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0)).current;

	const paynow = () => {
		popup.newTransaction({
			email: "chikaonwunali@gmail.com",
			amount: 10000,
			reference: `TXN_${Date.now()}`,
			onSuccess: async (res) => {
				console.log("Success", res);
				setShowSuccessModal(true);
			},
			onCancel: () => console.log("Transaction cancelled"),
			onLoad: (res) => console.log("Webview Loaded", res),
			onError: (res) => console.log("Webview Error", res),
		});
	};

	useEffect(() => {
		if (showSuccessModal) {
			Animated.parallel([
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(confettiAnim, {
					toValue: 1,
					duration: 1500,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [showSuccessModal]);

	const closeModal = () => {
		setShowSuccessModal(false);
		scaleAnim.setValue(0);
		confettiAnim.setValue(0);
	};

	const navigateToTrackOrder = () => {
		router.push("/(tabs)/orders/ordersScreen");
		closeModal();
	};

	const ConfettiPiece = ({ style, delay = 0 }) => (
		<Animated.View
			style={[
				styles.confetti,
				style,
				{
					opacity: confettiAnim,
					transform: [
						{
							translateY: confettiAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [-20, 200],
							}),
						},
						{
							rotate: confettiAnim.interpolate({
								inputRange: [0, 1],
								outputRange: ["0deg", "360deg"],
							}),
						},
					],
				},
			]}
		/>
	);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<TouchableOpacity
				onPress={paynow}
				style={styles.payButton}>
				<Text style={styles.payButtonText}>Pay Now</Text>
			</TouchableOpacity>

			<Modal
				visible={showSuccessModal}
				transparent={true}
				animationType="fade"
				onRequestClose={closeModal}>
				<View style={styles.modalOverlay}>
					<Animated.View
						style={[
							styles.modalContainer,
							{ transform: [{ scale: scaleAnim }] },
						]}>
						{/* Green Section with Confetti and Checkmark */}
						<View style={styles.greenSection}>
							{/* Confetti Animation */}
							<ConfettiPiece
								style={[styles.confettiYellow, { left: "15%", top: "20%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiGreen, { left: "25%", top: "10%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiYellow, { left: "35%", top: "25%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiGreen, { left: "45%", top: "15%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiYellow, { left: "55%", top: "30%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiGreen, { left: "65%", top: "20%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiYellow, { left: "75%", top: "10%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiGreen, { left: "85%", top: "25%" }]}
							/>

							{/* More confetti pieces */}
							<ConfettiPiece
								style={[styles.confettiYellow, { left: "10%", top: "40%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiGreen, { left: "20%", top: "50%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiYellow, { left: "80%", top: "45%" }]}
							/>
							<ConfettiPiece
								style={[styles.confettiGreen, { left: "90%", top: "35%" }]}
							/>

							{/* Checkmark Icon */}
							<View style={styles.checkmarkContainer}>
								<Text style={styles.checkmark}>✓</Text>
							</View>
						</View>

						{/* White Section with Text and Button */}
						<View style={styles.whiteSection}>
							<Text style={styles.successMessage}>
								Your payment has been received and order has been placed
								successfully.
							</Text>

							<TouchableOpacity
								style={styles.trackButton}
								onPress={navigateToTrackOrder}>
								<Text style={styles.trackButtonText}>Track Order</Text>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	payButton: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 8,
	},
	payButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: width * 0.85,
		backgroundColor: "white",
		borderRadius: 20,
		overflow: "hidden",
		elevation: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
	},
	greenSection: {
		backgroundColor: "#4CAF50",
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		overflow: "hidden",
	},
	whiteSection: {
		backgroundColor: "white",
		padding: 30,
		alignItems: "center",
	},
	checkmarkContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	checkmark: {
		fontSize: 35,
		color: "#4CAF50",
		fontWeight: "bold",
	},
	successMessage: {
		fontSize: 16,
		color: "#333",
		textAlign: "center",
		lineHeight: 22,
		marginBottom: 30,
		fontWeight: "400",
	},
	trackButton: {
		backgroundColor: "#FF8C42",
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 25,
		width: "100%",
		alignItems: "center",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	trackButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	confetti: {
		position: "absolute",
		width: 6,
		height: 6,
		borderRadius: 3,
	},
	confettiYellow: {
		backgroundColor: "#FFD700",
	},
	confettiGreen: {
		backgroundColor: "#90EE90",
	},
});

export default Payment;
