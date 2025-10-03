import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	StatusBar,
	ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomizeOrderModal from "../../../components/CustomizeOrderModal";
import { SafeAreaView } from "react-native-safe-area-context";

// Define TypeScript interfaces
interface OrderItem {
	id: string;
	name: string;
	restaurant: string;
	quantity: string;
	price: string;
	status: OrderStatus;
	image: string;
}

// Using a type for the status to ensure only valid values are used
type OrderStatus = "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";

// Sample data for orders
const orderData: OrderItem[] = [
	{
		id: "1",
		name: "Spicy Jollof",
		restaurant: "Nao Restaurants",
		quantity: "2 Packs",
		price: "₦7,000",
		status: "Preparing",
		image: "../../../assets/images/spicy-jollof.png",
	},
	{
		id: "2",
		name: "Spicy Jollof",
		restaurant: "Nao Restaurants",
		quantity: "2 Packs",
		price: "₦7,000",
		status: "Out for Delivery",
		image: "../../../assets/images/spicy-jollof.png",
	},
	{
		id: "3",
		name: "Spicy Jollof",
		restaurant: "Nao Restaurants",
		quantity: "2 Packs",
		price: "₦7,000",
		status: "Cancelled",
		image: "../../../assets/images/spicy-jollof.png",
	},
	{
		id: "4",
		name: "Spicy Jollof",
		restaurant: "Nao Restaurants",
		quantity: "2 Packs",
		price: "₦7,000",
		status: "Preparing",
		image: "../../../assets/images/spicy-jollof.png",
	},
];

type TabType = "Ongoing" | "Delivered" | "Canceled";
type ViewType = "grid" | "list";

const OrdersScreen: React.FC = () => {
	const [activeTab, setActiveTab] = useState<TabType>("Ongoing");
	const [hasOrders, setHasOrders] = useState<boolean>(true);
	const [viewType, setViewType] = useState<ViewType>("grid");
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const tabs: TabType[] = ["Ongoing", "Delivered", "Canceled"];

	const getStatusColor = (status: OrderStatus): string => {
		switch (status) {
			case "Preparing":
				return "#FF9F43";
			case "Out for Delivery":
				return "#FFF";
			case "Delivered":
				return "#00D68F";
			case "Cancelled":
				return "#FFF";
			default:
				return "#FF9F43";
		}
	};

	const getStatusBackgroundColor = (status: OrderStatus): string => {
		switch (status) {
			case "Preparing":
				return "#FFFFFF"; // White
			case "Out for Delivery":
				return "#FF9F43"; // Light orange
			case "Delivered":
				return "#E6F8F1"; // Light green
			case "Cancelled":
				return "#FF5C5C"; // Light red
			default:
				return "#FFFFFF";
		}
	};

	const toggleView = (): void => {
		setViewType(viewType === "grid" ? "list" : "grid");
	};

	const renderEmptyState = (): React.ReactElement => (
		<View style={styles.emptyContainer}>
			<Image
				source={require("../../../assets/images/empty.png")}
				style={styles.emptyImage}
			/>
			<Text style={styles.emptyTitle}>You have no orders yet!</Text>
			<Text style={styles.emptySubtitle}>
				Explore nearby restaurants and order your favorite meals effortlessly
			</Text>
			<TouchableOpacity style={styles.exploreButton}>
				<Text style={styles.exploreButtonText}>Explore & Order</Text>
			</TouchableOpacity>
		</View>
	);

	const renderGridItem = ({
		item,
	}: {
		item: OrderItem;
	}): React.ReactElement => (
		<TouchableOpacity
			style={styles.gridItem}
			onPress={() => setModalVisible(true)}>
			<View style={styles.gridImageContainer}>
				<Image
					source={require("../../../assets/images/spicy-jollof.png")}
					style={styles.gridImage}
				/>
				<View
					style={[
						styles.statusBadge,
						{ backgroundColor: getStatusBackgroundColor(item.status) },
					]}>
					<Text
						style={[styles.statusText, { color: getStatusColor(item.status) }]}>
						{item.status}
					</Text>
				</View>
			</View>
			<View style={styles.gridItemDetails}>
				<Text style={styles.itemName}>{item.name}</Text>
				<Text style={styles.itemRestaurant}>
					{item.restaurant} • {item.quantity}
				</Text>
				<View style={styles.gridItemFooter}>
					<Text style={styles.itemPrice}>{item.price}</Text>
					<TouchableOpacity style={styles.trackButton}>
						<Text style={styles.trackButtonText}>Track Order</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);

	const renderListItem = ({
		item,
	}: {
		item: OrderItem;
	}): React.ReactElement => (
		<TouchableOpacity
			style={styles.listItem}
			onPress={() => setModalVisible(true)}>
			<View style={styles.listImageContainer}>
				<Image
					source={require("../../../assets/images/spicy-jollof.png")}
					style={styles.listImage}
				/>
				<View
					style={[
						styles.statusBadge,
						{ backgroundColor: getStatusBackgroundColor(item.status) },
					]}>
					<Text
						style={[styles.statusText, { color: getStatusColor(item.status) }]}>
						{item.status}
					</Text>
				</View>
			</View>
			<View style={styles.listItemContent}>
				<View style={styles.listItemHeader}>
					<Text style={styles.itemName}>{item.name}</Text>
					<Text style={styles.itemPrice}>{item.price}</Text>
				</View>
				<Text style={styles.itemRestaurant}>
					{item.restaurant} • {item.quantity}
				</Text>
				<TouchableOpacity style={styles.trackButtonList}>
					<Text style={styles.trackButtonText}>Track Order</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView 
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
			>	
				<View style={styles.header}>
					<Text style={styles.headerTitle}>My Orders</Text>
					<TouchableOpacity onPress={toggleView}>
						{viewType === "grid" ? (
							<MaterialIcons
								name="view-list"
								size={24}
								color="#000"
							/>
						) : (
							<MaterialIcons
								name="grid-view"
								size={24}
								color="#000"
							/>
						)}
					</TouchableOpacity>
				</View>

				<View style={styles.tabContainer}>
					{tabs.map((tab) => (
						<TouchableOpacity
							key={tab}
							style={[styles.tab, activeTab === tab && styles.activeTab]}
							onPress={() => setActiveTab(tab)}>
							<Text
								style={[
									styles.tabText,
									activeTab === tab && styles.activeTabText,
								]}>
								{tab}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{!hasOrders ? (
					renderEmptyState()
				) : (
					<FlatList
						data={orderData}
						renderItem={viewType === "grid" ? renderGridItem : renderListItem}
						keyExtractor={(item) => item.id}
						numColumns={viewType === "grid" ? 1 : 1}
						contentContainerStyle={styles.listContainer}
					/>
				)}

				<CustomizeOrderModal
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
				/>
			</ScrollView>
			
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	scrollView: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	tabContainer: {
		flexDirection: "row",
		marginHorizontal: 18,
		backgroundColor: "#F0F0F0",
		borderRadius: 30,
		padding: 5,
		marginBottom: 20,
	},
	tab: {
		flex: 1,
		paddingVertical: 10,
		alignItems: "center",
		borderRadius: 25,
	},
	activeTab: {
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	tabText: {
		color: "#888",
		fontWeight: "500",
	},
	activeTabText: {
		color: "#000",
		fontWeight: "600",
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 40,
	},
	emptyImage: {
		width: 150,
		height: 150,
		marginBottom: 20,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	emptySubtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 30,
		lineHeight: 22,
	},
	exploreButton: {
		backgroundColor: "#FF9F43",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 10,
	},
	exploreButtonText: {
		color: "#FFF",
		fontWeight: "600",
		fontSize: 16,
	},
	listContainer: {
		paddingHorizontal: 20,
	},
	gridItem: {
		flexDirection: "row",
		backgroundColor: "#FFF",
		borderRadius: 12,
		marginBottom: 15,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	gridImageContainer: {
		width: 100,
		height: 100,
		position: "relative",
	},
	gridImage: {
		width: "100%",
		height: "100%",
	},
	gridItemDetails: {
		flex: 1,
		padding: 12,
	},
	itemName: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	itemRestaurant: {
		fontSize: 14,
		color: "#666",
		marginBottom: 8,
	},
	gridItemFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	itemPrice: {
		fontSize: 16,
		fontWeight: "700",
		color: "#000",
	},
	trackButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
	},
	trackButtonText: {
		color: "#FF9F43",
		fontWeight: "600",
		fontSize: 14,
	},
	statusBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 40,
	},
	statusText: {
		fontSize: 9,
		fontWeight: "500",
	},
	listItem: {
		backgroundColor: "#FFF",
		borderRadius: 12,
		marginBottom: 15,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	listImageContainer: {
		width: "100%",
		height: 180,
		position: "relative",
	},
	listImage: {
		width: "100%",
		height: "100%",
	},
	listItemContent: {
		padding: 15,
	},
	listItemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	trackButtonList: {
		alignSelf: "flex-end",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		marginTop: 8,
	},
});

export default OrdersScreen;
