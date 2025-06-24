"use client";

import { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

// Import your existing components
import DateTimePickerModal from "../../components/DateTimePicket";
import MealTypeModal from "../../components/MealTypeModal";

const CreateSchedulePage = () => {
	const [selectedTime, setSelectedTime] = useState("Schedule");
	const [selectedMealType, setSelectedMealType] = useState("Breakfast");
	const [dateTimeModalVisible, setDateTimeModalVisible] = useState(false);
	const [mealTypeModalVisible, setMealTypeModalVisible] = useState(false);
	const [selectedDateTime, setSelectedDateTime] = useState(null);
	const [errorType, setErrorType] = useState(null);
	const [errorTimeout, setErrorTimeout] = useState(null);

	const router = useRouter();
	const params = useLocalSearchParams();
	const { user } = useUser();

	// Parse order data if available
	const orderData =
		typeof params.orderData === "string"
			? JSON.parse(params.orderData)
			: null;

	useEffect(() => {
		if (errorType) {
			if (errorTimeout) {
				clearTimeout(errorTimeout);
			}

			const timeout = setTimeout(() => {
				setErrorType(null);
			}, 3000);

			setErrorTimeout(timeout);
		}

		return () => {
			if (errorTimeout) {
				clearTimeout(errorTimeout);
			}
		};
	}, [errorType]);

	const handleOpenDateTimePicker = () => {
		setDateTimeModalVisible(true);
	};

	const handleSaveDateTime = (dateTime: any) => {
		setSelectedDateTime(dateTime);
		setSelectedTime(dateTime.formattedDate);
		setErrorType(null);

		if (errorTimeout) {
			clearTimeout(errorTimeout);
			setErrorTimeout(null);
		}
	};

	const handleOpenMealTypeModal = () => {
		setMealTypeModalVisible(true);
	};

	const handleSelectMealType = (mealType: any) => {
		setSelectedMealType(mealType);
		setErrorType(null);

		if (errorTimeout) {
			clearTimeout(errorTimeout);
			setErrorTimeout(null);
		}
	};

	const handleSave = () => {
		if (selectedTime === "Schedule") {
			setErrorType("time");
		} else {
			setErrorType(null);
			// Save the scheduled meal and navigate back to schedule page
			router.push("/(tabs)/schedule/scheduleScreen");
		}
	};

	const handleBack = () => {
		router.back();
	};

	const changeLocation = () => {
		router.push("/src/location/currentLocation");
	};

	// Get meal info from order data or use default
	const mealName = orderData?.meal?.name || "Spicy Jollof";
	const restaurantName = orderData?.meal?.restaurant || "Nao Restaurants";
	const totalPrice = orderData?.total || 4100;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}>
				<StatusBar barStyle="dark-content" />

				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={handleBack}>
						<Ionicons
							name="chevron-back"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Schedule your meal</Text>
				</View>

				{/* Meal Info */}
				<View style={styles.mealInfoContainer}>
					<Text style={styles.mealName}>{mealName}</Text>
					<Text style={styles.separator}>—</Text>
					<Text style={styles.restaurantName}>From {restaurantName}</Text>
				</View>

				{/* Delivery Location */}
				<Text style={styles.sectionLabel}>Delivered to:</Text>
				<TouchableOpacity style={styles.locationCard}>
					<Ionicons
						name="location-outline"
						size={22}
						color="black"
						style={styles.locationIcon}
					/>
					<View style={styles.locationTextContainer}>
						<Text style={styles.locationTitle}>General (Current location)</Text>
						<Text style={styles.locationAddress}>
							Rosebud, Oke Ila, Ado Ekiti
						</Text>
					</View>
				</TouchableOpacity>

				{/* Change Location Button */}
				<TouchableOpacity
					style={styles.changeLocationButton}
					onPress={changeLocation}>
					<Ionicons
						name="location-outline"
						size={20}
						color="#FF8C42"
					/>
					<Text style={styles.changeLocationText}>Change Location</Text>
				</TouchableOpacity>

				{/* Delivery Time */}
				<Text style={styles.sectionLabel}>Delivery time:</Text>
				<TouchableOpacity
					style={[
						styles.selectionCard,
						errorType === "time" && styles.errorSelectionCard,
					]}
					onPress={handleOpenDateTimePicker}>
					<View
						style={[
							styles.radioButton,
							errorType === "time" && styles.errorRadioButton,
						]}
					/>
					<Text
						style={[
							styles.selectionText,
							errorType === "time" && styles.errorSelectionText,
						]}>
						{selectedTime}
					</Text>
					<View style={styles.rightContainer}>
						<Text style={styles.rightText}>Set time & date</Text>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#888"
						/>
					</View>
				</TouchableOpacity>

				{/* Meal Type */}
				<Text style={styles.sectionLabel}>Meal Type:</Text>
				<TouchableOpacity
					style={styles.selectionCard}
					onPress={handleOpenMealTypeModal}>
					<View style={styles.radioButton} />
					<Text style={styles.selectionText}>{selectedMealType}</Text>
					<Ionicons
						name="chevron-forward"
						size={20}
						color="#888"
						style={styles.rightIcon}
					/>
				</TouchableOpacity>

				<MealTypeModal
					visible={mealTypeModalVisible}
					onClose={() => setMealTypeModalVisible(false)}
					onSelectMealType={handleSelectMealType}
					initialMealType={selectedMealType}
				/>

				{/* Instructions */}
				<Text style={styles.sectionLabel}>Instructions:</Text>
				<TouchableOpacity style={styles.instructionRow}>
					<Feather
						name="file-text"
						size={20}
						color="black"
					/>
					<Text style={styles.instructionText}>Notes to Restaurants</Text>
					<Ionicons
						name="chevron-forward"
						size={20}
						color="#888"
						style={styles.rightIcon}
					/>
				</TouchableOpacity>
				<View style={styles.divider} />

				<TouchableOpacity style={styles.instructionRow}>
					<Feather
						name="user"
						size={20}
						color="black"
					/>
					<Text style={styles.instructionText}>Riders Instruction</Text>
					<Ionicons
						name="chevron-forward"
						size={20}
						color="#888"
						style={styles.rightIcon}
					/>
				</TouchableOpacity>
				<View style={styles.divider} />

				{/* Contact Info */}
				<Text style={styles.sectionLabel}>Contact Info:</Text>
				<View style={styles.contactRow}>
					<View style={styles.contactTextContainer}>
						<Text style={styles.contactName}>{user?.fullName}</Text>
						<Text style={styles.dot}>•</Text>
						<Text style={styles.contactPhone}>
							{user?.phoneNumbers?.[0]?.phoneNumber ?? "Phone not available"}
						</Text>
					</View>
					<TouchableOpacity>
						<Feather
							name="edit-2"
							size={20}
							color="#888"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.divider} />

				{/* Billings */}
				<Text style={styles.sectionLabel}>Billings:</Text>
				<View style={styles.billingRow}>
					<Feather
						name="shopping-bag"
						size={20}
						color="black"
					/>
					<Text style={styles.billingText}>Food</Text>
					<Text style={styles.billingAmount}>
						₦{totalPrice.toLocaleString()}
					</Text>
				</View>
				<View style={styles.divider} />

				{/* Save Button */}
				<TouchableOpacity
					style={styles.saveButton}
					onPress={handleSave}>
					<Text style={styles.saveButtonText}>Save</Text>
				</TouchableOpacity>

				{/* Date Time Picker Modal */}
				<DateTimePickerModal
					visible={dateTimeModalVisible}
					onClose={() => setDateTimeModalVisible(false)}
					onSave={handleSaveDateTime}
					initialDate={selectedDateTime ? selectedDateTime.date : new Date()}
				/>
			</ScrollView>

			{/* Error Message with Animation */}
			{errorType && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>
						Oops! You haven't selected a delivery time.
					</Text>
					<Text style={styles.errorSubText}>Set time and date</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F8F8",
		padding: 16,
	},
	scrollContent: {
		paddingBottom: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	backButton: {
		padding: 4,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 10,
	},
	mealInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	mealName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	separator: {
		marginHorizontal: 8,
		color: "#888",
	},
	restaurantName: {
		fontSize: 16,
		color: "#555",
	},
	sectionLabel: {
		paddingTop: 20,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 8,
	},
	locationCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 8,
		padding: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#E0E0E0",
	},
	locationIcon: {
		marginRight: 12,
	},
	locationTextContainer: {
		flex: 1,
	},
	locationTitle: {
		fontSize: 16,
		fontWeight: "500",
	},
	locationAddress: {
		fontSize: 14,
		color: "#666",
		marginTop: 2,
	},
	changeLocationButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF2E9",
		borderRadius: 8,
		padding: 12,
		marginBottom: 20,
	},
	changeLocationText: {
		color: "#FF8C42",
		fontWeight: "500",
		marginLeft: 8,
	},
	selectionCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 8,
		padding: 16,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: "#E0E0E0",
	},
	errorSelectionCard: {
		borderColor: "#FF5252",
		backgroundColor: "#FFEBEB10",
	},
	radioButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#888",
		marginRight: 12,
	},
	errorRadioButton: {
		borderColor: "#FF5252",
	},
	selectionText: {
		fontSize: 16,
		flex: 1,
	},
	errorSelectionText: {
		color: "#FF5252",
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	rightText: {
		fontSize: 14,
		color: "#888",
		marginRight: 4,
	},
	rightIcon: {
		marginLeft: "auto",
	},
	instructionRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	instructionText: {
		fontSize: 16,
		marginLeft: 12,
		flex: 1,
	},
	divider: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
	contactRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	contactTextContainer: {
		flexDirection: "row",
		flex: 1,
		marginLeft: 12,
		paddingVertical: 8,
	},
	contactName: {
		fontSize: 16,
	},
	dot: {
		color: "#FF8C42",
		fontWeight: "bold",
		marginHorizontal: 8,
	},
	contactPhone: {
		fontSize: 16,
		flex: 1,
	},
	billingRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	billingText: {
		fontSize: 16,
		marginLeft: 12,
		flex: 1,
	},
	billingAmount: {
		fontSize: 16,
		fontWeight: "500",
	},
	saveButton: {
		backgroundColor: "#FF8C42",
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	saveButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	errorContainer: {
		position: "absolute",
		bottom: 80,
		left: 16,
		right: 16,
		backgroundColor: "#FFEBEB",
		borderRadius: 8,
		padding: 12,
		borderWidth: 1,
		borderColor: "#FF5252",
		alignItems: "center",
	},
	errorText: {
		color: "#FF0000",
		fontSize: 14,
		fontWeight: "500",
	},
	errorSubText: {
		color: "#FF0000",
		fontSize: 12,
		marginTop: 2,
	},
});

export default CreateSchedulePage;
