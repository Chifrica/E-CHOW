"use client";

import type React from "react";
import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	ScrollView,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface CustomizeOrderModalProps {
	visible: boolean;
	onClose: () => void;
	meal: {
		name: string;
		restaurant: string;
		image: string;
		basePrice: number;
	} | null;
}

const CustomizeOrderModal: React.FC<CustomizeOrderModalProps> = ({
	visible,
	onClose,
	meal,
}) => {
	const [selectedSize, setSelectedSize] = useState("Big Size");
	const [selectedProteins, setSelectedProteins] = useState<string[]>([]);
	const [selectedDrinks, setSelectedDrinks] = useState<{
		[key: string]: number;
	}>({});
	const [quantity, setQuantity] = useState(2);
	const router = useRouter();

	if (!meal) return null;

	const sizeOptions = [
		{ name: "Big Size", price: 1500 },
		{ name: "Small size", price: 1200 },
	];

	const proteinOptions = [
		{ name: "Chicken", price: 1000 },
		{ name: "Meat", price: 1000 },
		{ name: "Fish", price: 1000 },
	];

	const drinkOptions = [
		{ name: "Beer", price: 1000 },
		{ name: "Coke", price: 800 },
		{ name: "Sosa", price: 800 },
		{ name: "Yoghurt", price: 800 },
	];

	const toggleProtein = (protein: string) => {
		setSelectedProteins((prev) =>
			prev.includes(protein)
				? prev.filter((p) => p !== protein)
				: [...prev, protein]
		);
	};

	const updateDrinkQuantity = (drink: string, change: number) => {
		setSelectedDrinks((prev) => ({
			...prev,
			[drink]: Math.max(0, (prev[drink] || 0) + change),
		}));
	};

	const calculateTotal = () => {
		const sizePrice =
			sizeOptions.find((s) => s.name === selectedSize)?.price || 0;
		const proteinPrice = selectedProteins.reduce((sum, protein) => {
			const proteinOption = proteinOptions.find((p) => p.name === protein);
			return sum + (proteinOption?.price || 0);
		}, 0);
		const drinkPrice = Object.entries(selectedDrinks).reduce(
			(sum, [drink, qty]) => {
				const drinkOption = drinkOptions.find((d) => d.name === drink);
				return sum + (drinkOption?.price || 0) * qty;
			},
			0
		);

		return (sizePrice + proteinPrice + drinkPrice) * quantity;
	};

	const handleAddToSchedule = () => {
		// Store the customized order data
		const orderData = {
			meal,
			selectedSize,
			selectedProteins,
			selectedDrinks,
			quantity,
			total: calculateTotal(),
		};

		// Navigate to schedule detail page
		router.push({
			pathname: "/(root)/create",
			params: { orderData: JSON.stringify(orderData) },
		});
		onClose();
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}>
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Ionicons
							name="basket-outline"
							size={24}
							color="#FF8C42"
						/>
						<Text style={styles.headerTitle}>Add</Text>
					</View>
					<Text style={styles.headerCenter}>Customize Order</Text>
					<TouchableOpacity
						onPress={onClose}
						style={styles.closeButton}>
						<Ionicons
							name="close"
							size={24}
							color="#000"
						/>
					</TouchableOpacity>
				</View>

				<ScrollView
					style={styles.content}
					showsVerticalScrollIndicator={false}>
					{/* Meal Image */}
					<View style={styles.imageContainer}>
						<Image
							source={{ uri: meal.image }}
							style={styles.mealImage}
						/>
						<View style={styles.restaurantBadge}>
							<Text style={styles.restaurantText}>{meal.restaurant}</Text>
						</View>
					</View>

					{/* Meal Name */}
					<Text style={styles.mealName}>{meal.name}</Text>

					{/* Size Options */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Size Option</Text>
						{sizeOptions.map((size) => (
							<TouchableOpacity
								key={size.name}
								style={styles.optionRow}
								onPress={() => setSelectedSize(size.name)}>
								<View style={styles.optionLeft}>
									<View
										style={[
											styles.radioButton,
											selectedSize === size.name && styles.radioButtonSelected,
										]}>
										{selectedSize === size.name && (
											<View style={styles.radioButtonInner} />
										)}
									</View>
									<Text style={styles.optionText}>{size.name}</Text>
								</View>
								<Text style={styles.optionPrice}>₦{size.price}</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Add Protein */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Add Protein</Text>
						{proteinOptions.map((protein) => (
							<TouchableOpacity
								key={protein.name}
								style={styles.optionRow}
								onPress={() => toggleProtein(protein.name)}>
								<View style={styles.optionLeft}>
									<View
										style={[
											styles.radioButton,
											selectedProteins.includes(protein.name) &&
												styles.radioButtonSelected,
										]}>
										{selectedProteins.includes(protein.name) && (
											<View style={styles.radioButtonInner} />
										)}
									</View>
									<Text style={styles.optionText}>{protein.name}</Text>
								</View>
								<View style={styles.optionRight}>
									<Text style={styles.optionPrice}>₦{protein.price}</Text>
									<TouchableOpacity
										style={styles.addButton}
										onPress={() => toggleProtein(protein.name)}>
										<Ionicons
											name={
												selectedProteins.includes(protein.name)
													? "remove"
													: "add"
											}
											size={16}
											color="#FF8C42"
										/>
									</TouchableOpacity>
								</View>
							</TouchableOpacity>
						))}
					</View>

					{/* Add Drink */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Add Drink</Text>
						{drinkOptions.map((drink) => (
							<View
								key={drink.name}
								style={styles.optionRow}>
								<View style={styles.optionLeft}>
									<Ionicons
										name="wine-outline"
										size={20}
										color="#666"
									/>
									<Text style={styles.optionText}>{drink.name}</Text>
								</View>
								<View style={styles.drinkControls}>
									<Text style={styles.optionPrice}>₦{drink.price}</Text>
									{selectedDrinks[drink.name] > 0 ? (
										<View style={styles.quantityControls}>
											<TouchableOpacity
												style={styles.quantityButton}
												onPress={() => updateDrinkQuantity(drink.name, -1)}>
												<Ionicons
													name="remove"
													size={16}
													color="#FF8C42"
												/>
											</TouchableOpacity>
											<Text style={styles.quantityText}>
												{selectedDrinks[drink.name]}
											</Text>
											<TouchableOpacity
												style={styles.quantityButton}
												onPress={() => updateDrinkQuantity(drink.name, 1)}>
												<Ionicons
													name="add"
													size={16}
													color="#FF8C42"
												/>
											</TouchableOpacity>
										</View>
									) : (
										<TouchableOpacity
											style={styles.addButton}
											onPress={() => updateDrinkQuantity(drink.name, 1)}>
											<Ionicons
												name="add"
												size={16}
												color="#FF8C42"
											/>
										</TouchableOpacity>
									)}
								</View>
							</View>
						))}
					</View>

					{/* Quantity */}
					<View style={styles.quantitySection}>
						<Text style={styles.sectionTitle}>No. Of pack</Text>
						<View style={styles.quantityControls}>
							<TouchableOpacity
								style={styles.quantityButton}
								onPress={() => setQuantity(Math.max(1, quantity - 1))}>
								<Ionicons
									name="remove"
									size={20}
									color="#FF8C42"
								/>
							</TouchableOpacity>
							<Text style={styles.quantityText}>{quantity}</Text>
							<TouchableOpacity
								style={styles.quantityButton}
								onPress={() => setQuantity(quantity + 1)}>
								<Ionicons
									name="add"
									size={20}
									color="#FF8C42"
								/>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>

				{/* Bottom Actions */}
				<View style={styles.bottomActions}>
					<TouchableOpacity
						style={styles.scheduleButton}
						onPress={handleAddToSchedule}>
						<Text style={styles.scheduleButtonText}>
							Add This Meal to Schedule
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.orderButton}>
						<Text style={styles.orderButtonText}>
							₦{calculateTotal().toLocaleString()} • Order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 8,
		color: "#FF8C42",
	},
	headerCenter: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
	},
	closeButton: {
		padding: 4,
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
	},
	imageContainer: {
		position: "relative",
		marginVertical: 16,
	},
	mealImage: {
		width: "100%",
		height: 200,
		borderRadius: 12,
		backgroundColor: "#f0f0f0",
	},
	restaurantBadge: {
		position: "absolute",
		bottom: 16,
		right: 16,
		backgroundColor: "rgba(0,0,0,0.7)",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	restaurantText: {
		color: "white",
		fontSize: 14,
		fontWeight: "500",
	},
	mealName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 24,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
		marginBottom: 16,
		backgroundColor: "#f8f8f8",
		padding: 12,
		borderRadius: 8,
	},
	optionRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
	},
	optionLeft: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	radioButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#ddd",
		marginRight: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	radioButtonSelected: {
		borderColor: "#FF8C42",
	},
	radioButtonInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#FF8C42",
	},
	optionText: {
		fontSize: 16,
		color: "#000",
	},
	optionPrice: {
		fontSize: 16,
		fontWeight: "600",
		color: "#000",
	},
	optionRight: {
		flexDirection: "row",
		alignItems: "center",
	},
	addButton: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 12,
	},
	drinkControls: {
		flexDirection: "row",
		alignItems: "center",
	},
	quantityControls: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 12,
	},
	quantityButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
	},
	quantityText: {
		fontSize: 16,
		fontWeight: "600",
		marginHorizontal: 16,
		minWidth: 20,
		textAlign: "center",
	},
	quantitySection: {
		marginBottom: 24,
	},
	bottomActions: {
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: "#f0f0f0",
	},
	scheduleButton: {
		backgroundColor: "#FF8C42",
		borderRadius: 25,
		paddingVertical: 12,
		paddingHorizontal: 24,
		alignItems: "center",
		marginBottom: 12,
	},
	scheduleButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	orderButton: {
		backgroundColor: "#FF8C42",
		borderRadius: 25,
		paddingVertical: 16,
		alignItems: "center",
	},
	orderButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
});

export default CustomizeOrderModal;
