import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { exploreData } from "./data";
import { router } from "expo-router";

const width = Dimensions.get("window").width;

const ExploreScreen = () => {
	const handleOrderNow = () => {
		router.push("/(root)/OrderSummaryScreen");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Explore</Text>
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

				{exploreData.map((item) => (
					<View
						key={item.id}
						style={{ marginBottom: 20 }}>
						<View style={styles.imageContainer}>
							<Image
								source={item.image}
								style={styles.image}
							/>
						</View>

						<View style={styles.imageOverlay}>
							<View>
								<View style={styles.topLayerContainer}>
									<View style={styles.vendorContainer}>
										<View style={styles.vendorBadge}>
											<Text style={styles.vendorText}>vendor</Text>
										</View>

										<View>
											<Text style={styles.whiteText}>{item.vendorName}</Text>
											<Text style={styles.whiteText}>{item.location}</Text>
										</View>
									</View>

									<View style={styles.ratingContainer}>
										<Feather
											name="star"
											size={20}
											color="#E58945"
										/>
										<Text style={styles.ratingText}>{item.timeAgo}</Text>
									</View>
								</View>
							</View>

							<View style={styles.bottomLayer}>
								<View style={styles.actionContainer}>
									<View style={styles.iconContainer}>
										<Feather
											name="share"
											size={24}
											color="#fff"
											style={styles.actionIcon}
										/>
										<Feather
											name="heart"
											size={24}
											color="#fff"
											style={[styles.actionIcon, styles.iconSpacing]}
										/>
										<Feather
											name="shopping-cart"
											size={24}
											color="#fff"
											style={[styles.actionIcon, styles.iconSpacingDouble]}
										/>
									</View>
									<View>
										<Text style={styles.whiteText}>Click for details</Text>
									</View>
								</View>

								<View style={styles.foodInfoContainer}>
									<View>
										<Text style={styles.whiteText}>{item.foodName}</Text>
										<Text style={styles.whiteText}>{item.deliveryTime}</Text>
									</View>
									<TouchableOpacity
										style={styles.orderButton}
										onPress={handleOrderNow}>
										<Text style={styles.whiteText}>Order Now</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default ExploreScreen;

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
		width: width - 32,
		aspectRatio: 16 / 12,
		borderRadius: 8,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	imageOverlay: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		padding: 10,
	},
	headerTitle: {
		fontWeight: "bold",
		fontSize: 24,
	},
	vendorContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	vendorBadge: {
		backgroundColor: "#EA5959",
		borderRadius: 100,
		padding: 8,
		elevation: 1,
		marginRight: 10,
	},
	vendorText: {
		color: "#fff",
	},
	whiteText: {
		color: "#fff",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 3,
		paddingBottom: 3,
		borderRadius: 50,
	},
	ratingText: {
		color: "#475467",
		marginLeft: 5,
	},
	topLayerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	bottomLayer: {
		bottom: 0,
		top: 0,
		marginTop: "auto",
	},
	actionContainer: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconContainer: {
		flexDirection: "row",
		position: "relative",
	},
	actionIcon: {
		position: "absolute",
	},
	iconSpacing: {
		marginLeft: 20,
	},
	iconSpacingDouble: {
		marginLeft: 40,
	},
	foodInfoContainer: {
		marginTop: "10%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	orderButton: {
		backgroundColor: "#E58945",
		padding: 10,
		borderRadius: 50,
		marginTop: 10,
	},
});
