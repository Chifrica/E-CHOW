"use client";

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
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
	storiesData,
	videosData,
	recommendedData,
	fastSellingData,
	restaurantAllData,
} from "./data";
import DeliveryAddressModal from "@/components/deliveryAddressModal";

const width = Dimensions.get("screen").width;

const HomePage = () => {
	// Add state for modal and selected address
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState({
		id: "1",
		name: "Office",
		address: "33, Rosebud, Oke...",
	});

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<View style={styles.miniHeader}>
						{/* Make this section clickable to open the modal */}
						<TouchableOpacity
							style={{ flexDirection: "row", alignItems: "center" }}
							onPress={() => setModalVisible(true)}>
							<AntDesign
								name="menu-fold"
								size={24}
								color="#FFFFFF"
								style={styles.headerIcon}
							/>
							<View>
								<Text style={{ color: "#475467", fontSize: 16 }}>
									Deliver to:
									<Text style={{ fontWeight: "700" }}>
										{" "}
										{selectedAddress.name}
									</Text>
								</Text>
								<Text
									style={{
										justifyContent: "center",
										fontWeight: "bold",
										color: "#101828",
										fontSize: 18,
									}}>
									{selectedAddress.address}
									<Feather
										name="chevron-down"
										size={24}
										color="#61605F"
									/>
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.miniHeader}>
						<Feather
							name="search"
							size={24}
							color="#61605F"
							style={styles.headerIcon2}
						/>
						<Feather
							name="shopping-cart"
							size={24}
							color="#61605F"
							style={styles.headerIcon2}
						/>
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
					showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
				/>
				<View style={{ padding: 10 }}>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>Category</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>

					<View style={styles.categoryContainer}>
						<View style={styles.categoryItem}>
							<FontAwesome6
								name="bowl-rice"
								size={20}
								color="#E58945"
								style={styles.categoryIcon}
							/>
							<Text style={styles.categoryLabel}>Rice</Text>
						</View>
						<View style={styles.categoryItem}>
							<FontAwesome6
								name="wine-bottle"
								size={20}
								color="#E58945"
								style={styles.categoryIcon}
							/>
							<Text style={styles.categoryLabel}>Beverages</Text>
						</View>
						<View style={styles.categoryItem}>
							<FontAwesome6
								name="bowl-rice"
								size={20}
								color="#E58945"
								style={styles.categoryIcon}
							/>
							<Text style={styles.categoryLabel}>Swallow</Text>
						</View>
						<View style={styles.categoryItem}>
							<FontAwesome6
								name="bowl-rice"
								size={20}
								color="#E58945"
								style={styles.categoryIcon}
							/>
							<Text style={styles.categoryLabel}>Seafood</Text>
						</View>
						<View style={styles.categoryItem}>
							<FontAwesome6
								name="bowl-rice"
								size={20}
								color="#E58945"
								style={styles.categoryIcon}
							/>
							<Text style={styles.categoryLabel}>Soup</Text>
						</View>
						<View style={styles.categoryItem}>
							<FontAwesome6
								name="cookie-bite"
								size={20}
								color="#E58945"
								style={styles.categoryIcon}
							/>
							<Text style={styles.categoryLabel}>Bakery</Text>
						</View>
					</View>
				</View>

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
					showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
				/>

				<View>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>Recommended for you</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>
				</View>

				<FlatList
					data={recommendedData}
					renderItem={({ item }) => (
						<View style={styles.videoContainer}>
							<Image
								source={item.recommended}
								style={styles.videos}
							/>
							<View style={styles.videoOverlay}>
								<LinearGradient
									style={styles.recommendationHeader}
									colors={["#3579DD", "#24DA36"]}
									start={{ x: 0, y: 0 }} // Start from the left
									end={{ x: 1, y: 0 }}>
									<FontAwesome6
										name="crown"
										size={15}
										color="#FFFFFF"
									/>
									<Text style={styles.recommendationText}>{item.title}</Text>
								</LinearGradient>

								<View>
									<Ionicons
										name="heart-outline"
										size={20}
										color="#E58945"
									/>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									padding: 10,
								}}>
								<View>
									<Text>Caramello Spaghetti</Text>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Ionicons
											name="star"
											size={15}
											color="#E58945"
										/>
										<Text style={{ marginLeft: 5 }}>4.8</Text>
										<Text>10min away</Text>
									</View>
								</View>
								<View>
									<Text>{item.price}</Text>
								</View>
							</View>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					horizontal
					showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
				/>

				<View>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>Fast Selling</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>
				</View>

				<FlatList
					data={fastSellingData}
					renderItem={({ item }) => (
						<View style={styles.gridItem}>
							<Image
								source={item.fastSelling}
								style={styles.gridItemImages}
							/>
							<View style={styles.gridItemOverlay}>
								<Ionicons
									name="heart-outline"
									size={20}
									color="#FFFFFF"
									style={{ fontWeight: 700 }}
								/>
							</View>
							<View
								style={{ paddingBottom: 5, position: "absolute", bottom: 10 }}>
								<View>
									<Text
										style={{ color: "#fff", fontWeight: "700", fontSize: 24 }}>
										{item.title}
									</Text>
									<View>
										<Text style={{ color: "#fff" }}>{item.time}</Text>
										<Text style={{ color: "#fff" }}>{item.price}</Text>
									</View>
								</View>
							</View>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					numColumns={2} // Dynamically set the number of columns
				/>
				<Text style={styles.headerText}>Home</Text>

				<View>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>Fast Selling</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>
				</View>

				<FlatList
					data={fastSellingData}
					renderItem={({ item }) => (
						<View style={styles.gridItem}>
							<Image
								source={item.fastSelling}
								style={styles.gridItemImages}
							/>
							<View style={styles.gridItemOverlay}>
								<Ionicons
									name="heart-outline"
									size={20}
									color="#FFFFFF"
									style={{ fontWeight: 700 }}
								/>
							</View>
							<View
								style={{ paddingBottom: 5, position: "absolute", bottom: 10 }}>
								<View>
									<Text
										style={{ color: "#fff", fontWeight: "700", fontSize: 24 }}>
										{item.title}
									</Text>
									<View>
										<Text style={{ color: "#fff" }}>{item.time}</Text>
										<Text style={{ color: "#fff" }}>{item.price}</Text>
									</View>
								</View>
							</View>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					numColumns={2} // Dynamically set the number of columns
				/>

				<View>
					<View style={styles.categoryHeader}>
						<Text style={styles.categoryTitle}>All restaurant</Text>
						<Text style={styles.categorySeeAll}>See All</Text>
					</View>
				</View>

				<FlatList
					data={restaurantAllData}
					renderItem={({ item }) => (
						<View style={styles.restaurantItemOverlay}>
							<Image
								source={item.restaurantAll}
								style={styles.restaurantItemImages}
							/>
							<View style={{ paddingBottom: 5, bottom: 10 }}>
								<View>
									<Text
										style={{
											color: "#1F2125",
											fontWeight: "700",
											fontSize: 24,
										}}>
										{item.title}
									</Text>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Ionicons
											name="star"
											size={15}
											color="#E58945"
										/>
										<Text style={{ marginLeft: 5, color: "#56585C" }}>
											{item.time}
										</Text>
									</View>
									<View style={{ marginTop: "30%" }}>
										<Text>{item.price}</Text>
									</View>
								</View>
							</View>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					showsVerticalScrollIndicator={false}
				/>
			</ScrollView>

			{/* Add the Delivery Address Modal */}
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

export default HomePage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
		top: 10,
	},
	scrollView: {
		flexGrow: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 10,
		justifyContent: "space-between",
		marginBottom: 20,
	},
	miniHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	headerIcon: {
		backgroundColor: "#E58945",
		borderRadius: 50,
		padding: 8,
		elevation: 1,
		marginRight: 10,
	},
	headerIcon2: {
		backgroundColor: "#F3F3F3",
		borderRadius: 50,
		padding: 8,
		elevation: 1,
		marginRight: 10,
	},
	imageContainer: {
		alignItems: "center",
		marginRight: 10,
		padding: 5,
	},
	image: {
		width: 70,
		height: 70,
		resizeMode: "cover",
		borderRadius: 50,
		borderColor: "#E58945",
		borderWidth: 3,
	},
	imageLabel: {
		marginTop: 5,
		fontSize: 14,
		fontWeight: "bold",
		color: "#333",
	},
	videoContainer: {
		marginRight: 10,
		// position: 'relative', // Ensure the overlay is positioned relative to the video
	},
	videos: {
		width: 333,
		height: 167,
		resizeMode: "cover",
		borderRadius: 10,
	},
	videoOverlayTop: {
		position: "absolute",
		marginLeft: 10,
		alignItems: "flex-start",
		justifyContent: "center",
		// flexDirection: 'row',
		// justifyContent: 'space-around',
	},
	videoTitleTop: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: 5,
		borderRadius: 100,
		borderColor: "#FFFFFF",
		borderWidth: 1,
		padding: 5,
		marginTop: 80,
	},
	videoOverlay: {
		position: "absolute",
		marginLeft: 10,
		alignItems: "flex-start",
		flexDirection: "column",
	},
	videoTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: 10,
		borderRadius: 100,
		borderColor: "#FFFFFF",
		borderWidth: 1,
		padding: 5,
		marginTop: 80,
	},
	videoLabel: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFFFFF",
		textAlign: "center",
		alignSelf: "center",
		marginTop: 5,
	},
	recommendationHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
		borderRadius: 100,
		borderColor: "#FFFFFF",
		borderWidth: 1,
		marginTop: 20,
		alignItems: "center",
		paddingLeft: 5,
		paddingRight: 5,
	},
	recommendationText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		padding: 5,
	},
	gridItem: {
		flex: 1,
		alignItems: "center",
		// marginRight: 10,
		// position: 'relative', // Ensure the overlay is positioned relative to the video
	},
	gridItemImages: {
		width: 164,
		height: 179,
		resizeMode: "cover",
		borderRadius: 10,
		marginBottom: 10,
	},
	gridItemOverlay: {
		position: "absolute",
		paddingLeft: 100,
		marginTop: 10,
		alignItems: "flex-end",
	},
	restaurantItemOverlay: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 15,
	},
	restaurantItemImages: {
		width: 164,
		height: 179,
		resizeMode: "cover",
		borderRadius: 10,
		marginLeft: 16,
		marginRight: 16,
	},
	headerText: {
		fontSize: 25,
		fontWeight: "700",
		marginHorizontal: "auto",
		fontFamily: "Switzerland",
		letterSpacing: -0.41,
		// lineHeight: 100,
	},
	categoryHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 20,
	},
	categoryTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	categorySeeAll: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#E58945",
	},
	categoryContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	categoryItem: {
		alignItems: "center",
		flexDirection: "row",
		marginRight: 10,
		marginBottom: 20,
		borderRadius: 50,
		elevation: 5,
		backgroundColor: "#F9F9F9",
		padding: 5,
	},
	categoryIcon: {
		width: 40,
		height: 40,
		resizeMode: "contain",
		backgroundColor: "#fff",
		padding: 10,
		elevation: 1,
		borderRadius: 50,
	},
	categoryLabel: {
		marginTop: 5,
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		paddingLeft: 5,
		paddingRight: 5,
	},
});
