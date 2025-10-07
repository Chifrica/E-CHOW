import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import {
	Ionicons,
	Feather,
	MaterialIcons,
	FontAwesome,
} from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen: React.FC = () => {
	const navigateToProfileDetails = () => {
		router.push("/(root)/src/profile/profileDetailsScreen");
	};

	const { user } = useUser();
	const { signOut } = useAuth();
	const router = useRouter();
	const profileImage = user?.imageUrl;
	const email = user?.primaryEmailAddress?.emailAddress;

	const handleSignOut = async () => {
		try {
			await signOut();
			await SecureStore.deleteItemAsync("__clerk_token_cache");
			router.replace("/onBoarding");
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	const [isHidden, setIsHidden] = useState(true);
	const walletAmount = "8000.00";

	const toggleVisibility = () => {
		setIsHidden(!isHidden);
	};

	const handlePrivacyPolicy = () => {
		router.push("/(root)/src/(echowDetails)/PrivacyPolicy");
	}

	const handleAboutUs = () => {
		router.push("/(root)/src/(echowDetails)/AboutUs");
	}

	const handleReferral = () => {
		router.push("/(root)/src/(echowDetails)/Referral");
	}

	const handleFavorites = () => {
		router.push("/(root)/src/favorites/favorites");
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.header}>
					<Image
						source={{ uri: profileImage }}
						style={styles.avatar}
					/>
					<View>
						<Text style={styles.name}>{user?.fullName}</Text>
						<Text style={styles.email}>{email}</Text>
					</View>
				</View>

				<View style={styles.walletCard}>
					<View style={styles.bgCircleOne}></View>
					<View style={styles.bgCircleTwo}></View>
					<View style={styles.walletLeft}>
						<View style={styles.walletIconContainer}>
							<Ionicons
								name="wallet"
								size={20}
								color="#fff"
							/>
							<Text style={styles.walletText}>Wallet</Text>
						</View>
						<Text style={styles.walletAmount}>
							{isHidden ? "***" : `₦${walletAmount}`}
							<TouchableOpacity
								onPress={toggleVisibility}
								style={{ position: "absolute", paddingLeft: 20 }}>
								<Ionicons
									name={isHidden ? "eye-off" : "eye"}
									size={24}
									color="white"
								/>
							</TouchableOpacity>
						</Text>
					</View>
					{/* Add an alert whenever the user taps on the top-up button it will say payment development in progress*/}
					<TouchableOpacity
						style={styles.topUpButton}
						onPress={() =>
							Alert.alert(
								"Payment Development in Progress",
								"This feature is currently under development. Please check back later."
							)
						}>
						<Text style={styles.topUpText}>Top Up</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Account Information</Text>
					<Option
						icon={
							<Feather
								name="user"
								size={20}
							/>
						}
						label="Profile Details"
						onPress={navigateToProfileDetails}
					/>
					<Option
						icon={
							<Ionicons
								name="wallet-outline"
								size={20}
							/>
						}
						label="Wallet"
					/>
					<Option
						icon={
							<Feather
								name="map-pin"
								size={20}
							/>
						}
						label="Saved Addresses"
					/>
					<Option
						icon={
							<FontAwesome
								name="heart-o"
								size={20}
							/>
						}
						label="Favorites"
						onPress={handleFavorites}
					/>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>More</Text>
					<Option
						icon={
							<Ionicons
								name="chatbox-outline"
								size={20}
							/>
						}
						label="Help and Support"
					/>
					<Option
						icon={
							<Feather
								name="gift"
								size={20}
							/>
						}
						label="Referrals"
						onPress={handleReferral}
					/>
					<Option
						icon={
							<Feather
								name="file-text"
								size={20}
							/>
						}
						label="Privacy Policy and Terms"
						onPress={handlePrivacyPolicy}
					/>
					<Option
						icon={
							<Feather
								name="info"
								size={20}
							/>
						}
						label="About Us"
						onPress={handleAboutUs}
					/>
					<Option
						icon={
							<Feather
								name="star"
								size={20}
							/>
						}
						label="Rate Us"
					/>

					<Option
						icon={
							<Feather
								name="log-out"
								size={20}
								style={{ color: "red" }}
							/>
						}
						label="Log Out"
						onPress={() =>
							Alert.alert(
								"Log Out",
								"Are you sure you want to log out?",
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "OK",
										onPress: async () => {
											await handleSignOut();
											Alert.alert(
												"Success",
												"You have successfully logged out."
											);
										},
									},
								],
								{ cancelable: false }
							)
						}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const Option: React.FC<{
	icon: React.ReactNode;
	label: string;
	onPress?: () => void;
}> = ({ icon, label, onPress }) => (
	<TouchableOpacity
		style={styles.option}
		onPress={onPress}>
		<View style={styles.optionLeft}>{icon}</View>
		<Text style={styles.optionText}>{label}</Text>
		<Feather
			name="chevron-right"
			size={20}
			color="#ccc"
		/>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		backgroundColor: "#fff" 
	},
	scrollContainer: { 
		flex: 1,
		paddingHorizontal: 15 
	},
	header: { 
		flexDirection: "row", 
		alignItems: "center", 
		marginTop: 10,
		marginBottom: 20 
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 15,
		backgroundColor: "#eee",
	},
	name: { 
		fontSize: 18, 
		fontWeight: "bold" 
	},
	email: { 
		color: "#666" 
	},
	walletCard: {
		backgroundColor: "#0F172A",
		borderRadius: 15,
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 30,
		position: "relative",
		overflow: "hidden",
	},
	bgCircleOne: {
		position: "absolute",
		top: -60,
		right: -40,
		width: 100,
		height: 100,
		backgroundColor: "#FC964C4A",
		borderRadius: 75,
	},
	bgCircleTwo: {
		position: "absolute",
		bottom: 10,
		right: -50,
		width: 90,
		height: 90,
		backgroundColor: "#FC964C4A",
		borderRadius: 75,
	},
	walletLeft: {},
	walletIconContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	walletText: { 
		color: "#fff", 
		fontSize: 16, 
		marginTop: 5 
	},
	walletAmount: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 10,
	},
	topUpButton: {
		backgroundColor: "#F97316",
		paddingVertical: 8,
		paddingHorizontal: 25,
		borderRadius: 10,
	},
	topUpText: { 
		color: "#fff", 
		fontWeight: "bold" 
	},
	section: { 
		marginBottom: 30 
	},
	sectionTitle: {
		fontWeight: "600",
		fontSize: 14,
		marginBottom: 10,
		color: "#333",
	},
	option: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomColor: "#eee",
		borderBottomWidth: 1,
	},
	optionLeft: { 
		width: 30 
	},
	optionText: { 
		flex: 1, 
		marginLeft: 10, 
		fontSize: 16 
	},
	bottomNav: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 15,
		borderTopColor: "#eee",
		borderTopWidth: 1,
		backgroundColor: "#fff",
	},
	scheduleButton: {
		backgroundColor: "#F97316",
		padding: 10,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	scheduleText: { 
		color: "#fff", 
		fontSize: 10, 
		marginTop: 2 
	},
});

export default ProfileScreen;
