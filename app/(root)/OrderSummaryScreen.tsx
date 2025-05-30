import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Image,
} from "react-native";
import {
	Ionicons,
	MaterialIcons,
	Feather,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import NotesToRestaurantsModal from "../../components/NotesToRestaurantsModal";
import RidersInstructionModal from "../../components/RidersInstructionModal";
import DateTimePickerModal, {
	type DateTimeSelection,
} from "../../components/DateTimePicket";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import exploreData from "../(tabs)/explore/data";
import { useRouter } from "expo-router";

const OrderSummaryScreen: React.FC = () => {
	const router = useRouter()
	const [deliveryTime, setDeliveryTime] = useState<"now" | "schedule">("now");
	const [notesToRestaurant, setNotesToRestaurant] = useState<string>("");
	const [ridersInstruction, setRidersInstruction] = useState<string>("");
	const [notesModalVisible, setNotesModalVisible] = useState<boolean>(false);
	const [ridersModalVisible, setRidersModalVisible] = useState<boolean>(false);
	const [dateTimeModalVisible, setDateTimeModalVisible] =
		useState<boolean>(false);
	const [selectedDateTime, setSelectedDateTime] =
		useState<DateTimeSelection | null>(null);
	const [selectedTime, setSelectedTime] = useState<string>("Schedule");
	const [errorType, setErrorType] = useState<string | null>(null);

	const foodName = ["Spicy Jollof Rice", "Good Burger", "Beans and Plantain", "Meat Pie"][3]; // Example food name, replace with actual selection logic
	// Find the food item from exploreData
	const foodItem = exploreData.find(
		(item) => item.foodName.toLowerCase() === foodName.toLowerCase()
	);
	const foodAmount = typeof foodItem?.price === 'number' ? foodItem.price : 0;
	const deliveryFee = 1000;
	const serviceFee = 100;
	const totalAmount = foodAmount + deliveryFee + serviceFee;

	const handleOpenDateTimePicker = (): void => {
		setDeliveryTime("schedule");
		setDateTimeModalVisible(true);
	};

	const handleSave = (): void => {
		if (selectedTime === "Schedule") {
			setErrorType("time");
		} else {
			setErrorType(null);
			// Add save logic here
		}
	};

	const handleSaveDateTime = (dateTime: DateTimeSelection): void => {
		setSelectedDateTime(dateTime);
		setSelectedTime(dateTime.formattedDate);
		setDeliveryTime("schedule");
		setErrorType(null);
	};

	const { user } = useUser();
	const navigation = useNavigation();

	const handleBack = () => {
		router.back();
	}
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleBack} style={styles.backButton}>
						<Ionicons name="chevron-back" size={24} color="#000" />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Order Summary</Text>
				</View>

				{/* Food Info */}
				<View style={styles.foodInfo}>
					{foodItem?.image && (
						<Image source={foodItem.image} style={styles.foodImage} />
					)}
					
					<View style={{flexDirection: "column", flex: 1}}>
						<Text style={styles.foodName}>
							{foodItem?.foodName ?? "Unknown"}
						</Text>
						<Text style={styles.billingAmount}>
							₦{foodAmount.toLocaleString()}
						</Text>
						{/* <Text style={styles.separator}>—</Text> */}
						<Text style={styles.restaurantName}>{foodItem?.vendorName ?? "Unknown"} Restaurant</Text>
					</View>
				</View>

				{/* Location Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Delivered to:</Text>
					<TouchableOpacity style={styles.locationContainer}>
						<Ionicons name="location-outline" size={20} color="#000" style={styles.locationIcon} />
						<View style={styles.locationTextContainer}>
							<Text style={styles.locationTitle}>General (Current location)</Text>
							<Text style={styles.locationAddress}>Rosebud, Oke Ila, Ado Ekiti</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.changeLocationButton}>
						<Feather name="map-pin" size={20} color="#FF8C42" />
						<Text style={styles.changeLocationText}>Change Location</Text>
					</TouchableOpacity>
				</View>

				{/* Delivery Time */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Delivery time:</Text>
					<TouchableOpacity
						style={[
							styles.timeOption,
							deliveryTime === "now" && styles.timeOptionSelected,
						]}
						onPress={() => setDeliveryTime("now")}
					>
						<View style={styles.radioContainer}>
							<View
								style={[
									styles.radioOuter,
									deliveryTime === "now" && styles.radioOuterSelected,
								]}
							>
								{deliveryTime === "now" && <View style={styles.radioInner} />}
							</View>
							<Text style={styles.timeOptionText}>Now</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.timeOption,
							deliveryTime === "schedule" && styles.timeOptionSelected,
						]}
						onPress={handleOpenDateTimePicker}
					>
						<View style={styles.radioContainer}>
							<View
								style={[
									styles.radioOuter,
									deliveryTime === "schedule" && styles.radioOuterSelected,
								]}
							>
								{deliveryTime === "schedule" && <View style={styles.radioInner} />}
							</View>
							<Text style={styles.timeOptionText}>Schedule</Text>
						</View>
						<View style={styles.scheduleContainer}>
							<Text style={styles.scheduleText}>{selectedTime}</Text>
							<MaterialIcons name="chevron-right" size={20} color="#000" />
						</View>
					</TouchableOpacity>
				</View>

				{/* Instructions */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Instructions</Text>
					<View style={styles.divider} />
					<TouchableOpacity
						style={styles.instructionOption}
						onPress={() => setNotesModalVisible(true)}
					>
						<MaterialCommunityIcons name="note-text-outline" size={20} color="#000" />
						<Text style={styles.instructionText}>Notes to Restaurants</Text>
						<MaterialIcons name="chevron-right" size={20} color="#000" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.instructionOption}
						onPress={() => setRidersModalVisible(true)}
					>
						<MaterialIcons name="delivery-dining" size={20} color="#000" />
						<Text style={styles.instructionText}>Riders Instruction</Text>
						<MaterialIcons name="chevron-right" size={20} color="#000" />
					</TouchableOpacity>
				</View>

				{/* Contact Info */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Contact Info:</Text>
					<View style={styles.divider} />
					<View style={styles.contactInfo}>
						<Text style={styles.contactName}>{user?.fullName}</Text>
						<Text style={styles.contactDot}>•</Text>
						<Text style={styles.contactPhone}>
							{user?.phoneNumbers?.[0]?.phoneNumber ?? "Phone not available"}
						</Text>
						<TouchableOpacity style={styles.editButton}>
							<Feather name="edit-2" size={20} color="#000" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Billing */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Billings:</Text>
					<View style={styles.divider} />
					<View style={styles.billingItem}>
						<Text style={styles.billingText}>Food</Text>
						<Text style={styles.billingAmount}>₦{foodAmount.toLocaleString()}</Text>
					</View>
					<View style={styles.billingItem}>
						<Text style={styles.billingText}>Delivery Fee</Text>
						<Text style={styles.billingAmount}>₦{deliveryFee.toLocaleString()}</Text>
					</View>
					<View style={styles.billingItem}>
						<Text style={styles.billingText}>Service Fee</Text>
						<Text style={styles.billingAmount}>₦{serviceFee.toLocaleString()}</Text>
					</View>
					<View style={styles.divider} />
					<View style={styles.billingItem}>
						<Text style={styles.totalText}>Total</Text>
						<Text style={styles.totalAmount}>₦{totalAmount.toLocaleString()}</Text>
					</View>
				</View>

				{/* Proceed Button */}
				<TouchableOpacity style={styles.paymentButton} onPress={handleSave}>
					<Text style={styles.paymentButtonText}>Proceed to payment</Text>
				</TouchableOpacity>
			</ScrollView>

			

			{/* Modals */}
			<NotesToRestaurantsModal
				visible={notesModalVisible}
				onClose={() => setNotesModalVisible(false)}
				onSave={setNotesToRestaurant}
				initialNote={notesToRestaurant}
			/>
			<RidersInstructionModal
				visible={ridersModalVisible}
				onClose={() => setRidersModalVisible(false)}
				onSave={setRidersInstruction}
				initialInstruction={ridersInstruction}
			/>
			<DateTimePickerModal
				visible={dateTimeModalVisible}
				onClose={() => setDateTimeModalVisible(false)}
				onSave={handleSaveDateTime}
				initialDate={selectedDateTime ? selectedDateTime.date : new Date()}
			/>

			{/* Error Message */}
			{errorType && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Oops! You haven't selected a delivery time.</Text>
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
		top: 30
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	backButton: {
		marginRight: 16,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	foodInfo: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 24,
	},
	foodName: {
		fontSize: 18,
		fontWeight: "600",
	},
	foodImage: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginRight: 16,
		// marginRight: SIZES.medium,
	},
	separator: {
		marginHorizontal: 8,
		color: "#666",
	},
	restaurantName: {
		fontSize: 16,
		color: "#666",
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 12,
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	locationIcon: {
		marginRight: 12,
	},
	locationTextContainer: {
		flex: 1,
	},
	locationTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	locationAddress: {
		fontSize: 14,
		color: "#666",
	},
	changeLocationButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255, 140, 66, 0.1)",
		borderRadius: 8,
		padding: 12,
	},
	changeLocationText: {
		color: "#FF8C42",
		fontWeight: "600",
		marginLeft: 8,
	},
	timeOption: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	timeOptionSelected: {
		borderWidth: 2,
		borderColor: "#FF8C42",
	},
	radioContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	radioOuter: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#E0E0E0",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	radioOuterSelected: {
		borderColor: "#FF8C42",
	},
	radioInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#FF8C42",
	},
	timeOptionText: {
		fontSize: 16,
	},
	scheduleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	scheduleText: {
		fontSize: 14,
		color: "#666",
		marginRight: 8,
	},
	divider: {
		height: 1,
		backgroundColor: "#E0E0E0",
		marginVertical: 12,
	},
	instructionOption: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	instructionText: {
		flex: 1,
		fontSize: 16,
		marginLeft: 12,
	},
	contactInfo: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
	},
	contactName: {
		fontSize: 16,
	},
	contactDot: {
		marginHorizontal: 8,
		color: "#666",
	},
	contactPhone: {
		fontSize: 16,
		flex: 1,
	},
	editButton: {
		padding: 4,
	},
	billingItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
	},
	billingText: {
		fontSize: 16,
	},
	billingAmount: {
		fontSize: 16,
		fontWeight: "500",
	},
	totalText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	totalAmount: {
		fontSize: 18,
		fontWeight: "bold",
	},
	paymentButton: {
		backgroundColor: "#FF8C42",
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		margin: 16,
		marginBottom: 80,
	},
	paymentButtonText: {
		color: "#fff",
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

export default OrderSummaryScreen;
