import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Define the address interface
interface Address {
	id: string;
	name: string;
	address: string;
	isSelected?: boolean;
}

// Define the props for the modal component
interface DeliveryAddressModalProps {
	visible: boolean;
	onClose: () => void;
	onSelectAddress: (address: Address) => void;
}

const DeliveryAddressModal: React.FC<DeliveryAddressModalProps> = ({
	visible,
	onClose,
	onSelectAddress,
}) => {
	// Initial addresses state
	const [addresses, setAddresses] = useState<Address[]>([
		{
			id: "1",
			name: "General (Current location)",
			address: "Rosebud, Oke Ila, Ado Ekiti",
			isSelected: true,
		},
		{
			id: "2",
			name: "My workplace",
			address: "Oke Ureje, Poly road, Ado-Ekiti",
			isSelected: false,
		},
		{
			id: "3",
			name: "Aunt's House",
			address: "Oke Ureje, Poly road, Ado-Ekiti",
			isSelected: false,
		},
	]);

	// Handle address selection
	const handleSelectAddress = (id: string) => {
		const updatedAddresses = addresses.map((address) => ({
			...address,
			isSelected: address.id === id,
		}));

		setAddresses(updatedAddresses);

		// Find the selected address and pass it to the parent component
		const selectedAddress = updatedAddresses.find(
			(address) => address.isSelected
		);
		if (selectedAddress) {
			onSelectAddress(selectedAddress);
		}
	};

	const handleAddAddress = () => {
		router.push("/(root)/src/location/addLocation");
	};
	return (
		<Modal
			animationType="slide"
			transparent
			visible={visible}>
			<SafeAreaView style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>Delivery Address</Text>
						<TouchableOpacity onPress={onClose}>
							<Feather
								name="x"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
					</View>

					<TouchableOpacity style={styles.addNewButton} onPress={handleAddAddress}>
						<Feather
							name="plus"
							size={20}
							color="#E58945"
						/>
						<Text style={styles.addNewText}>Add New Location</Text>
					</TouchableOpacity>

					{addresses.map((address) => (
						<TouchableOpacity
							key={address.id}
							style={styles.addressItem}
							onPress={() => handleSelectAddress(address.id)}>
							<View style={styles.radioContainer}>
								<View
									style={[
										styles.radioOuter,
										address.isSelected ? styles.radioOuterSelected : null,
									]}>
									{address.isSelected && <View style={styles.radioInner} />}
								</View>
							</View>
							<View style={styles.addressContent}>
								<Text style={styles.addressName}>{address.name}</Text>
								<Text style={styles.addressText}>{address.address}</Text>
							</View>
						</TouchableOpacity>
					))}

					<TouchableOpacity
						style={styles.confirmButton}
						onPress={onClose}>
						<Text style={styles.confirmButtonText}>Got It</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#101828",
	},
	addNewButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF8F2",
		padding: 15,
		borderRadius: 10,
		marginBottom: 20,
	},
	addNewText: {
		color: "#E58945",
		fontWeight: "600",
		marginLeft: 10,
		fontSize: 16,
	},
	addressItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#F2F2F2",
	},
	radioContainer: {
		marginRight: 15,
	},
	radioOuter: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#D0D5DD",
		alignItems: "center",
		justifyContent: "center",
	},
	radioOuterSelected: {
		borderColor: "#E58945",
	},
	radioInner: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: "#E58945",
	},
	addressContent: {
		flex: 1,
	},
	addressName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#101828",
		marginBottom: 4,
	},
	addressText: {
		fontSize: 14,
		color: "#475467",
	},
	confirmButton: {
		backgroundColor: "#E58945",
		borderRadius: 10,
		padding: 15,
		alignItems: "center",
		marginTop: 20,
	},
	confirmButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default DeliveryAddressModal;
