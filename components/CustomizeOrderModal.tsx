"use client";

import type React from "react";
import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	StatusBar,
	Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

type Quantities = {
	chicken: number;
	meat: number;
	fish: number;
	beer: number;
	coke: number;
	sosa: number;
	yoghurt1: number;
	yoghurt2: number;
	yoghurt3: number;
};

type CustomizeOrderModalProps = {
	visible: boolean;
	onClose: () => void;
};

const CustomizeOrderModal: React.FC<CustomizeOrderModalProps> = ({
	visible,
	onClose,
}) => {
	const [selectedSize, setSelectedSize] = useState<"big" | "small">("big");
	const [quantities, setQuantities] = useState<Quantities>({
		chicken: 0,
		meat: 0,
		fish: 0,
		beer: 0,
		coke: 2,
		sosa: 0,
		yoghurt1: 0,
		yoghurt2: 0,
		yoghurt3: 0,
	});
	const [totalPacks, setTotalPacks] = useState<number>(2);

	const updateQuantity = (item: keyof Quantities, increment: number) => {
		setQuantities((prev) => ({
			...prev,
			[item]: Math.max(0, prev[item] + increment),
		}));
	};

	const updateTotalPacks = (increment: number) => {
		setTotalPacks((prev) => Math.max(1, prev + increment));
	};

	const calculateTotal = (): number => {
		const sizePrice = selectedSize === "big" ? 1500 : 1200;
		const proteinPrice =
			(quantities.chicken + quantities.meat + quantities.fish) * 1000;
		const drinkPrice =
			quantities.beer * 1000 +
			(quantities.coke +
				quantities.sosa +
				quantities.yoghurt1 +
				quantities.yoghurt2 +
				quantities.yoghurt3) *
				800;

		return (sizePrice + proteinPrice + drinkPrice) * totalPacks;
	};

	const formatPrice = (price: number): string => {
		return `₦${price.toLocaleString()}`;
	};

	// Render quantity control for any item
	const renderQuantityControl = (item: keyof Quantities) => {
		if (quantities[item] > 0) {
			return (
				<View style={styles.quantityControl}>
					<TouchableOpacity
						style={styles.quantityButton}
						onPress={() => updateQuantity(item, -1)}>
						<AntDesign
							name="minus"
							size={16}
							color="black"
						/>
					</TouchableOpacity>
					<Text style={styles.quantityText}>{quantities[item]}</Text>
					<TouchableOpacity
						style={styles.quantityButton}
						onPress={() => updateQuantity(item, 1)}>
						<AntDesign
							name="plus"
							size={16}
							color="black"
						/>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => updateQuantity(item, 1)}>
					<Text style={styles.addButtonText}>+</Text>
				</TouchableOpacity>
			);
		}
	};

	if (!visible) return null;

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={visible}
			onRequestClose={onClose}>
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.header}>
					<View style={styles.cartIconContainer}>
						<AntDesign
							name="shoppingcart"
							size={24}
							color="#FF8C42"
						/>
					</View>
					<Text style={styles.headerTitle}>Customize Order</Text>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={onClose}>
						<Feather
							name="x"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.content}>
					<View style={styles.imageContainer}>
						<Image
							source={require("../assets/images/spicy-jollof.png")}
							style={styles.foodImage}
							resizeMode="cover"
						/>
						<View style={styles.restaurantTag}>
							<Text style={styles.restaurantText}>Nao Restaurants</Text>
						</View>
					</View>

					<Text style={styles.foodTitle}>Spicy Jollof Rice</Text>

					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Size Option</Text>

						<TouchableOpacity
							style={styles.optionRow}
							onPress={() => setSelectedSize("big")}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Big Size</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦1500</Text>
								<View
									style={[
										styles.radioButton,
										selectedSize === "big" && styles.radioSelected,
									]}>
									{selectedSize === "big" && <View style={styles.radioInner} />}
								</View>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.optionRow}
							onPress={() => setSelectedSize("small")}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Small size</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦1200</Text>
								<View
									style={[
										styles.radioButton,
										selectedSize === "small" && styles.radioSelected,
									]}>
									{selectedSize === "small" && (
										<View style={styles.radioInner} />
									)}
								</View>
							</View>
						</TouchableOpacity>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Add Protein</Text>

						<View style={styles.optionRow}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Chicken</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦1000</Text>
								{renderQuantityControl("chicken")}
							</View>
						</View>

						<View style={styles.optionRow}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Meat</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦1000</Text>
								{renderQuantityControl("meat")}
							</View>
						</View>

						<View style={styles.optionRow}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Fish</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦1000</Text>
								{renderQuantityControl("fish")}
							</View>
						</View>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Add Drink</Text>

						<View style={styles.optionRow}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Beer</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦1000</Text>
								{renderQuantityControl("beer")}
							</View>
						</View>

						<View style={styles.optionRow}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Coke</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦800</Text>
								{renderQuantityControl("coke")}
							</View>
						</View>

						<View style={styles.optionRow}>
							<View style={styles.optionLeft}>
								<View style={styles.iconPlaceholder} />
								<Text style={styles.optionText}>Sosa</Text>
							</View>
							<View style={styles.optionRight}>
								<Text style={styles.priceText}>₦800</Text>
								{renderQuantityControl("sosa")}
							</View>
						</View>

						{["yoghurt1", "yoghurt2", "yoghurt3"].map((item, index) => (
							<View
								key={item}
								style={styles.optionRow}>
								<View style={styles.optionLeft}>
									<View style={styles.iconPlaceholder} />
									<Text style={styles.optionText}>
										Youghurt {index === 0 ? "" : index === 1 ? "2" : "3"}
									</Text>
								</View>
								<View style={styles.optionRight}>
									<Text style={styles.priceText}>₦800</Text>
									{renderQuantityControl(item as keyof Quantities)}
								</View>
							</View>
						))}
					</View>

					<View style={styles.packContainer}>
						<Text style={styles.packText}>No. Of pack</Text>
						<View style={styles.packControls}>
							<TouchableOpacity
								style={styles.packButton}
								onPress={() => updateTotalPacks(-1)}>
								<AntDesign
									name="minus"
									size={16}
									color="black"
								/>
							</TouchableOpacity>
							<Text style={styles.packQuantity}>{totalPacks}</Text>
							<TouchableOpacity
								style={styles.packButton}
								onPress={() => updateTotalPacks(1)}>
								<AntDesign
									name="plus"
									size={16}
									color="black"
								/>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>

				<TouchableOpacity style={styles.orderButton}>
					<Text style={styles.orderButtonText}>
						{formatPrice(calculateTotal())} • Order
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
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
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
	},
	cartIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(255, 140, 66, 0.1)",
		alignItems: "center",
		justifyContent: "center",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
	},
	closeButton: {
		padding: 8,
	},
	content: {
		flex: 1,
	},
	imageContainer: {
		position: "relative",
		height: 200,
	},
	foodImage: {
		width: "100%",
		height: "100%",
	},
	restaurantTag: {
		position: "absolute",
		bottom: 10,
		right: 10,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 4,
	},
	restaurantText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "500",
	},
	foodTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 16,
		paddingHorizontal: 16,
	},
	sectionContainer: {
		marginBottom: 16,
		backgroundColor: "#F9F9F9",
		paddingVertical: 12,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		paddingHorizontal: 16,
	},
	optionRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "#fff",
	},
	optionLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconPlaceholder: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: "#F0F0F0",
		marginRight: 12,
	},
	optionText: {
		fontSize: 16,
	},
	optionRight: {
		flexDirection: "row",
		alignItems: "center",
	},
	priceText: {
		fontSize: 16,
		fontWeight: "500",
		marginRight: 12,
	},
	radioButton: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#E0E0E0",
		alignItems: "center",
		justifyContent: "center",
	},
	radioSelected: {
		borderColor: "#FF8C42",
	},
	radioInner: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: "#FF8C42",
	},
	addButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "#F0F0F0",
		alignItems: "center",
		justifyContent: "center",
	},
	addButtonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	quantityControl: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 20,
		overflow: "hidden",
	},
	quantityButton: {
		width: 30,
		height: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	quantityText: {
		width: 30,
		textAlign: "center",
		fontSize: 16,
	},
	packContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	packText: {
		fontSize: 16,
	},
	packControls: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 25,
		overflow: "hidden",
	},
	packButton: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	packQuantity: {
		width: 40,
		textAlign: "center",
		fontSize: 18,
	},
	orderButton: {
		backgroundColor: "#FF8C42",
		marginHorizontal: 16,
		marginBottom: 16,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	orderButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
});

export default CustomizeOrderModal;
