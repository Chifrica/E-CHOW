"use client";

import { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Alert,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const ProfileDetailsScreen = () => {
	const { user } = useUser();

	// Get user data from Clerk
	const clerkFullName = user?.fullName || "";
	const clerkEmail = user?.primaryEmailAddress?.emailAddress || "";
	const profileImage = user?.imageUrl;

	const originalData = {
		name: clerkFullName,
		email: clerkEmail,
		phone: "08081040068", // Keep this as is since Clerk doesn't provide phone
		gender: "Male",
		dob: "09/02/1998",
	};

	const [name, setName] = useState(originalData.name);
	const [email, setEmail] = useState(originalData.email);
	const [phone, setPhone] = useState(originalData.phone);
	const [gender, setGender] = useState(originalData.gender);
	const [dob, setDob] = useState(originalData.dob);
	const [hasChanges, setHasChanges] = useState(false);

	// Alert on field change
	const showAlert = (fieldName: string) => {
		Alert.alert(
			`Do you want to change your ${fieldName}?`,
			"",
			[
				{ text: "Yes", style: "default" },
				{ text: "No", style: "cancel" },
			],
			{ cancelable: true }
		);
	};

	// Watch for changes
	useEffect(() => {
		const changed =
			name !== originalData.name ||
			email !== originalData.email ||
			phone !== originalData.phone ||
			gender !== originalData.gender ||
			dob !== originalData.dob;

		setHasChanges(changed);
	}, [name, email, phone, gender, dob]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons
							name="arrow-back"
							size={24}
							color="#000"
						/>
					</TouchableOpacity>
					<Text style={styles.headerText}>Profile Details</Text>
				</View>

				{/* Avatar */}
				<View style={styles.avatarContainer}>
					<Image
						source={{ uri: profileImage }}
						style={styles.avatarImage}
					/>
					<TouchableOpacity style={styles.cameraIcon}>
						<Ionicons
							name="camera"
							size={18}
							color="#EF7D44"
						/>
					</TouchableOpacity>
				</View>

				{/* Inputs */}
				<Text style={styles.label}>Full Name</Text>
				<TextInput
					style={styles.input}
					value={name}
					onChangeText={(text) => {
						setName(text);
						showAlert("full name");
					}}
				/>

				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={(text) => {
						setEmail(text);
						showAlert("email");
					}}
				/>

				<Text style={styles.label}>Phone Number</Text>
				<View style={styles.phoneRow}>
					<TextInput
						style={[styles.input, { flex: 1 }]}
						value={phone}
						onChangeText={(text) => {
							setPhone(text);
							showAlert("phone number");
						}}
					/>
					<Ionicons
						name="information-circle-outline"
						size={22}
						color="gray"
						style={{ marginLeft: 8 }}
					/>
				</View>

				<Text style={styles.label}>Gender</Text>
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={gender}
						onValueChange={(value) => {
							setGender(value);
							showAlert("gender");
						}}>
						<Picker.Item
							label="Male"
							value="Male"
						/>
						<Picker.Item
							label="Female"
							value="Female"
						/>
					</Picker>
				</View>

				<Text style={styles.label}>Date Of Birth</Text>
				<TextInput
					style={styles.input}
					value={dob}
					onChangeText={(text) => {
						setDob(text);
						showAlert("date of birth");
					}}
				/>

				<TouchableOpacity
					style={[
						styles.saveButton,
						{ backgroundColor: hasChanges ? "#EF7D44" : "#f2f2f2" },
					]}
					disabled={!hasChanges}
					onPress={() => {
						Alert.alert("Saved!", "Your profile has been updated.");
					}}>
					<Text
						style={{
							color: hasChanges ? "#fff" : "#ccc",
							fontWeight: "bold",
						}}>
						Save
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 30,
	},
	headerText: {
		fontSize: 18,
		fontWeight: "600",
	},
	avatarContainer: {
		alignItems: "center",
		marginBottom: 30,
		position: "relative",
	},
	avatarImage: {
		width: 90,
		height: 90,
		borderRadius: 45,
		backgroundColor: "#f1f1f1",
	},
	cameraIcon: {
		position: "absolute",
		bottom: 0,
		right: 120,
		backgroundColor: "#fff",
		padding: 5,
		borderRadius: 20,
		elevation: 2,
	},
	label: {
		fontWeight: "500",
		marginBottom: 5,
		marginTop: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	phoneRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	pickerWrapper: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 10,
		overflow: "hidden",
	},
	saveButton: {
		borderRadius: 10,
		paddingVertical: 15,
		alignItems: "center",
		marginTop: 30,
	},
});

export default ProfileDetailsScreen;
