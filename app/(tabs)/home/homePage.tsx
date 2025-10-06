"use client";

import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	FlatList,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

// Import the customize order modal
import CustomizeOrderModal from "../../../components/CustomizeOrderModal";
import DeliveryAddressModal from "../../../components/deliveryAddressModal";

import {
	storiesData,
	recommendedData,
	fastSellingData,
	restaurantAllData,
	videosData,
} from "./data";

const width = Dimensions.get("screen").width;

const HomePage = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
	const [selectedMeal, setSelectedMeal] = useState(null);
	const [selectedAddress, setSelectedAddress] = useState({
		id: "1",
		name: "Office",
		address: "33, Rosebud, Oke...",
	});
	const [favorites, setFavorites] = useState<string[]>([]); 

	const { user } = useUser();
	const profileImage = user?.imageUrl;

	// Sample meal data
	const sampleMeals = [
		{
			name: "Spicy Jollof Rice",
			restaurant: "Nao Restaurants",
			image: "/placeholder.svg?height=200&width=400",
			basePrice: 1500,
		},
		{
			name: "Caramello Spaghetti",
			restaurant: "Italian Corner",
			image: "/placeholder.svg?height=200&width=400",
			basePrice: 2000,
		},
		{
			name: "Homemade Pasta",
			restaurant: "Pasta Palace",
			image: "/placeholder.svg?height=200&width=400",
			basePrice: 1800,
		},
	];

	const handleMealPress = (mealIndex = 0) => {
		setSelectedMeal(sampleMeals[mealIndex]);
		setCustomizeModalVisible(true);
	};

	const toggleFavorite = (mealName: string) => {
    setFavorites((prev) => {
        if (prev.includes(mealName)) {
            // remove if already favorite
            return prev.filter((fav) => fav !== mealName);
        } else {
            // add to favorites
            return [...prev, mealName];
        }
    });
};


	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.header}>
					<View style={styles.miniHeader}>
						<TouchableOpacity
							style={{ flexDirection: "row", alignItems: "center" }}
							onPress={() => {
								router.push("/src/profile/profileScreen");
							}}>
							<Image
								source={{ uri: profileImage }}
								style={styles.userProfileCircle}
							/>
							<TouchableOpacity
								style={{ marginLeft: 10 }}
								onPress={() => setModalVisible(true)}>
								<Text style={{ color: "#475467", fontSize: 12 }}>
									Deliver to: {selectedAddress.name}
								</Text>
								<Text
									style={{
										fontWeight: "bold",
										color: "#101828",
										fontSize: 14,
									}}>
									{selectedAddress.address}
									<Feather
										name="chevron-down"
										size={16}
										color="#61605F"
									/>
								</Text>
							</TouchableOpacity>
						</TouchableOpacity>
					</View>
					<View style={styles.miniHeader}>
						<TouchableOpacity style={styles.iconButton}>
							<Feather
								name="search"
								size={20}
								color="#61605F"
							/>
						</TouchableOpacity>
						<TouchableOpacity 
							style={styles.iconButton}
							onPress={() => router.push(
								{ 
									pathname: "/(root)/src/favorites/favorites", 
									params: { 
										favorites: JSON.stringify(favorites) 
									} 
								}
							)}
						>
							<Feather
								name="shopping-cart"
								size={20}
								color="#61605F"
							/>
						</TouchableOpacity>
					</View>
				</View>

				{/* Stories */}
				<FlatList
					data={storiesData}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Image
								source={item.image}
								style={styles.image}
							/>
							<Text style={styles.imageLabel}>{item.label}</Text>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingRight: 20 }}
					style={{ width: "100%" }}
				/>

				{/* Category Section */}
				<View style={styles.sectionContainer}>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>Category</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 20 }}
						style={{ width: "100%" }}>
						<View style={styles.categoryItem}>
							<View style={styles.categoryIconContainer}>
								<FontAwesome6
									name="bowl-rice"
									size={16}
									color="#E58945"
								/>
							</View>
							<Text style={styles.categoryLabel}>Rice</Text>
						</View>
						<View style={styles.categoryItem}>
							<View style={styles.categoryIconContainer}>
								<FontAwesome6
									name="wine-bottle"
									size={16}
									color="#E58945"
								/>
							</View>
							<Text style={styles.categoryLabel}>Beverages</Text>
						</View>
						<View style={styles.categoryItem}>
							<View style={styles.categoryIconContainer}>
								<FontAwesome6
									name="bowl-rice"
									size={16}
									color="#E58945"
								/>
							</View>
							<Text style={styles.categoryLabel}>Swallow</Text>
						</View>
						<View style={styles.categoryItem}>
							<View style={styles.categoryIconContainer}>
								<FontAwesome6
									name="fish"
									size={16}
									color="#E58945"
								/>
							</View>
							<Text style={styles.categoryLabel}>Seafood</Text>
						</View>
						<View style={styles.categoryItem}>
							<View style={styles.categoryIconContainer}>
								<FontAwesome6
									name="bowl-rice"
									size={16}
									color="#E58945"
								/>
							</View>
							<Text style={styles.categoryLabel}>Soup</Text>
						</View>
						<View style={styles.categoryItem}>
							<View style={styles.categoryIconContainer}>
								<FontAwesome6
									name="cookie-bite"
									size={16}
									color="#E58945"
								/>
							</View>
							<Text style={styles.categoryLabel}>Bakery</Text>
						</View>
					</ScrollView>
				</View>

				{/* Videos/Carousel Section */}
				<FlatList
					data={videosData}
					renderItem={({ item }) => (
						<View style={styles.videoContainer}>
							<Image
								source={item.videos}
								style={styles.videos}
							/>
							<View style={styles.videoOverlayTop}>
								<Text style={styles.videoTitleTop}>{item.title}</Text>
								<Text style={styles.videoLabel}>{item.label}</Text>
							</View>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingRight: 20 }}
					style={{ marginTop: 20, width: "100%" }}
				/>

				{/* Recommended for you */}
				<View style={styles.sectionContainer}>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>Recommended for you</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>

					<FlatList
						data={recommendedData}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								style={styles.recommendedItem}
								onPress={() => handleMealPress(index)}>
								<Image
									source={item.recommended}
									style={styles.recommendedImage}
								/>
								<View style={styles.recommendedBadge}>
									<Text style={styles.recommendedBadgeText}>Very Healthy</Text>
								</View>
								<View style={styles.recommendedHeartContainer}>
									<TouchableOpacity onPress={() => toggleFavorite(item.name)}>
										<Ionicons
											name={favorites.includes(item.name) ? "heart" : "heart-outline"}
											size={20}
											color={favorites.includes(item.name) ? "red" : "#E58945"}
										/>
									</TouchableOpacity>
									{/* <Ionicons
										name="heart-outline"
										size={20}
										color="#E58945"
									/> */}
								</View>
								<View style={styles.recommendedDetails}>
									<Text style={styles.recommendedTitle}>
										{index === 0 ? "Caramello Spaghetti" : "Homemade Pasta"}
									</Text>
									<View style={styles.recommendedMeta}>
										<View style={styles.recommendedRating}>
											<Ionicons
												name="star"
												size={12}
												color="#E58945"
											/>
											<Text style={styles.recommendedRatingText}>
												4.8 (120+)
											</Text>
										</View>
										<Text style={styles.recommendedDistance}>10 min away</Text>
									</View>
									<Text style={styles.recommendedPrice}>
										{index === 0 ? "₦1,500" : "₦2,000"}
									</Text>
								</View>
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) => index.toString()}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 20 }}
						style={{ width: "100%" }}
					/>
				</View>

				{/* Fast Selling */}
				<View style={styles.sectionContainer}>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>Fast selling</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>

					<View style={styles.gridContainer}>
						{fastSellingData.slice(0, 6).map((item, index) => (
							<TouchableOpacity
								key={index}
								style={styles.gridItem}
								onPress={() => handleMealPress(0)} // Default to Spicy Jollof
							>
								<Image
									source={item.fastSelling}
									style={styles.gridItemImage}
								/>
								<TouchableOpacity style={styles.heartIconContainer}>
									<TouchableOpacity onPress={() => toggleFavorite(item.title)}>
										<Ionicons
											name={favorites.includes(item.title) ? "heart" : "heart-outline"}
											size={20}
											color={favorites.includes(item.title) ? "red" : "#E58945"}
										/>
									</TouchableOpacity>
									{/* <Ionicons
										name="heart-outline"
										size={20}
										color="#FFFFFF"
									/> */}
								</TouchableOpacity> 
								<View style={styles.gridItemOverlay}>
									<Text style={styles.gridItemTitle}>
										{index % 2 === 0
											? "Burger"
											: index % 4 === 1
											? "White Rice"
											: index % 4 === 3
											? "Neapolitan Pizza"
											: "Gbegiri Soup"}
									</Text>
									<Text style={styles.gridItemMeta}>
										10 min away • 128 ordered
									</Text>
									<Text style={styles.gridItemPrice}>
										{index % 2 === 0 ? "₦3,500" : "₦2,500"}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* All restaurant */}
				<View style={styles.sectionContainer}>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>All restaurant</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>

					{restaurantAllData.slice(0, 4).map((item, index) => (
						<TouchableOpacity
							key={index}
							style={styles.restaurantItem}
							onPress={() => handleMealPress(0)}>
							<Image
								source={item.restaurantAll}
								style={styles.restaurantImage}
							/>
							<View style={styles.restaurantDetails}>
								<Text style={styles.restaurantName}>
									{index === 0
										? "Pepperoni"
										: index === 1
										? "Amala Spot"
										: index === 2
										? "Belloni's Place"
										: "Tasty & Spicy"}
								</Text>
								<View style={styles.restaurantMeta}>
									<Ionicons
										name="star"
										size={12}
										color="#E58945"
									/>
									<Text style={styles.restaurantRating}>4.8 (100+)</Text>
								</View>
								<Text style={styles.restaurantLocation}>
									Civic center, Fejuyi Park
								</Text>
								<Text style={styles.restaurantDistance}>10 min away</Text>
							</View>
							<TouchableOpacity style={styles.restaurantHeartContainer}>
								<TouchableOpacity onPress={() => toggleFavorite(item.title)}>
										<Ionicons
											name={favorites.includes(item.title) ? "heart" : "heart-outline"}
											size={20}
											color={favorites.includes(item.title) ? "red" : "#E58945"}
										/>
									</TouchableOpacity>
								{/* <Ionicons
									name="heart-outline"
									size={20}
									color="#E58945"
								/> */}
							</TouchableOpacity>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			{/* Customize Order Modal */}
			<CustomizeOrderModal
				visible={customizeModalVisible}
				onClose={() => setCustomizeModalVisible(false)}
				meal={selectedMeal}
			/>

			{/* Delivery Address Modal */}
			<DeliveryAddressModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				onSelectAddress={(address) => {
					setSelectedAddress(address);
					setModalVisible(false);
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 15,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	miniHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	userProfileCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "#E58945",
		backgroundColor: "#FFF5EB",
	},
	iconButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#F3F3F3",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 10,
	},
	imageContainer: {
		alignItems: "center",
		marginRight: 15,
	},
	image: {
		width: 60,
		height: 60,
		resizeMode: "cover",
		borderRadius: 30,
		borderColor: "#E58945",
		borderWidth: 2,
	},
	imageLabel: {
		marginTop: 5,
		fontSize: 12,
		color: "#333",
		textAlign: "center",
	},
	sectionContainer: {
		marginTop: 20,
	},
	categoryHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	categoryTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	categorySeeAll: {
		fontSize: 14,
		color: "#E58945",
	},
	categoryItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F9F9F9",
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 6,
		marginRight: 10,
	},
	categoryIconContainer: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
	},
	categoryLabel: {
		fontSize: 14,
		color: "#333",
	},
	videoContainer: {
		marginRight: 15,
		width: width - 50,
	},
	videos: {
		width: "100%",
		height: 167,
		resizeMode: "cover",
		borderRadius: 10,
	},
	videoOverlayTop: {
		position: "absolute",
		bottom: 20,
		left: 20,
		right: 20,
	},
	videoTitleTop: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: 5,
		borderRadius: 100,
		borderColor: "#FFFFFF",
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 15,
		alignSelf: "flex-start",
	},
	videoLabel: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginTop: 5,
	},
	recommendedItem: {
		width: 180,
		marginRight: 15,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	recommendedImage: {
		width: "100%",
		height: 120,
		resizeMode: "cover",
	},
	recommendedBadge: {
		position: "absolute",
		top: 10,
		left: 10,
		backgroundColor: "#3579DD",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 15,
	},
	recommendedBadgeText: {
		color: "#FFFFFF",
		fontSize: 10,
		fontWeight: "bold",
	},
	recommendedHeartContainer: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "#FFFFFF",
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	recommendedDetails: {
		padding: 10,
	},
	recommendedTitle: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 5,
	},
	recommendedMeta: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	recommendedRating: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
	},
	recommendedRatingText: {
		fontSize: 12,
		color: "#666",
		marginLeft: 3,
	},
	recommendedDistance: {
		fontSize: 12,
		color: "#666",
	},
	recommendedPrice: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#E58945",
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	gridItem: {
		width: "48%",
		height: 180,
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: 15,
		position: "relative",
	},
	gridItemImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	heartIconContainer: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "rgba(0,0,0,0.3)",
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	gridItemOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 10,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	gridItemTitle: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 2,
	},
	gridItemMeta: {
		color: "#FFFFFF",
		fontSize: 10,
		marginBottom: 2,
	},
	gridItemPrice: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "bold",
	},
	restaurantItem: {
		flexDirection: "row",
		marginBottom: 15,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	restaurantImage: {
		width: 80,
		height: 80,
		borderRadius: 10,
		marginRight: 15,
	},
	restaurantDetails: {
		flex: 1,
		justifyContent: "center",
	},
	restaurantName: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	restaurantMeta: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	restaurantRating: {
		fontSize: 12,
		color: "#666",
		marginLeft: 5,
	},
	restaurantLocation: {
		fontSize: 12,
		color: "#666",
		marginBottom: 2,
	},
	restaurantDistance: {
		fontSize: 12,
		color: "#666",
	},
	restaurantHeartContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: 30,
		height: 30,
	},
});

export default HomePage;
